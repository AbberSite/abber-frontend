<template>
    <div class="flex items-center">
      <input
        class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
        type="checkbox"
        :id="id"
        :value="value"
        :checked="modelValue"
        @change="handleChange"
      />
      <label class="mt-1.5 ps-3 text-sm font-medium" :for="id">{{ label }}</label>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps<{
    id: string;
    label: string;
    value: string | number | boolean;
    modelValue: boolean;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.checked);
  };
  </script>
  
  <style scoped>
  /* Add any custom styles if needed */
  </style>
  