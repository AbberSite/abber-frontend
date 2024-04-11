<template>
  <TransitionRoot as="template">
    <div class="fixed inset-0 z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
      </TransitionChild>

      <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full " enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="translate-x-full" as="template">
        <div class="fixed inset-0 z-40 bg-white sm:w-[340px]" v-cloak>
          <div class="flex h-full flex-col">
            <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
              <h2 class="text-lg font-semibold xs:text-xl" v-text="title"></h2>
              <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="$emit('close')">
                <span class="sr-only">إغلاق القائمة</span>
                <!-- Heroicon name: outline/x-mark -->
                <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <slot></slot>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from "@headlessui/vue";

const emit = defineEmits(["close"]);
defineProps({
  title: String,
});
</script>

<style scoped></style>
