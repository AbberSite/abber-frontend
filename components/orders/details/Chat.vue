<template>
  <div class="flex flex-col sm:block gap-6 sm:space-y-6 pb-6 sm:pb-0 rounded-lg sm:border sm:border-gray-100 sm:px-6 sm:py-6 lg:col-span-2 w-full">
    <div class="flex justify-center">
      <Loading v-if="loading" />
    </div>

    <div ref="chatList" class="max-h-[40rem] overflow-y-scroll">
      <div class="flex flex-col-reverse gap-6" v-for="{ messages, index } in segmentedMessages" id="chat">
        <ChatMessage v-for="(message, i) in messages" :user="data" :message="message" :last-message="messages[i + 1]" :next-message="messages[i - 1]" :id="'message-' + message.id"> </ChatMessage>
        <div class="relative w-full">
          <div class="absolute inset-0 flex items-center" aria-hidden="true">
            <div class="w-full border-t"></div>
          </div>
          <div class="relative flex justify-center">
            <span class="bg-white px-4 pt-1 text-[13px]">
              {{ index }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <ChatInput />
  </div>
</template>

<script setup lang="ts">
import type { Message, PaginationResponse } from "~/types";
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";
import { useInfiniteScroll } from "@vueuse/core";
const { order, messages, messagesPagination, segmentedMessages, chatList } = storeToRefs(useOrdersStore());
const { fetchMessages } = useOrdersStore();

const id = useRoute().params.id;

const { data } = useAuth();

const { clear } = useChat();

const loading = ref(false);

onMounted(async () => {
  if (messages.value.length == 0) {
    await fetchMessages(id, { limit: 9 });
  }

  if (!chatList.value) return;
  chatList.value.scrollTop = chatList.value.scrollHeight;

  useInfiniteScroll(chatList.value, async () => await load(), {
    interval: 500,
    distance: 5,
    direction: "top",
    canLoadMore: () => !!messagesPagination.value?.next,
  });
});

function formatTime(_date: string) {
  const date = new Date(_date);

  return new Intl.DateTimeFormat("ar-AR", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    numberingSystem: "latn",
  }).format(date);
}

async function load() {
  if (!messagesPagination.value?.next) return;

  const params = useUrlParams(messagesPagination.value.next);

  loading.value = true;

  const newMessages = (await useApi(`/api/orders/order/${order.value?.id}/messages`, {
    params,
  })) as PaginationResponse<Message>;

  loading.value = false;

  // messages.value.push(...newMessages.results);
  messagesPagination.value = newMessages;

  if (!chatList.value) return;
  chatList.value.scrollTop = 300;
}

onUnmounted(() => {
  clear();
  messages.value = [];
  messagesPagination.value = undefined;
});
</script>

<style scoped></style>
