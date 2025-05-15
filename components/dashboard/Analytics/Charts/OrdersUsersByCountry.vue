<template>
    <div class="w-full m-auto">
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup lang="ts">
  import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale} from 'chart.js'
import { Bar } from 'vue-chartjs'
import { useDashboardStatisticsStore } from "~/stores/dashboard/dashboardStatistics";
const { statistics_data } = storeToRefs(useDashboardStatisticsStore());
// bar chart 
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Compute chart data from backend countries data
const chartData = computed(() => {
  const countries = statistics_data.value.countries || [];
  return {
    labels: countries.map(c => c.geolocation__country_name || 'غير محدد'),
    datasets: [
      {
        label: 'المستخدمين',
        backgroundColor: '#42A5F5',
        data: countries.map(c => c.users_count)
      },
      {
        label: 'الطلبات',
        backgroundColor: '#66BB6A',
        data: countries.map(c => c.orders)
      }
    ]
  }
});

const chartOptions = {
  responsive: true,
  indexAxis: 'y', // Make the bar chart horizontal
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'المستخدمين والطلبات حسب الدولة'
    }
  }
}
</script>