<template>
  <Head>
    <title>عبر - الطلبات</title>
  </Head>
  <main class="min-h-screen outline-none">
    <!-- Hero section -->
    <HeroBackground />
    <!-- Orders section -->
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-16 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="orders-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/swatch -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
        </svg>
      </div>
      <h1 class="pt-6 text-lg font-medium xs:text-xl 2xl:text-2xl">الطلبات</h1>


      <template v-if="orders?.length == 0 && !loading">
        <div class="pt-4 text-sm text-gray-600 xs:text-base">لا توجد طلبات لعرضها</div>
        <div class="w-full pt-8 sm:w-auto" v-if="data.user_type == 'عميل'">
          <NuxtLink v-if="data.user_type != 'معبر'" class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800" :to="{ name: 'orders-make' }">
            <span>فسر حلمك الان</span>
          </NuxtLink>
        </div>
      </template>

      <template v-if="orders?.length != 0 || filters.search.length != 0 || filters.status.length != 0 || filters.type.text || filters.type.voice">
        <div class="w-full pt-8">
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
              <button class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-gray-50 sm:flex" type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"></path>
                  </svg>
                  <span>تصفية</span>
                </span>
                <span class="ms-1.5 rounded-full bg-gray-900 px-1.5 py-0.5 text-white">{{ filtersCount }}</span>
              </button>
              <ClientOnly>
                <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
                  <FiltersDropdown v-if="openFiltersDropdown" v-on-click-outside="() => (openFiltersDropdown = false)" />
                </transition>
              </ClientOnly>
            </div>
          </div>
        </div>
        <OrdersTable :orders="orders ?? []" />
        <Pagination class="pt-10" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="9" />
      </template>
      <SkeletonsTable v-if="loading" class="mt-8" />
    </section>
  </main>

  <ClientOnly>
    <FiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false" />
  </ClientOnly>

  <template v-if="data.user_type == 'معبر'">
    <div class="fixed bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
      <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button" @click="openCreateSessionModal = true" aria-label="إضافة">
        <!-- Heroicon name: outline/video-camera -->

        <VideoCameraIcon class="mx-auto w-6 h-6" />
      </button>
    </div>
    <ClientOnly>
      <MeetingCreateSessionModal :show="openCreateSessionModal" @close="openCreateSessionModal = false" @session-created="handleSessionCreated" />

      <MeetingExpressorSession :show="openSessionModal" @close="openSessionModal = false" />
    </ClientOnly>
  </template>
</template>

<script setup lang="ts">
import type { PaginationResponse } from "~/types";
import { vOnClickOutside } from "@vueuse/components";
import { VideoCameraIcon } from "@heroicons/vue/24/outline";

const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const openCreateSessionModal = ref(false);
const openSessionModal = ref(false);

const { fetchAll } = useOrdersStore();

const { orders, pagination, loading, filtersCount, filters } = storeToRefs(useOrdersStore());
const { data } = useAuth();

function handleSessionCreated() {
  openCreateSessionModal.value = false;
  openSessionModal.value = true;
}


onMounted(async () => {
  const persistedFilters = localStorage.getItem("abber:filters");
  if (persistedFilters) {
    filters.value = Object.assign(JSON.parse(persistedFilters), { ignore: true });
  }
  if (orders?.value?.length != 0) return;
  loading.value = true;

  await fetchAll();

  loading.value = false;
});

onUnmounted(() => {
  orders.value = [];
});
</script>
