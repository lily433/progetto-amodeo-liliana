<script setup>
const props = defineProps(['user', 'email', 'message'])
</script>
<template>
  <div class="card p-2 w-100">
    <div class="d-flex flex-column flex-sm-row gap-2 mb-1">
      <div class="fw-bold small">User:</div>
      <div class="small">{{ props.user }}</div>
    </div>

    <div class="d-flex flex-column flex-sm-row gap-2 mb-1">
      <div class="fw-bold small">Email:</div>
      <div class="small">{{ props.email }}</div>
    </div>

    <div class="d-flex flex-column flex-sm-row gap-2">
      <div class="fw-bold small">Message:</div>
      <div class="small">{{ props.message }}</div>
    </div>
  </div>
</template>
