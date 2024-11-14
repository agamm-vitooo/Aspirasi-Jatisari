import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/auth/LoginPages.vue';
import Register from '../pages/auth/RegisterPages.vue';
import About from '../pages/AboutPages.vue';
import Profile from '../pages/ProfilePages.vue';

const routes = [
    { path: '/login', name: 'Login', component: Login, meta: { hideNavbar: true } },
    { path: '/register', name: 'Register', component: Register, meta: { hideNavbar: true } },
    { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
    { path: '/about', name: 'About', component: About },
    { path: '/profile', name: 'Profile', component: Profile }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Middleware for authentication check
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token');
    console.log('Auth Check:', isLoggedIn, 'Target Route:', to.path);

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

export default router;