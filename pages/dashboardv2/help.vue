<template>
  <main class="min-h-screen outline-none">
    <DashboardHeaderHeroBackground />
    <section class="mx-auto max-w-7xl px-4 xs:px-6 lg:px-8 xl:pb-16">
      <div class="relative -mt-2 pb-12">
        <p class="text-sm font-medium text-gray-800">الدعم التقني</p>
        <p class="text-lg font-semibold">تذاكر المساعدة</p>
      </div>

      <div class="w-full gap-x-8 lg:grid lg:grid-cols-3">
        <div class="sticky top-8 h-fit rounded-lg border border-gray-100 pb-2 pt-6">
          <div class="px-6 font-semibold xs:text-lg">التذاكر</div>
          <!-- Skeleton -->
          <SkeletonsHelpChat v-if="loading" />
          <template v-else>
            <div class="w-full divide-y divide-gray-100 pt-6 overflow-auto max-h-[500px]">
              <button v-for="(ticket, index) of tickets" :key="index" class="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50" :class="{ 'bg-gray-100': ticketId == ticket.id }" type="button" @click="setCurrentTicket(ticket)">
                <span class="flex items-center">
                  <span class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="`${ticket.user?.image}`" height="" width="" alt="صورة المستخدم" />
                  </span>
                  <span class="ms-3 flex flex-col pt-1 text-right">
                    <span class="text-sm font-semibold" v-text="ticket.user?.first_name" />
                    <span class="pt-1 text-xs font-medium text-gray-600" v-text="ticket.title" />
                  </span>
                </span>
                <span v-if="index == 5 && ticketId != ticket.id" class="rounded-full bg-gray-900 px-4 pb-1 pt-1.5 text-xs font-semibold text-white">2</span>
              </button>
            </div>
            <Pagination class="pt-5" :results="(pagination as PaginationResponse<any>)" @change="getAllTickets" per-page="20" isDashSupport />
          </template>
        </div>
        <!-- Chat content on Mobile devices -->
        <Modal :show="showChatInbox && $viewport.isLessThan('tablet')" @close="showChatInbox = false" title="المحادثة">
          <div class="px-4 py-5">
            <Chat v-if="showChatInbox && $viewport.isLessThan('tablet')" :room-name="`${ticketId}`" :allow-input="(ticketStatus == 'مفتوحة')" device="mobile" isSupport isDashSupport :key="chatKey" />
          </div>
        </Modal>
        <!-- Chat content on desktop devices -->
        <ClientOnly v-if="!loading && $viewport.isGreaterOrEquals('tablet')">
          <Chat :room-name="`${ticketId}`" :allow-input="(ticketStatus == 'مفتوحة')" isSupport isDashSupport :key="chatKey" />
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useDashHelpStore } from "~/stores/dashboard/dashHelp";
const { tickets, loading, pagination } = storeToRefs(useDashHelpStore());
const { getAllTickets } = useDashHelpStore();
// let loading = ref<boolean>(true);
const { $viewport } = useNuxtApp();
const { roomId, type } = storeToRefs(useChatStore());
const ticketId = ref(0);
const ticketStatus = ref("");

let showChatInbox = ref(false);
let chatKey = ref(0);
const setCurrentTicket = (ticket: any) => {
  chatKey.value += 1; // Increment the key to force re-render
  showChatInbox.value = true;
  loading.value = false;
  roomId.value = ticket.id;
  ticketId.value = ticket.id;
  ticketStatus.value = ticket.status;
};
onBeforeMount(async () => {
  await getAllTickets();
});
onMounted(async () => {
  setCurrentTicket(tickets.value[0]);
  type.value = "support";
});
</script>
