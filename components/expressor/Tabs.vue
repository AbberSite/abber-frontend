<template>
  <div
    class="is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base "
    role="tablist" aria-labelledby="tablist-profile" aria-orientation="horizontal">
    <button
      class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
      id="tab-1" type="button" @click="activeTab = 'workTime'" role="tab" aria-labelledby="tabpanel-preview-1"
      aria-controls="tabpanel-preview-1" :class="{
        'border-gray-900': activeTab === 'workTime',
        'border-transparent text-gray-500 hover:text-gray-900': activeTab === 'rates'
      }">ساعات العمل</button>
      <button class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse" 
          @click="activeTab = 'rates'" id="tab-2" role="tab" type="button" aria-labelledby="tabpanel-preview-1" aria-controls="tabpanel-preview-1" :class="{
        'border-gray-900': activeTab === 'rates',
        'border-transparent text-gray-500 hover:text-gray-900': activeTab === 'workTime'
      }" ><span>التقييمات</span><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">{{props.count_rates}}</span></button>
  </div>
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
const props = defineProps<{ modelValue?: 'workTime' | 'rates'; count_rates: string }>();
const emits = defineEmits(['update:modelValue']);
const activeTab = useVModel(props, 'modelValue', emits)
</script>

<style></style>