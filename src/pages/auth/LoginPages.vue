<template>
  <div class="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-center mb-6">Login</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input
          type="email"
          v-model="email"
          placeholder="Email"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
    <p v-if="message" class="mt-4 text-center text-sm text-red-500">{{ message }}</p>
  </div>
</template>

<script>
import { loginUser } from '../../api';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const response = await loginUser({
          email: this.email,
          password: this.password
        });

        // Check if login is successful and show SweetAlert
        if (response.token) {
          localStorage.setItem('token', response.token);
          Swal.fire({
            title: 'Success!',
            text: 'Login successful!',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push('/dashboard'); // Redirect to dashboard
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
/* Tailwind CSS is already handling the styling */
</style>
