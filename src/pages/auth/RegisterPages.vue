<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-4">
    <!-- Container for form and image -->
    <div class="flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden">
      
      <!-- Left Side - Registration Form -->
      <div class="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div class="w-full max-w-md mx-auto">
          <!-- Logo or Icon -->
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4">
              <i class="fas fa-landmark text-white text-2xl"></i>
            </div>
            <h2 class="text-3xl font-bold text-gray-800">Register</h2>
            <p class="text-gray-600 mt-2">Create your account to access services</p>
          </div>

          <!-- Registration Form -->
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <!-- Full Name Field -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 block">Full Name</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <i class="fas fa-user text-gray-400"></i>
                </div>
                <input
                  type="text"
                  v-model="name"
                  placeholder="Full Name"
                  class="w-full pl-11 bg-white pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

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
                  placeholder="Email"
                  class="w-full bg-white pl-11 pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
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
                  type="password"
                  v-model="password"
                  placeholder="••••••••"
                  class="w-full bg-white pl-11 pr-4 py-3 border border-gray-300 text-gray-900 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="w-full flex items-center justify-center px-4 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
            >
              <span>Register</span>
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

          <!-- Login Link -->
          <p class="mt-8 text-center text-gray-600">
            Already have an account? 
            <router-link to="/login" class="text-indigo-600 hover:text-indigo-800 font-semibold">
              Login here
            </router-link>
          </p>
        </div>
      </div>

      <!-- Right Side - Image/Illustration -->
      <div class="lg:w-1/2 relative hidden lg:block">
        <div class="absolute inset-0 bg-gradient-to-r from-indigo-600/90 to-indigo-900/90 z-10"></div>
        <img 
          :src="illustrationImage"
          alt="Village Community Illustration"
          class="w-full h-full object-cover"
        />
        <!-- Content Overlay -->
        <div class="absolute inset-0 z-20 flex flex-col justify-center p-12 text-white">
          <h2 class="text-4xl font-bold mb-4">Selamat Datang di Portal Desa</h2>
          <p class="text-white/80 text-lg mb-8">Mudahnya mengakses layanan dan informasi desa.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { registerUser } from '../../api';
import Swal from 'sweetalert2';
import illustrationImage from '../../assets/images/desa.jpg'; // Import the illustration image

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: '',
      illustrationImage // Use the imported image here
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await registerUser({
          name: this.name,
          email: this.email,
          password: this.password
        });

        if (response.message === 'Registration successful') {
          Swal.fire({
            title: 'Success!',
            text: 'You have been registered successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push('/login');
          });
        } else {
          this.message = response.message || 'Registration failed';
          Swal.fire({
            title: 'Error!',
            text: this.message,
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }
};
</script>

<style scoped>
/* Tailwind CSS handles the styling */
</style>
