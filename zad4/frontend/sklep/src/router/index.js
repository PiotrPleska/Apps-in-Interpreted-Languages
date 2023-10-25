import { createWebHistory, createRouter } from "vue-router";
import OrderForm from "@/components/OrderForm.vue";

const routes = [
  
{
    path: "/order",
    name: "OrderForm",
    component: OrderForm,
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;