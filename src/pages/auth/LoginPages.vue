<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { loginUser } from '../../api';

export default {
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      const response = await loginUser({
        email: this.email,
        password: this.password
      });
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.$router.push('/dashboard'); // Redirect ke dashboard
      } else {
        this.message = response.message || 'Login failed';
      }
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya untuk form login jika diperlukan */
</style>
