<!-- DashboardWithdrawalRequestsFilter.vue -->
<template>
    <div>
      <DashboardDateFilters />
    </div>
      <div class="pt-3">
        <h3 class="text-sm font-semibold">نوع العملية</h3>
        <select class="form-control form-select h-[50px] appearance-none" name="select"
                    v-model="filters.type">
                    <option :value="''">الكل</option>
                    <option :value="'debit'">مدين</option>
                    <option :value="'credit'">دائن</option>
                </select>
      </div>
</template>

<script setup lang="ts">
import { useDashOperationsStore } from '~/stores/dashboard/dashOperations';
const { filters } = storeToRefs(useDashOperationsStore());
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
