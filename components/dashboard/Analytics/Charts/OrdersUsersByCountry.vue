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
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const {fetchCountries} = useDashboardUsersStore();
const {countries} = storeToRefs(useDashboardUsersStore());
const { statistics_data } = storeToRefs(useDashboardStatisticsStore());
const router = useRouter();
onMounted(() => {
  if(!countries.value || countries.value.length === 0) 
    fetchCountries();
});

// bar chart 
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Compute chart data from backend countries data
const chartData = computed(() => {
  const countriesArr = statistics_data.value.countries || [];
  return {
    labels: countriesArr.map(c => c.geolocation__country_name || 'غير محدد'),
    datasets: [
      {
        label: 'المستخدمين',
        backgroundColor: '#42A5F5',
        data: countriesArr.map(c => c.users_count)
      },
      {
        label: 'الطلبات',
        backgroundColor: '#66BB6A',
        data: countriesArr.map(c => c.orders)
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
  },
  // Make labels clickable
  onClick: (event, elements, chart) => {
    const yAxis = chart.scales['y'];
    if (yAxis) {
      const ticks = yAxis.ticks;
      const labels = chart.data.labels || [];
      for (let i = 0; i < ticks.length; i++) {
        // Use Chart.js elements to detect which bar was clicked
        if (elements && elements.length > 0) {
          const element = elements[0];
          const index = element.index;
          const label = labels[index];
          const country = countries.value.find(c => c.name === label);
          if (country && country.code) {
            const url = router.resolve({
                    path: '/dashboardv2/accounts/users/',
                    query: { country: country.code }
                    }).href;
            window.open(url, '_blank');
          }
          return;
        }
      }
    }
  }
}
</script>