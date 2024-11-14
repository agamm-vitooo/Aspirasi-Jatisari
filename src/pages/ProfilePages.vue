<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="container mx-auto max-w-2xl">
      <!-- Card Container -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">Profil Saya</h2>
          <p class="text-gray-500 mt-2">Kelola informasi profil Anda</p>
        </div>

        <div v-if="profile" class="space-y-6">
          <!-- Profile Picture Section -->
          <div class="flex flex-col items-center space-y-4">
            <div class="relative group">
              <img
                :src="profile.profilePicture || 'https://via.placeholder.com/150'"
                alt="Profile Picture"
                class="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div class="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <label for="profilePicture" class="text-white text-sm cursor-pointer">
                  <i class="fas fa-camera text-2xl"></i>
                </label>
                <input
                  type="file"
                  id="profilePicture"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                />
              </div>
            </div>
            <p class="text-sm text-gray-500">Klik untuk mengubah foto profil</p>
          </div>

          <!-- Form Fields -->
          <div class="space-y-6">
            <!-- Username Field -->
            <div class="form-group">
              <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-user mr-2"></i>Username
              </label>
              <input
                type="text"
                id="username"
                v-model="profile.username"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                placeholder="Masukkan username Anda"
              />
            </div>

            <!-- Email Field -->
            <div class="form-group">
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-envelope mr-2"></i>Email
              </label>
              <input
                type="email"
                id="email"
                v-model="profile.email"
                class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white"
                placeholder="Masukkan email Anda"
              />
            </div>

            <!-- Password Field -->
            <div class="form-group relative">
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                <i class="fas fa-lock mr-2"></i>Password
              </label>
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="profile.password"
                  class="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white pr-10"
                  placeholder="Masukkan password baru"
                />
                <button
                  @click="togglePassword"
                  type="button"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              @click="updateProfile"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <i class="fas fa-save"></i>
              <span>Simpan Perubahan</span>
            </button>
            <button
              @click="confirmDelete"
              class="flex-1 bg-white hover:bg-red-50 text-red-600 py-3 px-6 rounded-lg font-medium border border-red-200 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <i class="fas fa-trash-alt"></i>
              <span>Hapus Akun</span>
            </button>
          </div>
        </div>

        <!-- Loading State -->
        <div v-else class="flex flex-col items-center justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p class="text-gray-500 mt-4">Memuat profil...</p>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md mx-4">
        <h3 class="text-xl font-bold text-gray-800 mb-4">Konfirmasi Hapus Akun</h3>
        <p class="text-gray-600 mb-6">Apakah Anda yakin ingin menghapus akun? Tindakan ini tidak dapat dibatalkan.</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="showDeleteModal = false"
            class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            Batal
          </button>
          <button
            @click="deleteProfile"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Hapus Akun
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      profile: null,
      showPassword: false,
      showDeleteModal: false,
      loading: false
    };
  },
  mounted() {
    this.getProfile();
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        try {
          // Implementasi upload gambar ke server
          const formData = new FormData();
          formData.append('profilePicture', file);
          
          const response = await axios.post('http://localhost:5000/api/upload-profile-picture', formData);
          this.profile.profilePicture = response.data.url;
          
          this.$toast.success('Foto profil berhasil diperbarui!');
        } catch (error) {
          this.$toast.error('Gagal mengunggah foto profil');
          console.error('Error uploading image:', error);
        }
      }
    },
    async getProfile() {
      try {
        const response = await axios.get('http://localhost:5000/api/profile');
        this.profile = response.data || {};
      } catch (error) {
        this.$toast.error('Gagal memuat profil');
        console.error('Error fetching profile:', error);
      }
    },
    async updateProfile() {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:5000/api/profile', this.profile);
        this.profile = response.data;
        this.$toast.success('Profil berhasil diperbarui!');
      } catch (error) {
        this.$toast.error('Gagal memperbarui profil');
        console.error('Error updating profile:', error);
      } finally {
        this.loading = false;
      }
    },
    confirmDelete() {
      this.showDeleteModal = true;
    },
    async deleteProfile() {
      try {
        await axios.delete('http://localhost:5000/api/profile');
        this.showDeleteModal = false;
        this.$toast.success('Akun berhasil dihapus');
        this.$router.push('/login');
      } catch (error) {
        this.$toast.error('Gagal menghapus akun');
        console.error('Error deleting profile:', error);
      }
    }
  }
};
</script>

<style scoped>
.form-group input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>