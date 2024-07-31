<template>
    <div class="space-y-6">
            <div class="h-fit space-y-8 overflow-hidden rounded-lg border border-gray-200 py-6">
              <div class="space-y-3 px-6">
                <h3 class="font-medium text-gray-500 xl:text-lg">{{earingsData[0].title}}</h3>
                <p class="space-x-1 text-lg font-semibold rtl:space-x-reverse xl:text-xl"><span>{{earingsData[0].amount}}</span><small>ر.س</small></p>
              </div>
              <div class="grid grid-cols-2 gap-8 px-6 sm:grid-cols-3 md:grid-cols-2 md:gap-x-4 lg:grid-cols-3 xl:gap-x-6">
                <div class="space-y-6" v-for="({title, amount, down}, index) in earingsData" :key="index" v-show="index != 0">
                  <h3 class="text-sm font-medium text-gray-500">{{title}}</h3>
                  <p class="flex items-center space-x-3 rtl:space-x-reverse">
                    <span class="flex h-8 w-8 items-center justify-center rounded-md " :class="{'bg-yellow-600/10 text-yellow-800': down, 'bg-green-600/10 text-green-800': !down}" >
                      <ArrowUpIcon v-if="!down" class="w-[18px] h-[18px]"/>
                      <ArrowDownIcon v-else class="w-[18px] h-[18px]"/>
                      </span
                    ><span class="space-x-1 font-semibold rtl:space-x-reverse lg:text-lg 2xl:text-xl"><span>{{amount}}</span><small>ر.س</small></span>
                  </p>
                </div>
              </div>
            </div>

            <div class="h-fit overflow-hidden rounded-lg border border-gray-200 py-6">
              <h3 class="px-6 font-medium text-gray-500 xl:text-lg">الطلبات</h3>
                <div class="px-6  pt-6">
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
defineProps<{total: number | string; recieved: number | string; pending: number | string; earingsData: Array<{title: string, amount: number, down?:boolean}>; ordersInfo: Array<{title: string, amount: number}>}>();
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