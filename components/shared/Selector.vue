<template>
  <div class="w-full flex flex-col space-y-3">
    <h3 class="text-sm font-medium xs:text-base">{{ label }}:</h3>
    <div class="border py-2 px-3 rounded max-h-16 overflow-auto" v-if="checkboxes">
      <Checkbox 
        v-for="option in options" 
        :key="option.value" 
        :label="option.text ?? option.value"
        :value="option.value"
        v-model:model-value="selectedValues" 
      />
    </div>
    <select
      v-else
      class="form-control form-select appearance-none"
      :class="{'min-h-[50px]': !multiple}"
      name="select"
      v-model="selectedValue"
      :multiple="multiple"
    >
      <option v-if="!multiple" :value="''">{{ defaultOption ?? 'إختر' }}</option>
      <slot></slot>
      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.text ?? option.value }}
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
  defaultOption?: string;
  multiple?: boolean;
  checkboxes?: boolean;
}>();

const emits = defineEmits(['update:modelValue']);
const selectedValue = useVModel(props, 'modelValue', emits);
const selectedValues = ref(props.modelValue || []);

watch(selectedValues, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

