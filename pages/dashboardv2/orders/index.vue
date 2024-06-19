<template>
  <h1 class="font-semibold py-3">الطلبات</h1>
  <div>
    <DashboardTablesOrders :orders="orders ?? []" />
    <Pagination
      class="pt-4"
      :results="(pagination as PaginationResponse<any>)"
      @change="fetchAll"
      per-page="20"
    />
  </div>
</template>
<script setup lang="ts">
import {useDashOrdersStore} from '~/stores/dashboard/dashOrders.ts';
const {orders, pagination} = storeToRefs(useDashOrdersStore());
const { fetchAll } = useDashOrdersStore();
// const pagination = ref<PaginationResponse<any>>();
onMounted(async () => {
  fetchAll();
});

// async function fetchAll() {
//   const data = await useProxy("/orders/dashboard-orders/");
//   orders.value = data.results ?? [];
//   pagination.value = data;
// }
</script>
