const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    registerUser,
    loginUser,
    verifyOTP,
    getProfile,
    updateProfile
} = require('../controllers/authController');

router.post(
    '/register',
    upload.single('profileImage'),
    registerUser
);
router.post('/login', loginUser);
router.post('/verify-otp', verifyOTP);
router.get('/profile', protect, getProfile);

router.put(
    '/profile',
    protect,
    upload.single('profileImage'),
    updateProfile
);
// router.get('/', (req, res) => {
//     res.send('Auth Route Working');
// });

module.exports = router;