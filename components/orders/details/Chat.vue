<template>
    <div
        class="flex flex-col sm:block gap-6 sm:space-y-6 pb-6 sm:pb-0 rounded-lg sm:border sm:border-gray-100 sm:px-6 sm:py-6 lg:col-span-2 w-full">
        <div class="flex justify-center">
            <Loading v-if="loading" />
        </div>

        <div ref="chat" class="max-h-[40rem] overflow-y-scroll ">
            <div class="flex flex-col-reverse gap-6" v-for="{ messages, index } in segmentedMessages" id="chat">
                <!-- :class="[messages[i + 1]?.user?.username == message.user.username && 'pr-10 pt-0']" -->
                <div
                    class="flex w-full "

                    :dir="data.username == message.user.username ? 'rtl' : 'ltr'"
                    v-for="(message, i) in messages">
                    <NuxtImg
                        class="lazyload h-11 w-11 rounded-full bg-gray-100"
                        v-if="messages[i + 1]?.user?.username != message.user.username"
                        :src="message.user.image"
                        height="44"
                        width="44"
                        alt="" />
                    <div class="ms-3 w-full space-y-3"
                        :class="[messages[i + 1]?.user?.username != message.user.username ? 'space-y-3' : 'space-y-2']"
                    >
                        <div class="w-fit min-w-[4rem] max-w-full space-y-2">
                            <div
                                class="rounded-lg rounded-tr-none px-4 py-4 text-right text-sm leading-loose"
                                :class="[data.username == message.user.username ? 'bg-sky-100 ' : 'bg-gray-50 ',
                                messages[i + 1]?.user?.username == message.user.username &&  '-mt-4',


                                (data.username == message.user.username) && (messages[i + 1]?.user?.username == message.user.username) && 'mr-10', 
                                (data.username != message.user.username) && (messages[i + 1]?.user?.username == message.user.username) && 'ml-10', 
                                ]"
                                
                                >

                                <div v-for="file in message.files">
                                    <!-- <audio controls :src="file.file" />      -->
                                    <ChatAudio :file="file" /> 
                                </div>
                                <div v-html="message.message"></div>
                                <div class="flex justify-end" v-if="message.read">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        height="10"
                                        width="10">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                            </div>
                            <!-- <div class="">
                                <div>
                                    هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز
                                    على الشكل الخارجي للنص
                                </div>
                                <div class="flex justify-end">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        height="10"
                                        width="10">
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M4.5 12.75l6 6 9-13.5"></path>
                                    </svg>
                                </div>
                            </div> -->
                            <p
                            :dir="data.username == message.user.username ? 'rtl' : 'ltr'"
                                class="text-left text-[13px] text-gray-500"
                                v-if="messages[i - 1]?.user?.username != message.user.username">
                                {{ formatTime(message.date) }}
                            </p>
                        </div>
                    </div>
                </div>
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
import type { Message, PaginationResponse } from '~/types';
// import InfiniteLoading from "v3-infinite-loading";
// import "v3-infinite-loading/lib/style.css";
import { useInfiniteScroll } from '@vueuse/core';
const { order, messages, messagesPagination, segmentedMessages } = storeToRefs(useOrdersStore());
const { fetchMessages } = useOrdersStore();

const id = useRoute().params.id;

const { data } = useAuth();

const { clear } = useChat();

const loading = ref(false);

const chat = ref<null | HTMLElement>(null);

onMounted(async () => {
    if (messages.value.length == 0) {
        await fetchMessages(id, { limit: 9 });
    }

    if (!chat.value) return;
    chat.value.scrollTop = chat.value.scrollHeight;

    useInfiniteScroll(chat.value, async () => await load(), {
        interval: 500,
        distance: 5,
        direction: 'top',
        canLoadMore: () => !!messagesPagination.value?.next
    });
});

function formatTime(_date: string) {
    const date = new Date(_date);

    return new Intl.DateTimeFormat('ar-AR', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
        numberingSystem: 'latn'
    }).format(date);
}

async function load() {
    if (!messagesPagination.value?.next) return;

    const params = useUrlParams(messagesPagination.value.next);

    loading.value = true;

    const newMessages = (await useApi(`/api/orders/order/${order.value?.id}/messages`, {
        params
    })) as PaginationResponse<Message>;

    loading.value = false;

    messages.value.push(...newMessages.results);
    messagesPagination.value = newMessages;

    if (!chat.value) return;
    chat.value.scrollTop = 300;
}

onUnmounted(() => {

    clear()
    messages.value = []
    messagesPagination.value = undefined
})
</script>

<style scoped></style>
