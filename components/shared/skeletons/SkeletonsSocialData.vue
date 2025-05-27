<template>
  <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
    <div v-for="i in 4" :key="i" class="space-y-2">
      <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
      <div class="h-10 w-full bg-gray-200 rounded-md animate-pulse"></div>
    </div>
  </div>
  <div class="mt-4">
    <div class="h-10 w-32 bg-gray-200 rounded-md animate-pulse"></div>
  </div>
</template>
<script setup lang="ts">
// No script needed for skeleton
</script>
