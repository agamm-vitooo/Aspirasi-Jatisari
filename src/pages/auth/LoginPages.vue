<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
    <!-- Login Container -->
    <div class="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      <!-- Left Side - Image and Overlay -->
      <div class="lg:w-1/2 relative hidden lg:block">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-indigo-900/90 z-10"></div>
        <img 
          :src="bannerImage"
          alt="Desa Jatisari"
          class="w-full h-full object-cover"
        />
        <!-- Content Overlay -->
        <div class="absolute inset-0 z-20 flex flex-col justify-center p-12 text-white">
          <h2 class="text-4xl font-bold mb-4">Selamat Datang di Portal Desa Jatisari</h2>
          <p class="text-white/80 text-lg mb-8">Akses layanan desa dengan mudah dan cepat untuk kehidupan yang lebih baik.</p>
          <!-- Features List -->
          <div class="space-y-4">
            <div v-for="(feature, index) in features" :key="index" class="flex items-center space-x-3">
              <div class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <i :class="feature.icon" class="text-white"></i>
              </div>
              <span>{{ feature.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Login Form -->
      <div class="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div class="w-full max-w-md mx-auto">
          <!-- Logo or Icon -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4">
              <i class="fas fa-landmark text-white text-2xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800">Login</h2>
            <p class="text-gray-600 mt-2">Masuk ke akun Anda</p>
          </div>

          <!-- Login Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Email Field -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 block">Email</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-envelope text-gray-400"></i>
                </div>
                <input
                  type="email"
                  v-model="email"
                  placeholder="nama@email.com"
                  class="w-full pl-11 bg-white pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 block">Password</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-lock text-gray-400"></i>
                </div>
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="password"
                  placeholder="••••••••"
                  class="w-full pl-11 bg-white pr-10 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
                <button 
                  type="button"
                  @click="togglePassword"
                  class="absolute inset-y-0 right-0 pr-4 flex items-center"
                >
                  <i :class="[showPassword ? 'fas fa-eye-slash' : 'fas fa-eye', 'text-gray-400 hover:text-gray-600']"></i>
                </button>
              </div>
            </div>

            <!-- Remember Me & Forgot Password -->
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center">
                <input type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                <span class="ml-2 text-gray-600 bg-white">Ingat saya</span>
              </label>
              <a href="#" class="text-indigo-600 hover:text-indigo-800">Lupa password?</a>
            </div>

            <!-- Login Button -->
            <button
              type="submit"
              class="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              <span>Masuk</span>
              <i class="fas fa-arrow-right ml-2"></i>
            </button>
          </form>

          <!-- Error Message -->
          <div v-if="message" class="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
            <div class="flex">
              <i class="fas fa-exclamation-circle mr-2"></i>
              <p>{{ message }}</p>
            </div>
          </div>

          <!-- Register Link -->
          <p class="mt-8 text-center text-gray-600">
            Belum punya akun? 
            <router-link to="/register" class="text-indigo-600 hover:text-indigo-800 font-semibold">
              Daftar sekarang
            </router-link>
          </p>
          
          <!-- Social Login Options -->
          <div class="mt-8">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">Atau masuk dengan</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <button class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <i class="fab fa-google text-red-500 mr-2"></i>
                Google
              </button>
              <button class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200">
                <i class="fab fa-facebook text-blue-600 mr-2"></i>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../../api';
import Swal from 'sweetalert2';
import bannerImage from '../../assets/images/desa.jpg';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      message: '',
      showPassword: false,
      bannerImage,
      features: [
        { icon: 'fas fa-file-alt', text: 'Pengajuan Surat Online' },
        { icon: 'fas fa-comments', text: 'Layanan Pengaduan' },
        { icon: 'fas fa-chart-line', text: 'Informasi Pembangunan' },
        { icon: 'fas fa-calendar-check', text: 'Agenda Kegiatan Desa' }
      ]
    };
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
      try {
        const response = await loginUser({
          email: this.email,
          password: this.password
        });

        if (response.token) {
          localStorage.setItem('token', response.token);
          Swal.fire({
            title: 'Berhasil!',
            text: 'Login berhasil!',
            icon: 'success',
            confirmButtonText: 'OK',
            confirmButtonColor: '#4F46E5'
          }).then(() => {
            this.$router.push('/dashboard');
          });
        } else {
          this.message = response.message || 'Login gagal';
          Swal.fire({
            title: 'Gagal!',
            text: this.message,
            icon: 'error',
            confirmButtonText: 'Coba Lagi',
            confirmButtonColor: '#4F46E5'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan. Silakan coba lagi nanti.',
          icon: 'error',
          confirmButtonText: 'OK',
          confirmButtonColor: '#4F46E5'
        });
      }
    }
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>