<template>
  <div id="app" class="flex">
    <!-- Sidebar will only appear if the route meta doesn't have hideNavbar as true -->
    <Sidebar v-if="!$route.meta.hideNavbar" />

    <!-- Main Content Area -->
    <div class="flex-1">
      <!-- Show Navbar if hideNavbar meta property is not true -->
      <Navbar v-if="!$route.meta.hideNavbar" />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from './layout/Navbar/Navbar.vue';
import Sidebar from './layout/Sidebar.vue';

export default {
  name: "App",
  components: { Navbar, Sidebar }
};
</script>

<style>
/* Add any global styles here if needed */
</style>
