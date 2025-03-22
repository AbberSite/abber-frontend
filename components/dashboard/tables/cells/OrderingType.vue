<template>
<div class="flex flex-row">
    <svg v-if="type.includes('urgent')" title="طلب مستعجل" xmlns="http://www.w3.org/2000/svg" fill="none" height="28" width="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-red-800 dark:text-white backdrop:text-red-600 fill-amber-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"></path></svg>
  <img v-else-if="type.includes('multiple_order')" src="/images/multiple.svg" title="طلب متعدد" class="w-6" alt="" />
<svg v-else-if="!type.includes('orders_membership')" class="w-6 h-6 text-gray-600 dark:text-white"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14" />
</svg>
<svg v-if="type.includes('orders_membership')" class="w-6 h-6 text-gray-600 dark:text-white"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
<path stroke-linecap="round" stroke-linejoin="round" d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"></path></svg>
</div>

</template>



<script lang="ts" setup>
defineProps<{
  type: string;
}>();
</script>

<style></style>
