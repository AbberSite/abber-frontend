<template>
    <div class="flex flex-col justify-start min-w-max gap-y-4">
      <span>الأرباح المستحقة</span>
      <h2 class="font-bold text-xl">{{total ?? 1200}} ريال</h2>
      <div class="flex justify-between items-center gap-x-10">
        <div class="flex flex-col gap-2">
          <span>الأرباح المرسلة</span>
          <div class="flex gap-2 items-center">
            <ArrowUpIcon
              class="bg-green-100 text-green-700"
            />
            <h2>{{ recieved ?? 12300 }} ريال</h2>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span>الأرباح المعلقة</span>
          <div class="flex gap-2 items-center">
            <ArrowDownIcon
              class="rounded-full bg-red-100 text-red-700"
            />
            <h2>{{pending ?? 1200}} ريال</h2>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/vue/24/outline";

defineProps<{total: number | string; recieved: number | string; pending: number | string}>();
</script>

<style scoped>
span {
   @apply font-medium text-gray-600 text-lg;
}
h2 {
   @apply font-bold text-xl;
}
svg {
   @apply w-8 h-8 p-2 rounded-full;
}
</style>