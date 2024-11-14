<template>
  <div class="bg-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo Component -->
      <Logo />

      <!-- Desktop Navigation Links -->
      <div class="hidden md:flex space-x-4">
        <router-link to="/about" class="text-gray-700 hover:text-indigo-600">About</router-link>
        <router-link to="/blog" class="text-gray-700 hover:text-indigo-600">Blog</router-link>
      </div>

      <!-- Mobile Hamburger Menu -->
      <div class="md:hidden flex items-center">
        <button @click="toggleMenu" class="text-gray-700 hover:text-indigo-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu -->
    <div v-if="isMenuOpen" class="md:hidden bg-white shadow-md">
      <div class="px-6 py-4 flex flex-col space-y-2">
        <router-link to="/about" class="text-gray-700 hover:text-indigo-600">About</router-link>
        <router-link to="/blog" class="text-gray-700 hover:text-indigo-600">Blog</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'Navbar',
  components: {
    Logo
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
};
</script>

<style scoped>
/* Optional styling */
</style>
