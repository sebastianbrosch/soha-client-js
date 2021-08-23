import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import Order from '../views/Order.vue'
import Software from '../views/Software.vue'
import Hardware from '../views/Hardware.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/software',
    name: 'Software',
    component: Software
  },
  {
    path: '/hardware',
    name: 'Hardware',
    component: Hardware
  }
];

const router = new VueRouter({
  routes
})

export default router
