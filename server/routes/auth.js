// routes/auth.js
const express = require('express');
const { register, login } = require('../controller/authController');
const router = express.Router();

// Rute Registrasi
router.post('/register', register);

// Rute Login
router.post('/login', login);

module.exports = router;