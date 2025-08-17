<script setup>
const props = defineProps(['context', 'title', 'copyright', 'date', 'explanation', 'pictureUrl'])
</script>

<template>
  <!-- Desktop layout -->
  <div
    v-if="props.pictureUrl"
    class="d-none d-sm-block w-100 h-100 bg-cover"
    :style="{ backgroundImage: 'url(' + props.pictureUrl + ')' }"
    alt="NASA Picture of the Day"
  >
    <div class="info w-70 h-100 d-flex flex-column justify-content-center gap-2 p-4 text-white">
      <h1 class="fw-bold">{{ props.context }}</h1>
      <div>
        <span class="badge bg-primary w-auto fs-6">{{ props.date }}</span>
      </div>
      <h4 class="fw-bold">{{ props.title }}</h4>
      <small class="w-50">{{ props.explanation }}</small>
      <small v-if="props.copyright" class="fst-italic">Copyrights {{ props.copyright }}</small>
    </div>
  </div>

  <!-- Mobile layout -->
  <div v-if="props.pictureUrl" class="d-block d-sm-none w-100 h-100 bg-dark text-white p-3">
    <img :src="props.pictureUrl" alt="NASA Picture of the Day" class="img-fluid rounded mb-3" />
    <h1 class="fw-bold">{{ props.context }}</h1>
    <span class="badge bg-primary w-auto fs-6">{{ props.date }}</span>
    <h4 class="fw-bold mt-2">{{ props.title }}</h4>
    <small class="d-block mt-2">{{ props.explanation }}</small>
    <small v-if="props.copyright" class="fst-italic d-block mt-2"
      >Copyrights {{ props.copyright }}</small
    >
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
