// routes/auth.js
const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();
const User = require('../models/user');

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

router.get('/user/:email', async(req, res) => {
    const email = req.params.email;
    try {
        const user = await User.findOne({ email });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'User not found' });
    }
});

module.exports = router;