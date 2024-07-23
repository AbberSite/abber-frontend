<template>
    <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">{{ department }}</p>
    <p class="text-lg font-semibold">{{ title }}</p>
    <slot/>
  </div>
</template>

<script setup lang="ts">
defineProps<{department: string, title:string}>();
</script>