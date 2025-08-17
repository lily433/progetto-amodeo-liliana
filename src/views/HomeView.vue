<script setup>
import { ref, onMounted } from 'vue'
// components
import FullPageImageWithDescription from '@/components/FullPageImageWithDescription.vue'
// services
import DataService from '@/services/nasa.js'

const apod = ref(null)
const loading = ref(true)

onMounted(() => {
  const todayDateTime = new Date().toISOString()
  const todayDate = todayDateTime.split('T')[0]
  DataService.getDayPic(todayDate)
    .then((data) => {
      apod.value = data.data
    })
    .catch((e) => {
      // handle error
    })
    .finally(() => {
      loading.value = false
    })
})
</script>

<template>
  <div v-if="loading" class="d-flex justify-content-center align-items-center w-100 h-100">
    <v-progress-circular indeterminate></v-progress-circular>
  </div>
  <div v-else class="d-flex justify-content-center align-items-center w-100 h-100">
    <FullPageImageWithDescription
      v-if="apod"
      :context="'PIC OF THE DAY'"
      :title="apod.title"
      :date="apod.date"
      :explanation="apod.explanation"
      :pictureUrl="apod.url"
      :copyright="apod.copyright"
    />
  </div>
</template>
