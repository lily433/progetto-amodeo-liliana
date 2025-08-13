<script setup>
import { ref, onMounted } from 'vue'
// components
import HomeImage from '../components/HomeImage.vue'
// services
import DataService from '../services/nasa.js'

const apod = ref(null)

onMounted(() => {
  const todayDateTime = new Date().toISOString()
  const todayDate = todayDateTime.split('T')[0]
  DataService.getDayPic(todayDate).then((data) => {
    apod.value = data.data
  })
})
</script>

<template>
  <HomeImage
    v-if="apod"
    :title="apod.title"
    :date="apod.date"
    :explanation="apod.explanation"
    :pictureUrl="apod.url"
    :copyright="apod.copyright"
  />
</template>
