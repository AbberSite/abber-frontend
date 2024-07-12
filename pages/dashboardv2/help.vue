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
            <div class="w-full divide-y divide-gray-100 pt-6 overflow-auto max-h-[560px]">
              <button v-for="({ user, title, id, status }, index) of tickets" :key="index"
                class="flex w-full items-center justify-between px-6 py-4 hover:bg-gray-50"
                :class="{ 'bg-gray-100': chat_details.id == id }" type="button" @click="updateChatDetails(id, status)">
                <span class="flex items-center"><span class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                      src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                      :data-src="`${user?.image}`" height="" width="" alt="صورة المستخدم" /></span><span
                    class="ms-3 flex flex-col pt-1 text-right"><span class="text-sm font-semibold"
                      v-text="user?.first_name" /><span class="pt-1 text-xs font-medium text-gray-600" v-text="title" />
                  </span></span><span v-if="index == 5 && chat_details.id != id"
                  class="rounded-full bg-gray-900 px-4 pb-1 pt-1.5 text-xs font-semibold text-white">2</span>
              </button>

            </div>
          </template>
        </div>
        <!-- Chat content on Mobile devices -->
        <Modal :show="showChatInbox && $viewport.isLessThan('tablet')" @close="showChatInbox = false" title="المحادثة">
          <div class="px-4 flex-1">
            <DetailsMobileChat v-if="showChatInbox && $viewport.isLessThan('tablet')" :room-name="`${chat_details?.id}`"
            :allow-input="chat_details?.status == 'مفتوحة'" device='mobile' isSupport isDashSupport :key="chatKey" />
          </div>
        </Modal>
        <!-- Chat content on desktop devices -->
        <ClientOnly v-if="!loading && $viewport.isGreaterOrEquals('tablet')">
          <Chat :room-name="`${chat_details?.id}`" :allow-input="`${chat_details?.status}`" isSupport isDashSupport
            :key="chatKey" />
        </ClientOnly>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// import { useDashHelpStore } from '~/stores/dashboard/dashHelp';
// const {conversations, loading, pagination} = storeToRefs(useDashHelpStore());
let tickets = ref<[]>([]);
let loading = ref<boolean>(true);
const { $viewport } = useNuxtApp();
let showChatInbox = ref(false);
let chat_details = ref<{ id: string, status: string | undefined }>(undefined);
let chatKey = ref(0);
const updateChatDetails = (id, status) => {
  loading.value = true;
  chat_details.value = { id, status };
  chatKey.value += 1;  // Increment the key to force re-render
  showChatInbox.value = true;
  loading.value = false;

};
onMounted(async () => {
  const data = await useDirectApi("/support/tickets/");
  tickets.value = data.results;
  chat_details.value = { id: data.results[0]?.id, status: data.results[0]?.status };
  console.log(chat_details.value);
  loading.value = false;
});
</script>