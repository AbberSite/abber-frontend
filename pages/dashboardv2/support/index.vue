<template>
  <main class="min-h-screen outline-none">
    <DashboardHeaderHeroBackground />
    <section class="mx-auto max-w-7xl px-4 xs:px-6 lg:px-8 xl:pb-16">
      <DashboardTitle department="الدعم التقني" title="تذاكر المساعدة" />
      <!-- <div
        class="flex items-center justify-end mb-2 relative z-30"
        v-if="ticketStatus == 'مفتوحة' && $viewport.isGreaterOrEquals('tablet')"
      >
        <PrimaryButton
          @click="showCloseTicketDialog = true"
          class="cursor-pointer"
          >إغلاق التذكرة</PrimaryButton
        >
      </div> -->
      <div class="flex flex-col md:flex-row justify-between mb-6 gap-4 relative items-end md:items-end md:w-full">
        <!-- Filter by Status -->
        <Selector label="حالة التذكرة" :options="[{value: 'مفتوحة', text: 'مفتوحة'}, {value: 'مغلقة', text: 'مغلقة'}]" v-model:model-value="filters.status" default-option="الكل" />

        <!-- Filter by Username -->
        <Search placeholder="البحث بإسم العميل او رقمه"  v-model:model-value="filters.search" />
      </div>

      <div class="w-full gap-x-8 lg:grid lg:grid-cols-3">
        <div
          class="sticky top-8 h-fit rounded-lg border border-gray-100 pb-2 pt-6"
        >
          <div class="px-6 font-medium xs:text-lg pb-6">التذاكر</div>
          <!-- Skeleton -->
          <SkeletonsHelpChat v-if="loading" />
          <template v-else>
            <div
              class="w-full divide-y divide-gray-100 overflow-auto max-h-[500px] scrollbar-hide"
            >
              <button
                v-for="(ticket, index) of list"
                :key="index"
                class="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50"
                :class="{ 'bg-gray-100': ticketId == ticket.id }"
                type="button"
                @click="setCurrentTicket(ticket)"
              >
                <span class="flex items-center">
                  <span class="flex-shrink-0">
                    <img
                      class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      :data-src="`${ticket.user?.image}`"
                      height=""
                      width=""
                      alt="صورة المستخدم"
                    />
                  </span>
                  <span class="ms-3 flex flex-col pt-1 text-right">
                    <NuxtLink
                      class="text-sm font-medium"
                      v-text="ticket.user?.first_name"
                      :to="`/dashboardv2/accounts/users/user-update/${ticket.user?.id}/`"
                    ></NuxtLink>
                    <span
                      class="pt-1 text-xs font-medium text-gray-600"
                      v-text="ticket.title"
                    ></span>
                  </span>
                </span>
                <span
                  v-if="ticket.status === 'مفتوحة'" @click="showCloseTicketDialog = true"
                  class="rounded-full bg-gray-900 px-4 pb-1 pt-1.5 text-xs font-medium text-white"
                  title="إغلاق" 
                  >
                  <!-- <EnvelopeOpenIcon class="w-4"/> -->
                   إغلاق </span>
              </button>
            </div>
            <Pagination
              class="py-5"
              :results="(pagination as PaginationResponse<any>)"
              @change="fetchAll"
              per-page="20"
              smallResultsCounter
            />
          </template>
        </div>

        <!-- Chat content on Mobile devices -->
        <Modal
          :show="showChatInbox && $viewport.isLessThan('tablet')"
          @close="showChatInbox = false"
          title="المحادثة"
        >
        
          <div class="px-4 py-5">
            <Chat
              v-if="showChatInbox && $viewport.isLessThan('tablet')"
              :room-name="ticketId"
              :allow-input="ticketStatus == 'مفتوحة'"
              device="mobile"
              filesInput
              :key="chatKey"
            />
          </div>
        </Modal>
        <!-- Chat content on desktop devices -->
        <ClientOnly v-if="!loading && $viewport.isGreaterOrEquals('tablet')">
          <Chat
            :room-name="ticketId"
            :allow-input="ticketStatus == 'مفتوحة'"
            filesInput
            :key="chatKey"
          />
        </ClientOnly>

        <ClientOnly>
          <ConfirmDialog
            v-if="showCloseTicketDialog"
            title="إغلاق التذكرة"
            descritpion="هل انت متأكد من انك تريد اغلاق التذكرة؟"
            @continue="closeTicket"
            @close="showCloseTicketDialog = false"
          />
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import Search from "~/components/dashboard/inputs/Search.vue";
import { useDashboardHelpStore } from "~/stores/dashboard/dashboardHelp";
const { list, loading, pagination, filters } = storeToRefs(useDashboardHelpStore());
const { fetchAll } = useDashboardHelpStore();
const { $viewport } = useNuxtApp();
const { roomId, type } = storeToRefs(useChatStore());
const ticketId = ref(0);
const ticketStatus = ref("");
let showCloseTicketDialog = ref(false);
let showChatInbox = ref(false);
let chatKey = ref(0);
const setCurrentTicket = (ticket: any, ChatInbox: boolean = true) => {
  chatKey.value += 1; // Increment the key to force re-render
  showChatInbox.value = ChatInbox;
  loading.value = false;
  roomId.value = ticket.id;
  ticketId.value = ticket.id;
  ticketStatus.value = ticket.status;
};

onMounted(async () => {
  watch(
    () => list.value,
    (val) => {
      if (val && val.length) setCurrentTicket(val[0], $viewport.isGreaterOrEquals("tablet"));
    },
    { immediate: true }
  );
  type.value = "support";
  fetchAll();
});
async function closeTicket() {
  useApi(`/api/tickets/${ticketId.value}/close/`, {
    method: "DELETE",
  }).then(async(res) => {
    await fetchAll()
    showCloseTicketDialog.value = false;
    useNotification({ type: "success", content: "لقد تم إغلاق التذكرة" });
  });
}
</script>
