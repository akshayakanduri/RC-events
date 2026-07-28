const User = require('../models/User');
const OTP = require('../models/OTP');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

const { sendOTPEmail } = require('../utils/email');


const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};


// Register User
exports.registerUser = async (req, res) => {
    // const { name, email, password } = req.body;
    const {
        name,
        email,
        password,
        phone,
        location
    } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email and password are required."
        });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: "Invalid email address."
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long."
        });
    }

let profileImage = "";

if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "eventmanagement/profiles",
    });

    profileImage = result.secure_url;

    await fs.remove(req.file.path);
}

    let userExists = await User.findOne({email});
    if(userExists) {
        return res.status(400).json({error: 'User already exists'});
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt); 

    try {
        // const user = await User.create({ name, email, password: hashedPassword, role: 'user', isVerified: false});
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            phone,
            location,
            profileImage,
            role:'user',
            isVerified:false
        })
        // res.status(201).json({
        //     message: 'User registered successfully'
        // });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await OTP.create({email, otp, action: 'account_verification'});
        await sendOTPEmail(email, otp, 'account_verification');

        res.status(201).json({
            message: 'User registered successfully. Please check your email for OTP to verify your account.',
            email: user.email
        });

    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
};

// // Login User
// exports.loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     let user = await User.findOne({ email });

//     if (!user) {
//         return res.status(400).json({ error: 'Invalid credentials' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);

//     if (!isMatch) {
//         return res.status(400).json({ error: 'Invalid credentials, Please Sign Up first' });
//     }

//     if (!user.isVerified && user.role === 'user') {
//         const otp = Math.floor(100000 + Math.random() * 900000).toString();
//         await OTP.deleteMany({ email, action: 'account_verification' }); // Remove old OTPs
//         await OTP.create({ email, otp, action: 'account_verification' });
//         await sendOTPEmail(email, otp, 'account_verification');

//         return res.status(400).json({
//             error: 'Account not verified. A new OTP has been sent to your email.'
//         });
//     }

//     res.json({
//         message: "Login successful",
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//         profileImage: user.profileImage,
//         token: generateToken(user._id, user.role)
//     });
// };

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;


    const user = await User.findOne({ email });


    if (!user) {
        console.log("User not found");
        return res.status(400).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);


    if (!isMatch) {
        return res.status(400).json({
            error: "Invalid credentials, Please Sign Up first",
        });
    }

    if (!user.isVerified && user.role === "user") {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        await OTP.deleteMany({
            email,
            action: "account_verification",
        });

        await OTP.create({
            email,
            otp,
            action: "account_verification",
        });

        await sendOTPEmail(email, otp, "account_verification");

        return res.status(400).json({
            error:
                "Account not verified. A new OTP has been sent to your email.",
        });
    }


    return res.status(200).json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        token: generateToken(user._id, user.role),
    });
};

//verify OTP
exports.verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const validOTP = await OTP.findOne({ email, otp, action: 'account_verification' });

        if (!validOTP) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const user = await User.findOneAndUpdate({ email }, { isVerified: true }, { new: true });
        await OTP.deleteOne({ _id: validOTP._id }); // Delete OTP after usage

        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImage: user.profileImage,
            token: generateToken(user.id, user.role)
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};


exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


exports.updateProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.name = req.body.name || user.name;
        user.phone = req.body.phone || user.phone;
        user.location = req.body.location || user.location;

        if (req.file) {

            console.log("Uploaded File:", req.file);
            console.log("Cloudinary Config Before Upload:");
            console.log(cloudinary.config());

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "eventmanagement/profiles"
            });

            console.log("Cloudinary Result:", result.secure_url);

            user.profileImage = result.secure_url;

            await fs.remove(req.file.path);
        }

        await user.save();

        const updatedUser = await User.findById(user._id)
            .select("-password");

        res.json({
            message: "Profile Updated Successfully",
            user: updatedUser
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: error.message
        });
    }
};