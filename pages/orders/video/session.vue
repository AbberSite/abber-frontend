<template>
  <Head>
    <title>عبر - مقابلة</title>
  </Head>
  <Header />
  <main class="min-h-screen outline-none">
    <HeroBackground />

    <section class="relative mx-auto flex w-full max-w-7xl flex-col items-center px-4 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="order-details-heading">
      <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm sm:hidden">
        <!-- Heroicon name: outline/swatch -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="24" width="24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
        </svg>
      </div>

      <DetailsHeader :show-navigation="activeTab == 'details'">
        <slot>
          <MeetingCurrentSessionOrdersDropdown v-if="orders.length > 0" :orders="orders" />
        </slot>
      </DetailsHeader>
      <DetailsTabs v-model="activeTab" />
      <DetailsMobileCard v-if="activeTab == 'details'" />
      <div v-if="meeting.meeting_number" class="w-full pt-16 lg:grid lg:grid-cols-3">
        <div v-if="!isMobile" class="sticky top-8 h-fit rounded-lg border border-gray-100 py-6 lg:col-span-1">
          <div class="px-6 font-medium xs:text-lg">تفاصيل الطلب</div>
          <MeetingClientCard />
        </div>

        <ClientOnly>
          <div :class="{ 'flex justify-center items-center relative': isMobile, 'flex flex-col items-center justify-center rounded-lg border border-gray-100 lg:col-span-2 relative': !isMobile }">
            <Meeting :role="1" />
          </div>
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useMediaQuery } from "@vueuse/core";
import { useWebSocket } from "@vueuse/core";

definePageMeta({
  middleware: "auth",
  layout: false,
});

const isMobile = useMediaQuery("(max-width: 1023px)");

const activeTab = ref<"details" | "chat">("chat");

const { data } = useAuth();

const { order, orders, filters } = storeToRefs(useOrdersStore());
const { getOrder, fetchAll } = useOrdersStore();

const { bus, openSession } = useMeetingStore();

const { meeting } = storeToRefs(useMeetingStore());

async function initChannel() {
  const { rawToken } = useAuthState();

  const { data: meetingData } = useWebSocket(useRuntimeConfig().public.WebsocketURL + `/ws/meeting/${data?.value?.username}/` + `?authorization=JWT ${rawToken.value}`, {
    autoReconnect: true,
  });

  watch(meetingData, async (value) => {
    const parsedMeetingData = JSON.parse(meetingData.value);
    if (parsedMeetingData.meeting_data.order_item_id && parsedMeetingData.meeting_data.order_item_id != order.value?.id) {
      getOrder(parsedMeetingData.meeting_data.order_item_id.toString());
    }
    fetchAll({ type: "video_communication" });
  });
}


onMounted(async () => {

  await initChannel();

  await openSession();

  filters.value.status = ["new", "in_progress"];
  filters.value.type.voice = true;
  if (meeting.value.order_item_id) {
    getOrder(meeting.value.order_item_id.toString());
  }

  fetchAll({ type: "video_communication" });
});

onUnmounted(() => {
  order.value = undefined;
  filters.value.status = [];
  filters.value.type.voice = false;
});
</script>

<style scoped></style>
