<template>
  <main class="min-h-screen outline-none">
    <DashboardHeaderHeroBackground />

    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44">
      <div class="relative -mt-2 pb-12">
        <p class="text-sm font-medium text-gray-800">المالية</p>
        <p class="text-lg font-semibold">طلبات السحب</p>
      </div>
      <div class="w-full pt-6">
        <div class="flex items-center justify-between ">
          <DashboardInputsSearch placeholder="ابحث عن طلب سحب" v-model="filters.search"
            @openFiltersMobileModal="openFiltersMobileModal = true" />
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
                <DashboardWithdrawalRequestsFiltersDropdown v-if="openFiltersDropdown"
                  v-on-click-outside="() => (openFiltersDropdown = false)" />
              </transition>
            </ClientOnly>
          </div>
        </div>
      </div>
      <DashboardTablesTable :headItems="headItems" :bodyItems="list" :loading="loading"></DashboardTablesTable>

      <!-- <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" /> -->
      <ClientOnly>
        <DashboardWithdrawalRequestsFiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false" />
      </ClientOnly>
    </section>
  </main>
</template>
<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import { useDashWithdrawalRequestsStore } from '~/stores/dashboard/dashWithdrawalRequests';
const { filters, list, loading, filtersCount } = storeToRefs(useDashWithdrawalRequestsStore());
const { fetchAll } = useDashWithdrawalRequestsStore();


const headItems = {
  id: "رقم الطلب",
  user: "العميل",
  withdrawal_amount: "المبلغ القابل للسحب",
  amount: "المبلغ",
  fee: "رسوم السحب",
  net_amount: "مبلغ التحويل",
  type: "نوع الرصيد",
  status: "حالة الطلب",
  date: "تاريخ الطلب",
};

const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
// const pagination = ref<PaginationResponse<any>>();

onMounted(async () => {
  await fetchAll();
});

</script>
