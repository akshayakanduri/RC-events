const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
},

    email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
},

    password: {
            type: String,
            required: true,
            maxlength: 255
        },

    phone: {
    type: String,
    default: "",
    trim: true,
    maxlength: 20
},

    location: {
    type: String,
    default: "",
    trim: true,
    maxlength: 150
},

    profileImage: {
            type: String,
            default: "",
            maxlength: 500
        },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);