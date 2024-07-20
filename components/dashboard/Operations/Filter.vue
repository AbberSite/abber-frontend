<!-- DashboardWithdrawalRequestsFilter.vue -->
<template>
  <div>
    <DashboardDateFilters />
  </div>
  <div class="pt-3">
    <Selector label="نوع العملية" :options="[{ value: 'debit', text: 'مدين' }, { value: 'credit', text: 'دائن' }]"
      v-model:model-value="filters.type" />

  </div>
</template>

<script setup lang="ts">
import { useDashOperationsStore } from '~/stores/dashboard/dashOperations';
const { filters } = storeToRefs(useDashOperationsStore());
</script>