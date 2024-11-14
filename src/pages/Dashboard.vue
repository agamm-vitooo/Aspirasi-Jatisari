<template>
  <div>
    <h2>Welcome to Your Dashboard</h2>
    <p>You are now logged in!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.removeItem('token'); // Hapus token untuk logout
      this.$router.push('/login'); // Arahkan ke halaman login setelah logout
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya untuk dashboard jika diperlukan */
</style>
