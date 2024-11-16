// routes/auth.js
const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();
const User = require('../models/user');

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

module.exports = router;