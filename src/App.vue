<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import DataService from '/src/services/nasa.js'

onMounted(function () {
  DataService.getDayPic().then(function (data) {
    console.log('data', data)
  })
})
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
