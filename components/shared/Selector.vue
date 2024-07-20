<template>
    <div class="w-full flex flex-col space-y-3">
      <h3 class="text-sm font-semibold xs:text-base">{{ label }}:</h3>
      <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="selectedValue">
        <option :value="''">إختر</option>
        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.text ?? option.value}}
        </option>
      </select>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  
  const props = defineProps<{
    label: string;
    modelValue?: any;
    options: Array<{ value: any, text?: string }>;
  }>();
  
  const emits = defineEmits(['update:modelValue']);
  const selectedValue = useVModel(props, 'modelValue', emits);
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  