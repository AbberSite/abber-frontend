<template>
  <div class="flex flex-col space-y-6 w-full" :class="device == 'mobile' ? 'items-center pb-6 lg:hidden' : 'justify-between rounded-lg border px-6 py-6 lg:col-span-2'">
    <SkeletonsChatDesktop :class="{ hidden: !loading || messages.length }" />
    <div id="chatList" v-infinite-scroll="[load, infiniteScrollConfig]" ref="chatList" class="h-[50vh] overflow-y-scroll scrollbar-hide" :class="(device == 'mobile' ? 'w-full ' : 'mt-0 ') + loading ?? 'hidden'">
      <div v-if="scrollLoading" class="flex justify-center">
        <Loading />
      </div>
      <div class="h-full flex items-center justify-center" :class="{ hidden: loading || messages.length }"><span class="px-4 py-2 rounded-sm bg-green-100">لا توجد رسائل سابقة</span></div>
      <div class="flex flex-col-reverse gap-6" v-for="{ messages, index } in segmentedMessages" id="chat">
        <ChatMessage @contextmenu.prevent="showContextMenu($event, message)" v-for="(message, i) in messages" :user="data" :message="message" :last-message="messages[i + 1]" :next-message="messages[i - 1]" :id="'message-' + message.id"> </ChatMessage>
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
      <changeList ref="contextMenu" @update:change="changeMessage = undefined" :message="changeMessage" :user="data" :class="{ hidden: !changeMessage }"> </changeList>
    </div>

    <ChatInput v-if="allowInput" class="flex-1" :filesInput="filesInput" />
  </div>
</template>

<script setup lang="ts">
import type { Message, PaginationResponse } from "~/types";
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";
import { vInfiniteScroll } from "@vueuse/components";

import changeList from "~/components/chat/changeList.vue";

useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/npm/web-audio-recorder-js@0.0.2/lib-minified/WebAudioRecorder.min.js",
      type: "text/javascript",
    },
  ],
});

const props = defineProps<{ allowInput: Boolean; roomName: String; device: String; filesInput?: boolean }>();

const { messages, messagesPagination, segmentedMessages, chatList } = storeToRefs(useChatStore());
const { fetchMessages, chatSocket } = useChatStore();

const { data } = useAuth();
console.log(props.roomName);

const loading = ref(true);

const contextMenu = ref<null | HTMLElement>(null);

const changeMessage = ref<Message | undefined>(undefined);

const scrollTop = ref(0);

const scrollLoading = ref(false);

const infiniteScrollConfig = ref({
  direction: "top",
  canLoadMore: () => !!messagesPagination.value?.next,
});

onMounted(async () => {
  if (messages.value.length == 0) {
    await fetchMessages({ room: props.roomName, limit: 30 });
    loading.value = false;
  }
  if (!chatList.value) return;
  scrollTop.value = chatList.value?.scrollHeight;
  chatList.value.scrollTop = chatList?.value?.scrollHeight;
  document.addEventListener("click", resetChangeMessage);
});

async function load() {
  scrollLoading.value = true;
  if (!messagesPagination.value?.next) return;

  const params = useUrlParams(messagesPagination.value.next);

  loading.value = true;

  const newMessages = (await useApi(`/api/chat/messages/`, {
    params: { ...params, room: props.roomName },
  })) as PaginationResponse<Message>;

  loading.value = false;

  messages.value.push(...newMessages.results);
  messagesPagination.value = newMessages;
  scrollLoading.value = false;

  if (!chatList.value) return;
  chatList.value.scrollTop = chatList.value.scrollHeight - scrollTop.value; // scroll to old position
  scrollTop.value = chatList.value?.scrollHeight; // set current height after load meessages
}

function showContextMenu(e: any, message: Message) {
  changeMessage.value = message;
  contextMenu.value.$el.style = `top: ${e.layerY}px;left: ${e.layerX}px;`;
}

const resetChangeMessage = () => (changeMessage.value = undefined);

onUnmounted(() => {
  chatSocket().close();
  chatSocket().clear();
  resetChangeMessage();
  messages.value = [];
  messagesPagination.value = undefined;
});
</script>

<style scoped></style>
