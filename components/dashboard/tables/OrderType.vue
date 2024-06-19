<template>
  <span
    v-if="type == 'text_communication'"
    class="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-3 pb-1 pt-1 text-xs font-medium text-yellow-800 rtl:space-x-reverse"
  >
    <svg
      class="w-6 h-6 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M3 6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-6.616l-2.88 2.592C8.537 20.461 7 19.776 7 18.477V17H5a2 2 0 0 1-2-2V6Zm4 2a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2H7Zm8 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Zm-8 3a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H7Zm5 0a1 1 0 1 0 0 2h5a1 1 0 1 0 0-2h-5Z"
        clip-rule="evenodd"
      />
    </svg>

    <span class="pt-1">نصي</span></span
  >

  <span
    v-else
    class="inline-flex items-center space-x-1 rounded-full bg-teal-100 px-3 pb-1 pt-1 text-xs font-medium text-teal-800 rtl:space-x-reverse"
  >
    <svg
      class="w-6 h-6 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fill-rule="evenodd"
        d="M14 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7Zm2 9.387 4.684 1.562A1 1 0 0 0 22 17V7a1 1 0 0 0-1.316-.949L16 7.613v8.774Z"
        clip-rule="evenodd"
      />
    </svg>

    <span class="pt-1">صوتي</span></span
  >
</template>

<script setup lang="ts">
defineProps<{
  type?: string;
}>();
</script>

<style scoped></style>
