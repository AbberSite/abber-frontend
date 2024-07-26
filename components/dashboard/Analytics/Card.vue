<template>
    <div class="bg-white border border-gray-100 flex justify-between px-5 py-5 relative rounded-lg min-w-[250px]">
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
  defineProps<{
    title: string;
    count: number | string;
    subtitle: string;
    iconBackgroundClass: string;
  }>();
  </script>
  
  <style scoped></style>

  
  