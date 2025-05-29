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
import { useRouter } from 'vue-router';

const { statistics_data } = storeToRefs(useDashboardStatisticsStore());
const router = useRouter();
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

// Custom legend click handler
function handleLegendClick(e, legendItem, legend) {
  const label = legendItem.text;
  if (!label) return;
  // Forward to the orders page with payment_method param
  const url = router.resolve({
    path: '/dashboardv2/orders',
    query: {
      status: 'in_progress',
      payment_method: label
    }
  }).href;
  window.open(url, '_blank');
}

const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      onClick: handleLegendClick
    },
    title: {
      display: true,
      text: 'توزيع الطلبات حسب وسيلة الدفع'
    }
  }
}
</script>