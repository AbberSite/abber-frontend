<template>
  <div>
    <DashboardDateFilters />
  </div>
  <Selector
    label="نوع الإجراء"
    :options="[
      { value: 'add', text: 'إضافة' },
      { value: 'edit', text: 'تعديل' },
      { value: 'delete', text: 'حذف' },
    ]"
    default-option="كل"
  />
</template>

<script setup lang="ts">
import { useDashboardWithdrawalRequestsStore } from "~/stores/dashboard/dashboardWithdrawalRequests";
const { filters } = storeToRefs(useDashboardWithdrawalRequestsStore());
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
