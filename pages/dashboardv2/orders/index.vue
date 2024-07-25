<template>
      <DashboardTitle department="الطلبات" title="جميع الطلبات" />
      <div class="w-full pt-6">
        <div class="flex items-center justify-between">
          <DashboardInputsSearch placeholder="ابحث عن طلب معين" v-model="filters.search" @openFiltersMobileModal="openFiltersMobileModal = true" />
          <div class="relative">
            <button class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50 sm:flex" type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
              <span class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"></path>
                </svg>
                <span class="mt-1.5">تصفية</span>
              </span>
              <span class="ms-1.5 rounded-full bg-gray-900 px-[6.5px] pt-1 text-white">{{ filtersCount }}</span>
            </button>
            <ClientOnly>
              <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
                <DashboardFiltersDropdown v-if="openFiltersDropdown" v-on-click-outside="() => (openFiltersDropdown = false)">
                <DashboardOrdersFilter/>
              </DashboardFiltersDropdown>
              </transition>
            </ClientOnly>
          </div>
        </div>
      </div>
      <DashboardTablesTable :headItems="headItems" :bodyItems="list ?? []" :loading="loading" :actions="{details:true,view:{path:'/orders/'}}"/>

      <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />


  <ClientOnly>
    <DashboardFiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false" >
      <DashboardOrdersFilter/>
    </DashboardFiltersMobileModal>
  </ClientOnly>
</template>
<script setup lang="ts">
import { useDashboardOrdersStore } from "~/stores/dashboard/dashboardOrders.ts";
import { vOnClickOutside } from "@vueuse/components";
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
provide('dateFilters', 'orders');
const { list, pagination, loading, filters, filtersCount } = storeToRefs(useDashboardOrdersStore());
const { fetchAll } = useDashboardOrdersStore();
// const pagination = ref<PaginationResponse<any>>();
const headItems = {
  id: "رقم الطلب",
  seller: "المعبر",
  buyer: "المشتري",
  ordering_type: "نوع الطلب",
  status: "الحالة",
  "order_item_financial_data.price": "السعر",
  "order_item_time_data.ordered_date": "تاريخ الطلب",
};
onMounted(async () => {
  fetchAll();
});

</script>
