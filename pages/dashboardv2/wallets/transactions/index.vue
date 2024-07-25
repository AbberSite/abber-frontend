<template>
      <DashboardTitle department="المالية" title="جميع المعاملات المالية"/>
      <div class="w-full pt-6">
        <div class="flex items-center justify-between">
          <DashboardInputsSearch placeholder="ابحث عن تحويل معين" v-model="filters.search" @openFiltersMobileModal="openFiltersMobileModal=true"/>
          <div class="relative">
            <button
              class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50 sm:flex"
              type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
              <span class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75">
                  </path>
                </svg>
                <span class="mt-1.5">تصفية</span>
              </span>
              <span class="ms-1.5 rounded-full bg-gray-900 px-[6.5px] pt-1 text-white">{{ filtersCount }}</span>
            </button>

            <ClientOnly>
              <transition enter-active-class="transition-all" leave-active-class="transition-all"
                enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
                <DashboardFiltersDropdown v-if="openFiltersDropdown"
                  v-on-click-outside="() => (openFiltersDropdown = false)" >
                  <DashboardTransactionsFilter/>
                </DashboardFiltersDropdown>
              </transition>
            </ClientOnly>
          </div>
        </div>
      </div>
      <DashboardTablesTable :headItems="headItems" :bodyItems="list ?? []" :loading="loading"/>
      <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />




  <ClientOnly>
    <DashboardFiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false">
      <DashboardTransactionsFilter/>
    </DashboardFiltersMobileModal>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useDashboardTransactionsStore } from '~/stores/dashboard/dashboardTransactions';
import { vOnClickOutside } from '@vueuse/components';
const headItems = {
  id : "رقم العملية",
  process_id:"رقم الطلب/الفاتورة",
  amount :"المبلغ",
  success:"عملية ناجحة",
  type :"نوع العملية",
  method : "طريقة الدفع",
  date: "التاريخ",
  user: "المستخدم",

}
provide('dateFilters', 'transactions');
const { list, pagination, loading, filters, filtersCount } = storeToRefs(useDashboardTransactionsStore());
const { fetchAll } = useDashboardTransactionsStore();
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
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