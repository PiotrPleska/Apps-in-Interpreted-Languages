import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/order-form',
        name: 'OrderForm', // This defines the name of the route
        component: () => import('@/components/OrderForm'),
    },
    {
        path: "/admin-panel",
        component: () => import('@/components/AdminPanel'),
        // meta: { requiresAuth: true },
    },

];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    // Check if the route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Check if the user is authenticated
        if (!localStorage.getItem("isLoggedIn")) {
            // Redirect to the login page if not authenticated
            next("/");
        } else {
            // Continue to the route if authenticated
            next();
        }
    } else {
        // Continue to the route if it doesn't require authentication
        next();
    }
});

export default router;