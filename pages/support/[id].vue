<template>
  <Head>
    <title>عبر - الدعم - التذكرة #{{ ticket?.id }}</title>
  </Head>
  <Header />
  <main class="min-h-screen outline-none">
    <HeroBackground />

    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="order-details-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm lg:hidden">
        <!-- Heroicon name: outline/swatch -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
        </svg>
      </div>
      <Tree class="block lg:hidden" />
      <!-- <DetailsHeader :show-navigation="activeTab == 'details'" /> -->
      <DetailsTabs v-model="activeTab" />
      <DetailsCard v-if="activeTab == 'details'" device="mobile" />
      <ClientOnly>
        <Chat v-if="activeTab == 'chat'" :room-name="roomName" :allow-input="ticket?.status == 'مفتوحة'" device="mobile" filesInput />
      </ClientOnly>
      <div class="hidden w-full gap-x-8 pt-16 lg:grid lg:grid-cols-3">
        <div class="sticky top-8 h-fit rounded-lg border border-gray-300 py-6">
          <div class="px-6 font-semibold xs:text-lg">تفاصيل التذكرة</div>
          <TicketCard v-if="loading" />
          <DetailsCard v-else />
        </div>
        <ClientOnly v-if="$viewport.isGreaterOrEquals('tablet')">
          <Chat :room-name="roomName" :allow-input="ticket?.status == 'مفتوحة'" filesInput />
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import DetailsTabs from "~/components/tickets/details/Tabs.vue";
import DetailsCard from "~/components/tickets/details/Card.vue";
import TicketCard from "~/components/shared/skeletons/TicketCard.vue";

definePageMeta({
  middleware: "auth",
  layout: false,
});

const id = useRoute().params.id;
const roomName = id.toString();
const activeTab = ref<"details" | "chat">("chat");
let loading = ref<boolean>(true);
const { ticket } = storeToRefs(useTicketsStore());
const { roomId, type } = storeToRefs(useChatStore());

const { getTicket } = useTicketsStore();

if (!process.client) {
  await getTicket(id as number);
}

onBeforeMount(async () => {
  roomId.value = id;
  type.value = "support";
});

onMounted(async () => {
  if (!ticket.value) {
    await getTicket(id as number);
    loading.value = false;
  } else {
    loading.value = false;
  }
});

onUnmounted(() => {
  ticket.value = undefined;
});
</script>

<style scoped></style>
