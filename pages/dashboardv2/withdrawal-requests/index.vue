<template>
  <main class="min-h-screen outline-none">
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-44 lg:px-8 xl:pb-44">
      <h1 class="font-semibold py-3 text-left">طلبات السحب</h1>
      <!-- <div class="w-full pt-6">
        <div class="flex items-center justify-between">
          <form class="w-full sm:max-w-sm" method="GET">
            <div class="w-full space-y-3">
              <div class="relative">
                <span class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg
                ></span>

                <input v-model="filters.search" class="form-control h-[50px] px-12" type="search" name="q" id="search" placeholder="إبحث عن طلب معين" required />
                <button class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:right-0 rtl:left-0 sm:hidden" type="button" @click="openFiltersMobileModal = true">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"></path>
                  </svg>
                </button>
              </div>
            </div>
          </form>
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
                <FiltersDropdown v-if="openFiltersDropdown" v-on-click-outside="() => (openFiltersDropdown = false)" />
              </transition>
            </ClientOnly>
          </div>
        </div>
      </div> -->

      <SkeletonsOrdersTable v-if="loading" />
      <DashboardTablesTable :headItems="headItems" :bodyItems="data.results"></DashboardTablesTable>

      <!-- <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" /> -->
    </section>
  </main>
</template>
<script setup lang="ts">
const data = ref<PaginationResponse<any>>({ results: [] });
const loading = ref<boolean>(false);

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

// const pagination = ref<PaginationResponse<any>>();

onMounted(async () => {
  fetchAll();
});

async function fetchAll() {
  loading.value = true;
  const response = await useProxy("/wallets/dashboard-withdrawal-requests/");
  data.value = response;
  loading.value = false;
}
</script>
