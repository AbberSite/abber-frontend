<template>
    <!-- here is a problem - check it please - Sheikh El-Moctar -->
      <div class="flex flex-col sm:flex-row gap-4 items-center mb-4">
      <select v-model="selectedPreset" class="form-control w-48 h-[50px]">
        <option value="today">اليوم</option>
        <option value="week">اخر اسبوع</option>
        <option value="month">اخر ٣٠ يوم</option>
        <option value="custom">مخصص</option>
      </select>
      <DashboardDatePickerInput
        v-if="selectedPreset === 'custom'"
        label="التاريخ"
        v-model:model-date="range_date"
        range
      />
    </div>
    <div class="w-full h-full flex justify-center items-center">
        <DashboardTablesTable :head-items="{seller__username: 'معبر', num_orders: 'الطلبات', delivered_orders:'الطلبات المسلمة', completed_orders: 'الطلبات المكتملة', progressing_orders: 'الطلبات المنفذة'}" :body-items="services_data" :loading="loading"/>
      </div>
</template>

<script setup lang="ts">
import { useDashboardStatisticsStore } from "~/stores/dashboard/dashboardStatistics";
const { services_data, loading, filters } = storeToRefs(useDashboardStatisticsStore());
const { getServices } = useDashboardStatisticsStore();
onMounted(() => {
    getServices();
});

const range_date = ref([filters.value.date_after, filters.value.date_before]);
const selectedPreset = ref('today');

function setPresetRange(preset: string) {
  const today = new Date();
  let start: string, end: string;
  end = today.toISOString().slice(0, 10);
  if (preset === 'today') {
    start = end;
  } else if (preset === 'week') {
    const weekAgo = new Date(today);
    weekAgo.setDate(today.getDate() - 6);
    start = weekAgo.toISOString().slice(0, 10);
  } else if (preset === 'month') {
    const monthAgo = new Date(today);
    monthAgo.setDate(today.getDate() - 29);
    start = monthAgo.toISOString().slice(0, 10);
  } else {
    // custom, do not change range_date
    return;
  }
  range_date.value = [start, end];
}

watch(selectedPreset, (val) => {
  setPresetRange(val);
  if (val !== 'custom') {
    filters.value.date_after = range_date.value[0];
    filters.value.date_before = range_date.value[1];
  }
});
watch(range_date, ([start, end]) => {
  filters.value.date_after = start;
  filters.value.date_before = end;
});
</script>