<template>
  <svg v-if="type === 'urgent'" title="طلب مستعجل" xmlns="http://www.w3.org/2000/svg" fill="none" height="28" width="28" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 -red-800 dark:text-white backdrop:text-red-600 fill-amber-500"><path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"></path></svg>
  <img v-else-if="type === 'multiple_order'" src="/images/multiple.svg" title="طلب متعدد" class="w-6" alt="" />
  <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" title="طلب عادي" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"> <path fill-rule="evenodd" d="M5 9a7 7 0 1 1 8 6.93V21a1 1 0 1 1-2 0v-5.07A7.001 7.001 0 0 1 5 9Zm5.94-1.06A1.5 1.5 0 0 1 12 7.5a1 1 0 1 0 0-2A3.5 3.5 0 0 0 8.5 9a1 1 0 0 0 2 0c0-.398.158-.78.44-1.06Z" clip-rule="evenodd" /> </svg>
</template>

<script lang="ts" setup>
defineProps<{
  type: string;
}>();
</script>

<style></style>
