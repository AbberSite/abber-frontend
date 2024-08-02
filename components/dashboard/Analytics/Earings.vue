<template>
    <div class="space-y-4 md:col-span-2 lg:space-y-6">
            <div class="h-fit space-y-8 overflow-hidden rounded-lg border border-gray-200 py-6">
              <div class="space-y-3 px-6 sm:px-4 lg:px-6">
                <h3 class="font-medium text-gray-500 xl:text-lg">{{earingsData[0].title}}</h3>
                <p class="space-x-1 text-lg font-semibold rtl:space-x-reverse xl:text-xl"><span>{{earingsData[0].amount}}</span><small>ر.س</small></p>
              </div>
              <div class="grid grid-cols-2 gap-8 px-6 sm:px-4 md:gap-x-4 lg:px-6 xl:gap-x-6">
                <div class="space-y-4" v-for="(data, index) in earingsData" :key="index" v-show="index != 0">
                  <h3 class="text-sm font-medium text-gray-500">{{data.title}}</h3>
                  <p class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span :class="`flex h-8 w-8 items-center justify-center rounded-md ${data.colors}`">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="18" width="18" v-html="data.svgIcon"></svg> </span>
                      <span>{{data.amount}}</span><small>{{data.type ?? 'ر.س'}}</small>
                  </p>
                </div>
              </div>
            </div>

            <div class="h-fit overflow-hidden rounded-lg border border-gray-200 py-6">
              <h3 class="px-6 font-medium text-gray-500 sm:px-4 lg:px-6 xl:text-lg">إحصائيات الرسوم</h3>
                <div class="px-6 pt-6  sm:px-4 lg:px-6">
                  <div v-for="({title, amount}, i) in ordersInfo" :key="i" class="flex items-center justify-between py-4">
                    <div class="text-sm font-medium text-gray-500 lg:text-base">{{ title }}</div>
                    <div class="text-sm font-medium lg:text-base">{{ amount }} ر.س</div>
                  </div>
                </div>
            </div>
            </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/outline';
defineProps<{total: number | string; recieved: number | string; pending: number | string; earingsData: Array<{title: string, amount: number, colors: string, svgIcon: string, type: string}>; ordersInfo: Array<{title: string, amount: number}>}>();
</script>

<style scoped>
span {
   @apply font-medium text-lg;
}
h2 {
   @apply font-bold text-xl;
}
svg {
   @apply w-8 h-8 p-2 rounded-full;
}
</style>