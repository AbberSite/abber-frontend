<template>
  <div class="h-fit space-y-6 overflow-hidden pt-6 md:pt-0 lg:space-y-6">
    <div class="space-y-8 rounded-lg border border-gray-200 py-6">
      <h3 class="px-6 font-medium text-gray-500 xl:text-lg">الطلبات</h3>
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div class="space-y-8 rounded-lg border border-gray-200 py-6">
      <h3 class="px-6 font-medium text-gray-500 xl:text-lg">الطلبات</h3>
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Line, Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register the required components for Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
const props = defineProps<{datasets: Array<{}>}>()
let chartData = reactive({
  labels: ["الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
  datasets: props.datasets,
})
const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};
</script>
