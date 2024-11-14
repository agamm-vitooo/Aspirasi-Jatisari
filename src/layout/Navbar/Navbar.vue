<template>
  <div class="bg-white shadow-md sticky top-0 z-50">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-end justify-center">
      <!-- Logo Component -->
      <Logo />
    </nav>
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
