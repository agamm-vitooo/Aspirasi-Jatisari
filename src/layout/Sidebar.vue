<template>
  <div :class="{'w-64': isOpen, 'w-16': !isOpen}" class="h-screen bg-indigo-600 text-white transition-all duration-300 flex flex-col">
    <!-- Sidebar Toggle Button with Hamburger Icon -->
    <button @click="toggleSidebar" class="p-4">
      <span v-if="!isOpen" class="text-2xl">☰</span> <!-- Hamburger icon when sidebar is minimized -->
      <span v-else class="text-xl">✖</span> <!-- Close icon when sidebar is open -->
    </button>

    <!-- Sidebar Links -->
    <ul v-if="isOpen" class="mt-4">
      <li class="mb-4">
        <a href="#" class="block py-2 px-4 hover:bg-indigo-700 rounded">Home</a>
      </li>
      <li class="mb-4">
        <a href="#" class="block py-2 px-4 hover:bg-indigo-700 rounded">Laporan</a>
      </li>
      <li class="mb-4">
        <a href="#" class="block py-2 px-4 hover:bg-indigo-700 rounded">Profil</a>
      </li>
      <li>
        <button @click="logout" class="w-full text-left py-2 px-4 hover:bg-red-700 rounded text-red-200">Log Out</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: true,
    };
  },
  methods: {
    toggleSidebar() {
      this.isOpen = !this.isOpen;
    },
    logout() {
      // Clear token from localStorage and redirect to login page
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
/* Tailwind CSS handles styling */
</style>
