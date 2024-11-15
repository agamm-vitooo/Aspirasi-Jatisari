// routes/auth.js
const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();
const User = require('../models/user');

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

router.get('/user/:name', async(req, res) => {
    const name = req.params.name;
    try {
        const user = await User.findOne({ name });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'User not found' });
    }
});

module.exports = router;