import { createRouter, createWebHistory } from 'vue-router';
import index from '../pages/auth/index.vue';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/auth/LoginPages.vue';

const routes = [
    { path: '/', name: 'index', component: index },
    { path: '/login', name: 'Login', component: Login },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Middleware untuk cek autentikasi
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token'); // Token harus ada di localStorage
    console.log('Auth Check:', isLoggedIn, 'Target Route:', to.path); // Log untuk cek token dan rute

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/login'); // Jika belum login, arahkan ke halaman login
    } else {
        next(); // Jika sudah login atau rute tidak membutuhkan autentikasi, lanjutkan
    }
});

export default router;