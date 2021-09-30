import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Customers from '../views/Customers.vue'
import Cart from '../views/Cart.vue'
import Orders from '../views/Orders.vue'
// import Store from '@/store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter: (to, from) => {
      // return this.$store.customer
      
    },
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter: (to, from) => {
      // return this.$store.customer
    },
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
