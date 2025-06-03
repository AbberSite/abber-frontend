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
import { useRouter } from 'vue-router'
import { computed } from 'vue'
const router = useRouter();
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
  indexAxis: 'x', // vertical bars
  onClick: (event, elements, chart) => {
    if (elements && elements.length > 0) {
      const idx = elements[0].index;
      // Map index to orders_count query value
      let orders_count = '';
      if (idx === 0) orders_count = '0';
      else if (idx === 1) orders_count = '1';
      else if (idx === 2) orders_count = '2';
      else if (idx === 3) orders_count = '3';
      else if (idx === 4) orders_count = '3+';
      if (orders_count) {
        const url = router.resolve({
          path: '/dashboardv2/accounts/users/',
          query: { orders_count }
        }).href;
        window.open(url, '_blank');
      }
    }
  }
}

</script>