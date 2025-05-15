<template>
  <div class="w-full m-auto">
    <Doughnut :data="pieChartData" :options="pieChartOptions" class="my-8" />
  </div>
</template>
<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { useDashboardStatisticsStore } from "~/stores/dashboard/dashboardStatistics";
const { statistics_data } = storeToRefs(useDashboardStatisticsStore());
ChartJS.register(Title, Tooltip, Legend, ArcElement)
// Pie chart for payment methods
const pieChartData = computed(() => {
  const methods = statistics_data.value.payment_methods || [];
  // Normalize method names and group by method (case-insensitive)
  const methodMap = new Map<string, number>();
  methods.forEach(item => {
    let name = item.method;
    if (!name || name.trim() === '') name = 'غير محدد';
    name = name.toUpperCase();
    methodMap.set(name, (methodMap.get(name) || 0) + item.transaction_count);
  });
  const labels = Array.from(methodMap.keys());
  const data = Array.from(methodMap.values());
  // Generate colors
  const colors = [
    '#42A5F5', '#66BB6A', '#FFA726', '#AB47BC', '#FF7043',
    '#26A69A', '#D4E157', '#FFCA28', '#8D6E63', '#789262',
    '#BDBDBD', '#EC407A', '#7E57C2', '#29B6F6', '#FFEE58'
  ];
  return {
    labels,
    datasets: [
      {
        label: 'عدد الطلبات',
        backgroundColor: colors.slice(0, labels.length),
        data
      }
    ]
  }
});

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'توزيع الطلبات حسب وسيلة الدفع'
    }
  }
}
</script>