<template>
  <Head>
    <Title>عبر - مركز الدعم</Title>
  </Head>

  <main class="min-h-screen outline-none">
    <!-- hero section -->
    <HeroBackground />

    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="support-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/lifebuoy -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
        </svg>
      </div>
      <h1 class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl" id="support-heading">مركز الدعم</h1>
      <div class="pt-4 text-sm text-gray-600 xs:text-base">تواصل معنا في حالة احتجت الى المساعدة</div>
      <tempate v-if="tickets?.length == 0 && !loading">
        <div class="pt-4 text-sm text-gray-600 xs:text-base">لا توجد لديك بطاقات دعم</div>
      </tempate>
      <!-- <SkeletonsTable v-if="loading" class="mt-16" /> -->
      <SkeletonsTable v-if="loading" class="mt-16" />

      <!-- support center -->
      <template v-if="tickets?.length != 0 || !filters.search.length || !filters.status.length">
        <div v-if="!loading" class="w-full pt-16">
          <div class="flex items-center justify-between">
            <form class="w-full sm:max-w-sm" method="GET">
              <div class="w-full space-y-3">
                <div class="relative">
                  <span class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:left-0 rtl:right-0 rtl:scale-x-flip">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                    </svg>
                  </span>
                  <input v-model="filters.search" class="form-control h-[50px] px-12" name="q" id="search" placeholder="أبحث عن تذكرة معينة" required />
                  <button class="absolute h-[50px] items-center justify-center px-4 py-4 ltr:right-0 rtl:left-0 sm:hidden" type="button" @click="openFiltersMobileModal = true">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div class="relative">
              <button class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-gray-50 sm:flex" type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"></path>
                  </svg>
                  <span>تصفية</span>
                </span>
                <!-- <span class="ms-1.5 rounded-full bg-gray-900 px-[6.5px] pt-1 text-white">1</span> -->
                <span class="ms-1.5 rounded-full bg-gray-900 px-[6.5px] pt-1 text-white">{{ filtersCount }}</span>
              </button>
              <ClientOnly>
                <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
                  <FiltersDropdownTickets v-if="openFiltersDropdown" v-on-click-outside="() => (openFiltersDropdown = false)" />
                </transition>
              </ClientOnly>
            </div>
          </div>
          <!-- table support center  -->
          <TicketsTable :tickets="tickets ?? []" />
          <Pagination class="pt-10" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="9" />
          <!-- open new ticket button -->
          <div class="fixed bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
            <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button" @click="showAddModal = true" aria-label="إضافة">
              <!-- Heroicon name: outline/plus -->
              <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
              </svg>
            </button>
          </div>

          <AddTicket :show="showAddModal" @close="showAddModal = false" @refresh-tickets="fetchAll()" />
        </div>
      </template>
    </section>
  </main>

  <ClientOnly>
    <FiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false" @refreshTickets="fetchAll()" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import FiltersDropdownTickets from "~/components/tickets/FiltersDropdownTickets.vue";
import FiltersMobileModal from "~/components/tickets/FiltersMobileModal.vue";
import { vOnClickOutside } from "@vueuse/components";
import AddTicket from "~/components/tickets/AddTicket.vue";
import type { PaginationResponse } from "~/types";
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const openCreateSessionModal = ref(false);
const openSessionModal = ref(false);
const { fetchAll } = useTicketsStore();
const showAddModal = ref(false);
const { tickets, loading, pagination, filters, filtersCount } = storeToRefs(useTicketsStore());
function handleSessionCreated() {
  openCreateSessionModal.value = false;
  openSessionModal.value = true;
}

onMounted(async () => {
  const persistedFilters = localStorage.getItem("abber:filters-tickets");
  if (persistedFilters) {
    filters.value = Object.assign(JSON.parse(persistedFilters), { ignore: true });
  }
  if (tickets?.value?.length != 0) return;
  loading.value = true;
  await fetchAll();
  loading.value = false;
});
</script>
