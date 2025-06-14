<!-- DashboardWithdrawalRequestsFilter.vue -->
<template>
  <div>
    <DashboardDateFilters
      v-model:modelValue="dateRange"
    />
  </div>
  <div class="pt-3">
    <CustomSelect label="نوع العملية" :options="[{ value: 'debit', text: 'مدين' }, { value: 'credit', text: 'دائن' }]"
      v-model:model-value="filters.type" default-label="إختر" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDashboardOperationsStore } from '~/stores/dashboard/dashboardOperations';
const { filters } = storeToRefs(useDashboardOperationsStore());

const dateRange = computed({
  get: () => [
    filters.value.date__gte ?? null,
    filters.value.date__lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date__gte = null;
      filters.value.date__lte = null;
    } else {
      const [start, end] = value;
      filters.value.date__gte = start;
      filters.value.date__lte = end;
    }
  }
});
</script>