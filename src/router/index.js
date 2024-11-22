import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventDetails from '../components/EventDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/advantage-sign-in',
      name: 'advantages-sign-in',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AdvantagesSignIn.vue'),
    },
    {
      path: '/event/:id', // Dynamic route for event details
      name: 'event-details',
      component: EventDetails,
    },
    {
      path: '/login', // New route for login page
      name: 'login',
      component: () => import('../views/Login.vue'), // Lazy-loaded login component
    },
    {
      path: '/create-account', // New route for login page
      name: 'create-account',
      component: () => import('../views/CreateAccount.vue'), // Lazy-loaded login component
    },
    {
      path: '/account-welcome', // New route for login page
      name: 'account-welcome',
      component: () => import('../views/AccountWelcome.vue'), // Lazy-loaded login component
    },
    {
      path: '/create-event', // New route for login page
      name: 'create-event',
      component: () => import('../views/CreateEvent.vue'), // Lazy-loaded login component
    },
    {
      path: '/my-events', // New route for login page
      name: 'my-events',
      component: () => import('../views/myEvents.vue'), // Lazy-loaded login component
    },
  ],
})

export default router
