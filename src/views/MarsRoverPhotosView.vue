<script setup>
import { ref, onMounted } from 'vue'
// components
import TitleWithImage from '@/components/TitleWithImage.vue'
// services
import DataService from '@/services/nasa.js'

const data = ref(null)
const loading = ref(true)

onMounted(() => {
  DataService.getMarsRoverPhotos()
    .then((d) => {
      data.value = d.data.photos
    })
    .catch((e) => {
      // catch error
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
  <div v-else class="d-flex flex-column justify-content-center align-center gap-4 h-100">
    <div style="width: 100%; height: 400px">
      <TitleWithImage title="Mars Rover Photos" pictureUrl="src/assets/mars.png" />
    </div>
    <div class="container d-flex flex-column w-100 gap-4 m-4">
      <div class="fs-5 fs-md-3 fw-bold">List of Mars Rover photos</div>
      <div class="row g-2">
        <div
          v-for="(photo, i) in data"
          :key="i"
          class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
        >
          <v-card
            class="d-flex justify-content-center align-items-end text-white"
            style="height: 200px"
          >
            <v-img :src="photo.img_src" :lazy-src="photo.img_src" cover class="w-100 h-100">
              <!-- Spinner while loading -->
              <template #placeholder>
                <div class="d-flex align-center justify-center fill-height">
                  <v-progress-circular indeterminate color="white"></v-progress-circular>
                </div>
              </template>

              <!-- Gradient overlay -->
              <div
                class="position-absolute bottom-0 start-0 w-100 p-2"
                style="background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent)"
              >
                <div>
                  <span class="badge bg-primary w-auto">{{ photo.earth_date }}</span>
                </div>
                <div>
                  {{ photo.camera.full_name }}
                </div>
              </div>
            </v-img>
          </v-card>
        </div>
      </div>
    </div>
  </div>
</template>
