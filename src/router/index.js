import { createRouter, createWebHistory } from 'vue-router';
import index from '../pages/auth/index.vue';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/auth/LoginPages.vue';

const routes = [{
        path: '/',
        name: 'index',
        component: index
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true } // Route that requires authentication
    }
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.VITE_BASE_URL), // For Vite projects
    routes
});

// Check authentication before accessing protected pages
router.beforeEach((to, from, next) => {
    const isLoggedIn = !!localStorage.getItem('token'); // Check if token exists
    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
        next('/login'); // Redirect to login if not authenticated
    } else {
        next(); // Proceed if authenticated or route does not require authentication
    }
});

export default router;