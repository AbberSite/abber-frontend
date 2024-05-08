<template>
    <div class="w-full flex flex-col items-center space-y-6 pb-6 lg:hidden" >
        <div class="flex justify-center">
            <Loading v-if="loading" />
        </div>
        <div ref="chatList" class="max-h-[40rem] overflow-y-scroll w-full" id="chat_scroll" >
            <div class="flex flex-col-reverse gap-6" v-for="{ messages, index } in segmentedMessages" id="chat">
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
            <changeList ref="contextMenu" @update:change="changeMessage = undefined" :message="changeMessage"
                :user="data" :class="{ hidden: !changeMessage }"> </changeList>
        </div>

        <ChatInput v-if="allowInput" />
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
            src: "/audio-recorder/WebAudioRecorder.min.js",
            type: "text/javascript",
        }
    ]
})

const props = defineProps({ allowInput: Boolean, roomName: String });

const { messages, messagesPagination, segmentedMessages, chatList } = storeToRefs(useChatStore());
const { fetchMessages } = useChatStore();

const id = useRoute().params.id;

const { data } = useAuth();

const { clear } = useChat(props.roomName?.startsWith('order_') ? 'order' : 'support');

const loading = ref(false);

const contextMenu = ref<null | HTMLElement>(null);

const changeMessage = ref<Message | undefined>(undefined);

onMounted(async function ()  {
    if (messages.value.length == 0) {
        await fetchMessages({ room: props.roomName, limit: 9 });
    }

    if (!chatList.value) return;
    chatList.value.scrollTop = chatList.value.scrollHeight;
    window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    useInfiniteScroll(chatList.value, async () => await load(), {
        interval: 500,
        distance: 5,
        direction: "top",
        canLoadMore: () => !!messagesPagination.value?.next,
    });

    // document.body.appendChild(contextMenu.value.$el); // Move changeList to body
    document.addEventListener("click", resetChangeMessage);
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

    const newMessages = (await useApi(`/api/chat/messages/`, {
        params: { ...params, room: props.roomName }
    })) as PaginationResponse<Message>;

    loading.value = false;

    // messages.value.push(...newMessages.results);
    messagesPagination.value = newMessages;

    if (!chatList.value) return;
    chatList.value.scrollTop = 300;
}

function showContextMenu(e: any, message: Message) {
    changeMessage.value = message;
    contextMenu.value.$el.style = `top: ${e.layerY}px;left: ${e.layerX}px;`;
}

const resetChangeMessage = () => (changeMessage.value = undefined);

onUnmounted(() => {
    clear();
    resetChangeMessage();
    messages.value = [];
    messagesPagination.value = undefined;
});
</script>

<style scoped></style>
