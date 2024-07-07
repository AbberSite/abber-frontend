<template>
    <main class="min-h-screen outline-none">
      <DashboardHeaderHeroBackground />
      <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44">
        <div class="relative -mt-2 pb-12">
          <p class="text-sm font-medium text-gray-800">الدعم التقني</p>
          <p class="text-lg font-semibold">تذاكر المساعدة</p>
        </div>
  
  
        <div class="md:flex justify-between">
          <div
          class="sticky top-8 h-fit rounded-lg border border-gray-100 pb-2 pt-6"
        >
          <div class="px-6 font-semibold xs:text-lg">التذاكر</div>
          <!-- Skeleton -->
          <SkeletonsHelpChat v-if="loading" />
          <template v-else>
            <div class="w-full divide-y divide-gray-100 pt-6">
              <button
                v-for="(ticket, index) of tickets"
                :key="index"
                class="flex w-full items-center justify-between bg-gray-50 px-6 py-4"
                type="button"
              >
                <span class="flex items-center"
                  ><span class="flex-shrink-0">
                    <img
                      class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      :data-src="`${ticket.user?.image}`"
                      height=""
                      width=""
                      alt="صورة المستخدم" /></span
                  ><span class="ms-3 flex flex-col pt-1 text-right"
                    ><span
                      class="text-sm font-semibold"
                      v-text="ticket.user?.first_name"
                    /><span class="pt-1 text-xs font-medium text-gray-600" v-text="ticket?.title"
                      />
                    </span
                  ></span
                ><span
                  class="rounded-full bg-gray-900 px-4 pb-1 pt-1.5 text-xs font-semibold text-white"
                  >2</span
                >
              </button>
              
            </div>
          </template>
        </div>
        <!-- Chat content on desktop devices -->
        <ClientOnly v-if="!loading">
          <Chat :room-name="`${tickets[0].id}`" :allow-input="tickets[0].status" isSupport/>
      </ClientOnly>
        </div>
      </section>
    </main>
  </template>
  
  <script setup lang="ts">
  let tickets = ref<[]>([]);
  let loading = ref<boolean>(true);
  onMounted(async () => {
    const data = await useDirectApi("/support/tickets/");
    tickets.value = data.results;
    loading.value = false;
  });
  </script>