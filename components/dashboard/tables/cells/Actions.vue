<template>
  <span class="flex justify-center w-full">
    <NuxtLink v-if="actions?.details" :to="$route.path + data?.id"><EyeIcon class="w-5 h-5"/></NuxtLink>
  </span>
</template>

<script lang="ts" setup>
import { EyeIcon } from "@heroicons/vue/24/outline";
defineProps({
  data: Object,
  actions: Object,
})  
</script>

<style>

</style>