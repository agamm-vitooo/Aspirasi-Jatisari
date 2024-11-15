const User = require('../models/user');

// Fungsi untuk memperbarui profil pengguna
exports.updateProfile = async(req, res) => {
    const { userId, name, email } = req.body; // Ambil data dari request body

    try {
        // Mencari user berdasarkan ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        // Memperbarui informasi profil jika ada perubahan
        if (name) user.name = name;
        if (email) user.email = email;

        // Jika ada foto profil baru yang diupload, simpan URL foto tersebut
        if (req.file) {
            user.profilePicture = req.file.path; // Menyimpan path file foto yang diupload
        }

        // Simpan perubahan ke database
        await user.save();

        res.status(200).json({
            message: 'Profil berhasil diperbarui',
            user: {
                name: user.name,
                email: user.email,
                profilePicture: user.profilePicture,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan server', error });
    }
};