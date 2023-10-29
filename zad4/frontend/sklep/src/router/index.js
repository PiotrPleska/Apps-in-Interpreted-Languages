import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/order-form',
        name: 'OrderForm', // This defines the name of the route
        component: () => import('@/components/OrderForm'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;