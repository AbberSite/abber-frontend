<template>
  <div
    class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 py-6 rtl:space-x-reverse xs:px-6 sm:hidden">
    <slot></slot>
    <button
      class="flex h-[50px] w-[25%] items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50"
      type="button" @click="$emit('open-modal')" aria-expanded="false" aria-haspopup="true">
      <span class="sr-only">فتح قائمة الإجراءات</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24"
        stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z">
        </path>
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
