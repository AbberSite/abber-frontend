<template>
    <div class="w-full m-auto">
        <Bar :data="purchaseTimesChartData" :options="purchaseTimesChartOptions" />
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

// Bar chart for purchase times
const purchaseTimesChartData = computed(() => {
  const times = statistics_data.value.orders?.purchase_times || [];
  // Arabic hour labels
  const hourLabels = [
    '12:00 ص', '1:00 ص', '2:00 ص', '3:00 ص', '4:00 ص', '5:00 ص',
    '6:00 ص', '7:00 ص', '8:00 ص', '9:00 ص', '10:00 ص', '11:00 ص',
    '12:00 م', '1:00 م', '2:00 م', '3:00 م', '4:00 م', '5:00 م',
    '6:00 م', '7:00 م', '8:00 م', '9:00 م', '10:00 م', '11:00 م'
  ];
  return {
    labels: hourLabels,
    datasets: [
      {
        label: 'عدد الطلبات',
        backgroundColor: '#FF7043',
        data: times.map(t => t.order_count)
      }
    ]
  }
});

const purchaseTimesChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'عدد الطلبات حسب الساعة'
    }
  },
  indexAxis: 'x' // vertical bars
}

</script>