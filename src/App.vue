<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

// components
import Header from './components/Header.vue'

// services
import DataService from './services/nasa.js'

onMounted(function () {
  DataService.getDayPic().then(function (data) {
    console.log('data', data)
  })
})
</script>

<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
