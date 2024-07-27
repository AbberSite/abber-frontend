<template>
  <Head>
    <title>عبر - الإشعارات</title>
  </Head>
  <main class="min-h-screen outline-none">
    <HeroBackground />
    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="notifications-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
        <!-- Heroicon name: outline/bell-alert -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"></path>
        </svg>
      </div>
      <h1 class="pt-8 text-lg font-medium xs:text-xl 2xl:text-2xl">الإشعارات</h1>
      <div class="pt-4 text-sm text-gray-600 xs:text-base">تصفح جميع الإشعارات الواردة إليك</div>

      <template v-if="loading">
        <SkeletonsTable class="mt-16" />
      </template>
      <template v-else>
        <Table :notifications="all_notifications ?? []" class="w-full mt-16" />
        <Pagination class="pt-10" :results="(pagination as PaginationResponse<any>)" per-page="9" @change="fetchAll" />
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
import Table from "~/components/notifications/NotificationsTable.vue";
import type { PaginationResponse } from "~/types";
let loading = ref(true);
const { all_notifications, pagination } = storeToRefs(useNotificationsStore());
const { fetchAll } = useNotificationsStore();
onMounted(async () => {
  try {
    await fetchAll();
    loading.value = false;
  } catch (error) {}
});
</script>
