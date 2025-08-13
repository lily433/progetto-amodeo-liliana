import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AsteroidsView from '@/views/AsteroidsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/asteroid_neows',
      name: 'Asteroids NeoWs',
      component: AsteroidsView,
    },
  ],
})

export default router
