const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const multer = require('multer');

// Setup penyimpanan untuk foto profil
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profile_pictures/'); // Menyimpan foto di folder 'uploads/profile_pictures'
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nama file foto berdasarkan waktu
    },
});

const upload = multer({ storage: storage }); // Inisialisasi multer dengan konfigurasi penyimpanan

// Route untuk update profil
router.put('/update', upload.single('profilePicture'), userController.updateProfile);

module.exports = router;