<template>
    <main class="min-h-screen outline-none">
      
      <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-44 lg:px-8 xl:pb-44">
        <h1 class="font-semibold py-3 text-left">المعـــــاملات المـــالية</h1>
        
        
          <SkeletonsOrdersTable v-if="loading" />
          <DashboardTransactionsTable v-else :list="list ?? []" />
          <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />
  
      </section>
    </main>
  
  </template>
  <script setup lang="ts">
  import { useDashOrdersStore } from '~/stores/dashboard/dashOrders.ts';
  const { orders, pagination, loading } = storeToRefs(useDashOrdersStore());
  const { fetchAll } = useDashOrdersStore();
  const list = [
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'فيزا', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'فيزا', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'فيزا', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
    {id: 20, balance_type: 'رسوم الخدمة', number_invoice: 1200, amount: 40, isChecked: 'نعم', type: "رسوم خدمة", typePayment: 'المحفظة', first_name: 'الشيخ', date: '2024-06-23T11:42:31.868582+03:00'},
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
  