<template>
<footer class="mt-10 md:pb-6 pb-24 pt-6">
  <p class="dark:text-gray-200 flex items-center justify-center leading-[1.75] md:px-8 px-4 space-x-2 space-x-reverse text-gray-600">
    <span>حقوق الطبع و النشر © {{ year }} </span>
    <a href="/" class="font-medium text-primary dark:text-gray-200" title="عبر">عبر. </a>
    <span class="hidden lg:flex">جميع الحقوق محفوظة</span>
  </p>
</footer>
</template>

<script lang="ts" setup>
const year = computed(() => new Date().getFullYear())
</script>

<style>

</style>