<!-- src/views/Home.vue -->
<template>
  <div>
    <h1>Auth System</h1>
    <Register />
    <Login />
  </div>
</template>

<script>
import Register from '../auth/RegisterPages.vue';
import Login from '../auth/LoginPages.vue';

export default {
  components: {
    Register,
    Login
  }
};
</script>

<style scoped>
/* Tambahkan gaya untuk halaman Home jika diperlukan */
</style>
