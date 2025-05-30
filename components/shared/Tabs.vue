<template>
    <div
      class="blog is-scroll pt-10 flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 text-sm rtl:space-x-reverse xs:text-base"
      role="tablist"
      aria-labelledby="tablist-wallet"
      aria-orientation="horizontal"
    >
      <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-medium focus:outline-none rtl:space-x-reverse"
        v-for="(tab, index) in tabs"
        :key="index"
        :id="tab.value"
        type="button"
        @click="selectTab(tab.value)"
        role="tab"
        :aria-labelledby="tab.value"
        :aria-controls="tab.value"
        :class="activeTab === tab.value ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'"
        v-show="!tab.dontShowIt"
      >
        <span>{{ tab.name }}</span>
        <span class="text-white bg-red-500 px-2 py-1 rounded-full text-xs font-medium" v-if="tab.isNew">جديد</span>
        <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-medium" v-if="tab.count || tab.showCounter" >
          {{ tab.count ?? 0 }}
        </span>
      </button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { onMounted, watch } from 'vue';
  
  const props = defineProps<{
    tabs: Array<{ name: string, value: string, count?: number, showCounter?:boolean, isNew?:boolean, dontShowIt?:boolean }>;
    modelValue?: string;
  }>();
  
  const emits = defineEmits(['update:modelValue']);
  const activeTab = useVModel(props, 'modelValue', emits);
  
  // Set active tab from hash on mount
  onMounted(() => {
    if (window.location.hash) {
      const hashTab = window.location.hash.replace('#', '');
      if (props.tabs.some(tab => tab.value === hashTab)) {
        activeTab.value = hashTab;
      }
    }
  });
  
  // Update hash when tab changes
  watch(activeTab, (val) => {
    if (val) {
      window.location.hash = `#${val}`;
    }
  });
  
  const selectTab = (value: string) => {
    activeTab.value = value;
  };
  </script>
