<script setup>
import { RouterView } from 'vue-router'

// components
import Header from './components/Header.vue'
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>
