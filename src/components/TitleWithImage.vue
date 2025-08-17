<script setup>
const props = defineProps(['title', 'pictureUrl'])
</script>

<template>
  <v-parallax
    v-if="props.pictureUrl"
    :src="props.pictureUrl"
    height="600"
    alt="NASA Picture of the Day"
  >
    <div class="info w-100 h-100 d-flex flex-column justify-content-center gap-2 p-4 text-white">
      <h1 class="fw-bold">{{ props.title }}</h1>
    </div>
  </v-parallax>
</template>

<style scoped>
.info {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
.bg-cover {
  background-size: cover !important;
}
</style>
