import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import axios from 'axios';
import router from './router';

// Membuat aplikasi Vue
const app = createApp(App);

// Menambahkan axios ke properti global Vue 3
app.config.globalProperties.$axios = axios;

// Mengonfigurasi URL dasar axios
axios.defaults.baseURL = 'http://localhost:5000';

// Menggunakan router dan merender aplikasi
app.use(router).mount('#app');