<template>
    <div class="animate-pulse">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 py-5">
        <div class="flex justify-between items-center">
          <p class="skeleton-text w-1/3"></p>
          <div class="skeleton-box w-1/3 h-6"></div>
        </div>
        <div class="flex justify-between items-center">
          <p class="skeleton-text w-1/3"></p>
          <div class="skeleton-box w-1/3 h-6"></div>
        </div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div :class="$style.input_elements">
        <div class="skeleton-box h-10 w-full"></div>
        <div class="skeleton-box h-10 w-full"></div>
      </div>
      <div class="flex items-center gap-1">
        <div class="skeleton-box h-6 w-6"></div>
        <div class="skeleton-text w-1/3"></div>
      </div>
      <div class="flex items-center justify-between pt-6">
        <div class="skeleton-box h-10 w-1/3"></div>
        <div class="skeleton-box h-10 w-1/3"></div>
      </div>
    </div>
  </template>
  
  <style scoped>
  .skeleton-box {
    background: #e0e0e0;
    border-radius: 4px;
  }
  .skeleton-text {
    background: #e0e0e0;
    border-radius: 4px;
    height: 1rem;
  }
  </style>
<style module>
.input_elements {
    @apply flex flex-col sm:flex-row justify-between items-start gap-x-5 my-2;
}
</style>  