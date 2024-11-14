<template>
  <div class="flex items-center justify-center min-h-screen bg-slate-100">
    <!-- Container for form and image -->
    <div class="flex flex-col sm:flex-row bg-white w-full sm:w-auto rounded-xl shadow-xl overflow-hidden">
      
      <!-- Registration Form on the Left -->
      <div class="w-full sm:w-96 p-8">
        <h2 class="text-3xl font-bold text-center text-indigo-700 mb-6">Register</h2>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Full Name Input -->
          <div>
            <input
              type="text"
              v-model="name"
              placeholder="Full Name"
              class="w-full p-4 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <!-- Email Input -->
          <div>
            <input
              type="email"
              v-model="email"
              placeholder="Email"
              class="w-full p-4 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <!-- Password Input -->
          <div>
            <input
              type="password"
              v-model="password"
              placeholder="Password"
              class="w-full p-4 border bg-white text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            />
          </div>
          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </form>

        <!-- Error message -->
        <p v-if="message" class="mt-4 text-center text-sm text-red-500">{{ message }}</p>

        <!-- Link to Login -->
        <p class="mt-4 text-center text-sm text-gray-600">
          Already have an account? 
          <router-link to="/login" class="text-indigo-600 hover:text-indigo-700 font-semibold">Login</router-link>
        </p>
      </div>

      <!-- Illustration Image on the Right -->
      <div class="hidden sm:block w-full sm:w-96">
        <img 
          :src="illustrationImage"
          alt="Village Community Illustration"
          class="object-cover w-full h-full"
        />
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
