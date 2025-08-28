<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo.svg'

import { ref, watch } from 'vue'

const items = [
  {
    title: 'Asteroids near Earth',
    link: 'asteroid_neows',
  },
  // {
  //   title: 'Earth Observatory Natural Events',
  //   link: 'eonet',
  // },
  // {
  //   title: 'Exoplanet',
  //   link: 'exoplanet',
  // },
  {
    title: 'Mars Rover Photos',
    link: 'mars_rover_photos',
  },
]

const drawer = ref(false)
const group = ref(null)

watch(group, () => {
  drawer.value = false
})
</script>

<template>
  <header>
    <v-app-bar color="black">
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>
        <!-- navigazione alla pagina '/' al click sull'immagine -->
        <RouterLink to="/">
          <img :src="logo" width="65px" />
        </RouterLink>
      </v-app-bar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary color="black" class="text-white">
      <v-list>
        <!-- Main items -->
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.link" link>
          <v-list-item-title class="text-white">
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>

        <!-- Subgroup for Contacts & Info -->
        <v-list-group value="contacts">
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-list-item-title class="text-white">Support</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item to="/contacts">
            <v-list-item-title class="text-white">Contacts</v-list-item-title>
          </v-list-item>
          <v-list-item to="/about">
            <v-list-item-title class="text-white">About</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>
