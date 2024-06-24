<template>
    <main class="min-h-screen outline-none">
      
      <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-44 lg:px-8 xl:pb-44">
        <h1 class="font-semibold py-3 text-left">طلبات السحب</h1>
        
          <SkeletonsOrdersTable v-if="loading" />
          <DashboardWithdrawalRequestsTable v-else :list="list ?? []" />
          <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />
  
      </section>
    </main>
  
  </template>
  <script setup lang="ts">
  import { useDashOrdersStore } from '~/stores/dashboard/dashOrders.ts';
  const { orders, pagination, loading } = storeToRefs(useDashOrdersStore());
  const { fetchAll } = useDashOrdersStore();
  const list = [
    {id: 20, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 21, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 22, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 23, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 24, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 25, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 26, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 27, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 28, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 29, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 30, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 31, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 32, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 33, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 34, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 35, seller: {first_name: 'الشيخ المختار'}, withdrawal_amount: 1200, amount: 40, tax: 10, transfer_amount: 30, type: 'المبلغ المسحوب', status: 'قيد المراجعة', date: '2024-06-23T11:42:31.868582+03:00'},
  ]
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
  