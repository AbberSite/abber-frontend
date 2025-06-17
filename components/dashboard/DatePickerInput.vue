<template>
  <div class="w-full flex flex-col space-y-3 my-2">
    <h3 class="text-sm font-medium" v-if="!no_label">{{ label ?? 'التاريخ' }}:</h3>
    <div class="flex flex-col items-center pt-2 gap-2 w-full">
      <DatePicker
        auto-apply 
        :placeholder="placeholder ?? 'ادخل التاريخ'"
        :max-date="!noMax ? new Date() : null"
        :min-date="minDate"
        model-type="yyyy-MM-dd"
        v-model="dateModel"
        :range="range"
        ref="datePicker"
        id="date"
        format="yyyy-MM-dd"
        :enable-time-picker="false"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import { useVModel } from '@vueuse/core';

const props = defineProps<{
  label?: string;
  placeholder?: string;
  modelDate: any, 
  range?: boolean,
  no_label?: boolean;
  noMax?: boolean; // Existing prop
  minDate?: Date | null; // New prop added
}>();
const emits = defineEmits('update:modelDate');
const dateModel = useVModel(props, 'modelDate', emits);
const datePicker = ref<DatePickerInstance>(null);
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
