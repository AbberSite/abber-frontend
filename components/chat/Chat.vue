<template>
  <div class="flex flex-col space-y-6 w-full"
    :class="(device == 'mobile') ? 'items-center pb-6 lg:hidden' : 'justify-between rounded-lg border px-6 py-6 lg:col-span-2'">
    <SkeletonsChatDesktop v-if="loading" />
    <div v-else ref="chatList" class="h-[50vh] overflow-y-scroll " :class="(device == 'mobile') ? 'w-full' : 'mt-0'"
      id="chat_scroll">
      <div v-if="!messages.length" class="h-full flex items-center justify-center"><span
          class="px-4 py-2 rounded-sm bg-green-100">لا توجد رسائل سابقة</span></div>
      <div class="flex flex-col-reverse gap-6" v-else v-for="{ messages, index } in segmentedMessages" id="chat">
        <ChatMessage @contextmenu.prevent="showContextMenu($event, message)" v-for="(message, i) in messages"
          :user="data" :message="message" :last-message="messages[i + 1]" :next-message="messages[i - 1]"
          :id="'message-' + message.id"> </ChatMessage>
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
      <changeList ref="contextMenu" @update:change="changeMessage = undefined" :message="changeMessage" :user="data"
        :class="{ hidden: !changeMessage }"> </changeList>
    </div>

    <ChatInput v-if="allowInput" class="flex-1"
      @send-message="chatList.scrollTo({ behavior: 'smooth', top: chatList?.scrollHeight })" :filesInput="filesInput"/>
    
  </div>
</template>

<script setup lang="ts">
import type { Message, PaginationResponse } from "~/types";
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";
import { useInfiniteScroll } from "@vueuse/core";
import changeList from "~/components/chat/changeList.vue";

useHead({
    script: [
        {
            src: "https://cdn.jsdelivr.net/npm/web-audio-recorder-js@0.0.2/lib-minified/WebAudioRecorder.min.js",
            type: "text/javascript",
        }
    ]
})

const props = defineProps<{ allowInput: Boolean, roomName: String, device: String, filesInput?: boolean}>();
const { $viewport } = useNuxtApp();

const { messages, messagesPagination, segmentedMessages, chatList } = storeToRefs(useChatStore());
const { fetchMessages,chatSocket } = useChatStore();

const { data } = useAuth();
console.log(props.roomName);
const { clear, close, status } = chatSocket();

const loading = ref(true);

const contextMenu = ref<null | HTMLElement>(null);

const changeMessage = ref<Message | undefined>(undefined);

onMounted(async () => {
  watch($viewport.breakpoint, async (newScreen, oldScreen) => {
    if (loading.value)
      loading.value = false;
  })
  if (messages.value.length == 0) {
    await fetchMessages({ room: props.roomName, limit: 9 });
    loading.value = false;
    scrollDown(chatList);
  }
  if (!chatList.value) return;

  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  scrollDown(chatList);
  document.addEventListener("click", resetChangeMessage);
});

async function load() {
  if (!messagesPagination.value?.next) return;

  const params = useUrlParams(messagesPagination.value.next);

  loading.value = true;

  const newMessages = (await useApi(`/api/chat/messages/`, {
    params: { ...params, room: props.roomName }
  })) as PaginationResponse<Message>;

  loading.value = false;

  messages.value.push(...newMessages.results);
  messagesPagination.value = newMessages;

  if (!chatList.value) return;
  // chatList.value.scrollTop = 300;
}

function showContextMenu(e: any, message: Message) {
  changeMessage.value = message;
  contextMenu.value.$el.style = `top: ${e.layerY}px;left: ${e.layerX}px;`;
}

const resetChangeMessage = () => (changeMessage.value = undefined);

onUnmounted(() => {
  close();
  clear();
  resetChangeMessage();
  messages.value = [];
  messagesPagination.value = undefined;
});
function scrollDown(chat_scroll: HTMLElement) {
  if (chat_scroll.value != null) {
    chat_scroll.value?.scrollTo({ behavior: 'smooth', top: chat_scroll.value?.scrollHeight });
  } else {
    const my_interval = setInterval(function () {
      chat_scroll.value?.scrollTo({ behavior: 'smooth', top: chat_scroll.value?.scrollHeight });
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      if (chat_scroll.value != null) {
        // console.log(`scroll height: ${chat_scroll.value.scrollHeight}\nsrcroll top: ${chat_scroll.value.scrollTop}`);
        setTimeout(function () {
          useInfiniteScroll(chatList, load, { distance: 10, interval: 500, direction: 'top', canLoadMore: () => messagesPagination.value?.next })
        }, 3000);
        clearInterval(my_interval);
      }
    }, 1000)
  }
};
</script>

<style scoped></style>
