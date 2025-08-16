<script setup>
const props = defineProps(['title', 'pictureUrl'])
</script>

<template>
  <div
    v-if="props.pictureUrl"
    :style="{ backgroundImage: 'url(' + props.pictureUrl + ')' }"
    class="w-100 h-100 bg-cover"
    alt="NASA Picture of the Day"
  >
    <div class="info w-100 h-100 d-flex flex-column justify-content-center gap-2 p-4 text-white">
      <h1 class="fw-bold">{{ props.title }}</h1>
    </div>
  </div>
</template>

<style scoped>
.info {
  background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
}
.bg-cover {
  background-size: cover !important;
}
</style>
