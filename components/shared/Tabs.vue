<template>
    <div
      class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 text-sm rtl:space-x-reverse xs:text-base"
      role="tablist"
      aria-labelledby="tablist-wallet"
      aria-orientation="horizontal"
    >
      <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        v-for="(tab, index) in tabs"
        :key="index"
        :id="tab.value"
        type="button"
        @click="selectTab(tab.value)"
        role="tab"
        :aria-labelledby="tab.value"
        :aria-controls="tab.value"
        :class="activeTab === tab.value ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'"
      >
        <span>{{ tab.name }}</span>
        <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold" v-if="tab.count || tab.showCounter" >
          {{ tab.count ?? 0 }}
        </span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  
  const props = defineProps<{
    tabs: Array<{ name: string, value: string, count?: number, showCounter?:boolean }>;
    modelValue?: string;
  }>();
  
  const emits = defineEmits(['update:modelValue']);
  const activeTab = useVModel(props, 'modelValue', emits);
  
  const selectTab = (value: string) => {
    activeTab.value = value;
  };
  </script>
  