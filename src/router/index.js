import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AsteroidsView from '@/views/AsteroidsView.vue'
import MarsRoverPhotosView from '@/views/MarsRoverPhotosView.vue'

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
    {
      path: '/mars_rover_photos',
      name: 'Mars Rover Photos',
      component: MarsRoverPhotosView,
    },
  ],
})

export default router
