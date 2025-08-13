<script setup>
import { RouterLink } from 'vue-router'
import logo from '@/assets/logo.svg'

import { ref, watch } from 'vue'

const items = [
  {
    title: 'Asteroid NeoWs',
    link: 'asteroid_news',
  },
  {
    title: 'Earth Observatory Natural Events',
    link: 'eonet',
  },
  {
    title: 'Exoplanet',
    link: 'exoplanet',
  },
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

      <div style="width: 200px; margin: 10px 14px">
        <v-text-field
          :loading="loading"
          append-inner-icon="mdi-magnify"
          density="compact"
          label="Search"
          variant="outlined"
          hide-details
          single-line
          @click:append-inner="onClick"
        ></v-text-field>
      </div>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :value="item" :to="item.link" link>
          <v-list-item-title>
            {{ item.title }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>
