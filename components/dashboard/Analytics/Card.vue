<template>
    <div class="bg-white border border-gray-100 flex justify-between px-5 py-5 relative rounded-lg" :class="{'min-w-[250px]': !nowidth, 'cursor-pointer': url}" @click="navigateToUrl(url)">
      <div class="text-right">
        <p class="font-medium text-gray-600">
          {{ title }}
        </p>
        <p class="font-bold mt-8 text-primary text-xl">
          {{ count }} <small>{{ subtitle }}</small>
        </p>
      </div>
      <div :class="iconBackgroundClass">
        <slot name="icon"></slot>
      </div>
      <div class="absolute bottom-0 dark:text-secondary/40 left-0 overflow-hidden rounded-lg text-gray-200">
        <slot name="background-icon" ></slot>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

defineProps<{
    title: string;
    count: number | string;
    subtitle: string;
    iconBackgroundClass: string;
    nowidth?: boolean;
    url?: string;
  }>();
  
  function navigateToUrl(url) {
    if (url) {
      window.open(url, '_blank');
    }
  }
  </script>
  
  <style scoped></style>


