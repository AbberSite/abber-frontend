<template>
    <!-- here is a problem - check it please - Sheikh El-Moctar -->
    <DatePresetFilter v-model:modelValue="range_date" />
    <div class="w-full h-full flex flex-col justify-center items-center">
        <DashboardTablesTable
            :head-items="headItems"
            :body-items="mergedItems"
            :loading="loading"
        />
    </div>
</template>

<script setup lang="ts">
import { useDashboardStatisticsStore } from "~/stores/dashboard/dashboardStatistics";
import DatePresetFilter from "../inputs/DatePresetFilter.vue";
const { statistics_data, loading, filters } = storeToRefs(useDashboardStatisticsStore());
// const { getServices } = useDashboardStatisticsStore();
// onMounted(() => {
//     getServices();
// });

const range_date = ref([filters.value.date_after, filters.value.date_before]);

watch(range_date, ([start, end]) => {
  filters.value.date_after = start;
  filters.value.date_before = end;
});

const headItems = {
  seller__username: 'معبر',
  num_orders: 'الطلبات',
  delivered_orders: 'الطلبات المسلمة',
  completed_orders: 'الطلبات المكتملة',
  progressing_orders: 'الطلبات المنفذة'
};

function sum(key: string) {
  return (statistics_data.value.services.data || []).reduce((acc, row) => acc + (Number(row[key]) || 0), 0);
}

// Merge body items with totals as the last row
const mergedItems = computed(() => {
  const items = statistics_data.value.services.data || [];
  const totals: Record<string, any> = {};
  Object.keys(headItems).forEach(key => {
    if (key === 'seller__username') {
      totals[key] = 'المجموع';
    } else {
      totals[key] = sum(key);
    }
  });
  return [...items, totals];
});
</script>