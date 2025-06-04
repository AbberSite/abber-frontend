<template>
  <div>
    <DashboardDateFilters />
  </div>
  <Selector
    label="نوع الإجراء"
    :options="[
      { value: '1', text: 'إضافة' },
      { value: '2', text: 'تعديل' },
      { value: '3', text: 'حذف' },
    ]"
    default-option="كل" v-model="action_flag"
  />
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from "~/stores/dashboard/dashboardUsers";
const { action_flag } = storeToRefs(useDashboardUsersStore());
const { getAllLogs } = useDashboardUsersStore();
watch(action_flag,() => getAllLogs());
</script>

<style scoped>
/* Add your styles here if necessary */
</style>
