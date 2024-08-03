<template>
  <div
    class="h-fit space-y-4 md:col-span-3 overflow-hidden pt-6 md:pt-0 lg:space-y-6"
  >
    <div class="space-y-8 rounded-lg border border-gray-200 py-6">
      <h3 class="px-6 font-medium text-gray-500 sm:px-4 lg:px-6 xl:text-lg">
        إحصائيات الطلبات
      </h3>
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div class="grid grid-cols-2 gap-x-4 lg:gap-x-6">
      <div class="space-y-8 rounded-lg border border-gray-100 py-6">
        <h3 class="px-6 font-medium text-gray-500 sm:px-4 lg:px-6 xl:text-lg">
          الطلبات
        </h3>
        <Pie :data="pieChart" />
      </div>
      <div class="space-y-8 rounded-lg border border-gray-100 py-6">
        <h3 class="px-6 font-medium text-gray-500 sm:px-4 lg:px-6 xl:text-lg">
          الطلبات
        </h3>
        <Doughnut :data="pieChart" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ datasets: Array<{}> }>();
import { Line, Pie, Doughnut } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const generateColors = (dataLength) => {
  return Array.from({ length: dataLength }, () => generateRandomColor());
};
const pieDataset = computed(() => 
  props.datasets.map((el) => ({
    ...el,
    backgroundColor: generateColors(3),
    borderColor: '',
    borderWidth: ''
  }))
);

console.log(pieDataset.value)
// Register the required components for Chart.js
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);
const currentData = computed(()=> props.datasets[0]);
let chartData = reactive({
  labels: [
    "الأثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
    "الأحد",
  ],
  datasets: props.datasets,
});
const pieChart = {
  labels: [
  "الأثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
    "السبت",
    "الأحد",
  ],
  // datasets: [currentData]
  datasets: [
  {
    label: "جميع الطلبات",
    data: [12, 8, 3, 5, 2, 3, 40],
    borderWidth: 1,
    backgroundColor: generateColors(7)
  }
  ],
};
const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};


</script>
