<template>
  <div class="bg-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo Component -->
      <Logo />

      <!-- Navigation Links -->
      <div class="flex space-x-4">
        <router-link to="/about" class="text-gray-700 hover:text-indigo-600">About</router-link>
        
        <!-- Profile Icon Component -->
        <ProfileIcon />
      </div>
    </nav>
  </div>
</template>

<script>
import Logo from './Logo.vue';

export default {
  name: 'Navbar',
  components: {
    Logo
  }
};
</script>
