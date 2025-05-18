<template>
    <!-- here is a problem - check it please - Sheikh El-Moctar -->
    <DatePresetFilter v-model:modelValue="range_date" />
    <div class="w-full h-full flex justify-center items-center">
        <DashboardTablesTable :head-items="{seller__username: 'معبر', num_orders: 'الطلبات', delivered_orders:'الطلبات المسلمة', completed_orders: 'الطلبات المكتملة', progressing_orders: 'الطلبات المنفذة'}" :body-items="statistics_data.services.data" :loading="loading"/>
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
</script>