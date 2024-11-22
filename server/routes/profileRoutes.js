const express = require("express");
const { createProfile, readProfile, updateProfile, deleteProfile } = require("../controller/profileController");

const router = express.Router();

router.post("/create", createProfile);
router.get("/:userId", readProfile); // Route untuk membaca profil berdasarkan userId
router.put("/:userId", updateProfile); // Route untuk mengupdate profil berdasarkan userId
router.delete("/:userId", deleteProfile); // Route untuk menghapus profil berdasarkan userId

module.exports = router;