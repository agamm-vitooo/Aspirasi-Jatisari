const Profile = require("../models/profileModel");
const mongoose = require("mongoose");

// Buat data profil baru
exports.createProfile = async(req, res) => {
    const { userId, name, email, phone, address, photoUrl } = req.body;

    try {
        // Validasi userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const newProfile = new Profile({
            userId,
            name,
            email,
            phone,
            address,
            photoUrl,
        });

        const savedProfile = await newProfile.save();

        res.status(201).json({
            message: "Profile created successfully",
            data: savedProfile,
        });
    } catch (error) {
        console.error("Error creating profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Fungsi untuk membaca profil
exports.readProfile = async(req, res) => {
    const { userId } = req.params; // Ambil userId dari parameter URL

    try {
        // Validasi userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        // Cari profil berdasarkan userId
        const profile = await Profile.findOne({ userId }).populate("userId");
        if (!profile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Update profil berdasarkan ID pengguna
exports.updateProfile = async(req, res) => {
    const { userId } = req.params;
    const { name, email, phone, address, photoUrl } = req.body;

    try {
        // Validasi userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const updatedProfile = await Profile.findOneAndUpdate({ userId }, { name, email, phone, address, photoUrl }, { new: true, runValidators: true });

        if (!updatedProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        res.status(200).json({
            message: "Profile updated successfully",
            data: updatedProfile,
        });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Hapus profil berdasarkan ID pengguna
exports.deleteProfile = async(req, res) => {
    const { userId } = req.params;

    try {
        // Validasi userId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }

        const deletedProfile = await Profile.findOneAndDelete({ userId });

        if (!deletedProfile) {
            return res.status(404).json({ error: "Profile not found" });
        }

        res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
        console.error("Error deleting profile:", error);
        res.status(500).json({ error: "Server error" });
    }
};