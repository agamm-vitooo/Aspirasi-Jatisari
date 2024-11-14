<!-- src/components/Register.vue -->
<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="name" placeholder="Name" required />
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { registerUser } from '../../api';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async handleSubmit() {
      const response = await registerUser({
        name: this.name,
        email: this.email,
        password: this.password
      });
      this.message = response.message || 'Registration successful';
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya untuk form jika diperlukan */
</style>
