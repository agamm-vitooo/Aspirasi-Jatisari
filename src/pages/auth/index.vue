<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
    <div class="text-center mb-10">
      <h1 class="text-4xl font-extrabold text-indigo-600">Auth System</h1>
      <p class="text-lg text-gray-600">Create an account or log in to continue.</p>
    </div>
    
    <!-- Tab Menu -->
    <div class="mb-8 flex space-x-8">
      <button
        @click="activeTab = 'register'"
        :class="{
          'border-b-2 border-indigo-600 text-indigo-600': activeTab === 'register',
          'text-gray-600 hover:text-gray-900': activeTab !== 'register'
        }"
        class="text-lg font-medium pb-2 transition-colors duration-200"
      >
        Register
      </button>
      <button
        @click="activeTab = 'login'"
        :class="{
          'border-b-2 border-indigo-600 text-indigo-600': activeTab === 'login',
          'text-gray-600 hover:text-gray-900': activeTab !== 'login'
        }"
        class="text-lg font-medium pb-2 transition-colors duration-200"
      >
        Login
      </button>
    </div>

    <!-- Content based on activeTab -->
    <div class="w-full max-w-md">
      <Register v-if="activeTab === 'register'" />
      <Login v-if="activeTab === 'login'" />
    </div>
  </div>
</template>

<script>
import Register from '../auth/RegisterPages.vue';
import Login from '../auth/LoginPages.vue';

export default {
  components: {
    Register,
    Login
  },
  data() {
    return {
      activeTab: 'register' // Default tab is 'register'
    };
  }
};
</script>

<style scoped>
/* Tidak ada gaya tambahan di sini, semua sudah dikelola oleh TailwindCSS */
</style>
