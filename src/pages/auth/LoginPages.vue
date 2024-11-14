<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100">
    <!-- Container for form and image -->
    <div class="flex flex-col sm:flex-row bg-white w-full sm:w-auto rounded-xl shadow-xl overflow-hidden">
      
      <!-- Login Form on the Left -->
      <div class="w-full sm:w-96 p-8">
        <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">Login</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full p-4 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 bg-white"
              required
            />
          </div>
          <div>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full p-4 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <!-- Error message -->
        <p v-if="message" class="mt-4 text-center text-sm text-red-500">{{ message }}</p>

        <!-- Register link -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Belum punya akun? 
          <router-link to="/register" class="text-indigo-600 hover:text-indigo-700 font-semibold">Register</router-link>
        </p>
      </div>

      <!-- Image on the Right -->
      <div class="hidden sm:block w-full sm:w-96">
        <img 
          :src="bannerImage"
          alt="Desa Jatisari Banner"
          class="object-cover w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { loginUser } from '../../api';
import Swal from 'sweetalert2';
import bannerImage from '../../assets/images/desa.jpg'; // Import the image

export default {
  data() {
    return {
      email: '',
      password: '',
      message: '',
      bannerImage // Use the imported image here
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await loginUser({
          email: this.email,
          password: this.password
        });

        if (response.token) {
          localStorage.setItem('token', response.token);
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push('/dashboard');
          });
        } else {
          this.message = response.message || 'Login failed';
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
