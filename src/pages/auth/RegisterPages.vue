<template>
  <div class="max-w-sm mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input
          type="text"
          v-model="name"
          placeholder="Full Name"
          class="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>
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
        Register
      </button>
    </form>
    <p v-if="message" class="mt-4 text-center text-sm text-red-500">{{ message }}</p>
  </div>
</template>

<script>
import { registerUser } from '../../api';
import Swal from 'sweetalert2'; // Import SweetAlert2

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: ''
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
        
        // Show success message with SweetAlert
        if (response.message === 'Registration successful') {
          Swal.fire({
            title: 'Success!',
            text: 'You have been registered successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push('/login'); // Redirect to login page
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
/* Tailwind CSS is already handling the styling */
</style>
