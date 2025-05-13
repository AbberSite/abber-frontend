<template>
  <div>
    <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6 px-6 sm:pt-0 w-full">
      <div
        v-for="index in 5"
        :key="index"
        class="h-24 bg-gray-300 rounded animate-pulse"
      ></div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 px-6 sm:pt-0 w-full">
      <div
        v-for="index in 5"
        :key="index"
        class="h-40 bg-gray-300 rounded animate-pulse"
      ></div>
    </div>
  </div>
</template>