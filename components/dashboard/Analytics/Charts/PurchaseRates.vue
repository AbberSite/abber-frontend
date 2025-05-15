<template>
    <div class="w-full m-auto">
        <Bar :data="purchaseRatesChartData" :options="purchaseRatesChartOptions" />
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

const purchaseRatesChartData = computed(() => {
  const rates = statistics_data.value.users?.purchase_rates || {};
  return {
    labels: [
      'لم يشتري',
      '1',
      '2',
      '3',
      '3+'
    ],
    datasets: [
      {
        label: 'عدد المستخدمين',
        backgroundColor: '#42A5F5',
        data: [
          rates.num_0_order || 0,
          rates.num_1_order || 0,
          rates.num_2_orders || 0,
          rates.num_3_orders || 0,
          rates.num_more_than_3_orders || 0
        ]
      }
    ]
  }
});

const purchaseRatesChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'معدل شراء الطلبات'
    }
  },
  indexAxis: 'x' // vertical bars
}

</script>