<template>
    <div
        class="fixed inset-0 divide-y-2 divide-gray-50 bg-white shadow-lg ring-1 ring-black ring-opacity-5 md:absolute md:inset-auto md:top-[84px] md:w-[340px] md:rounded-md ltr:md:right-20 rtl:md:left-20"
        >
        <div class="flex h-full flex-col">

            <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8 md:hidden">
                <h2 class="text-lg font-semibold xs:text-xl">الإشعارات</h2>
                <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="$emit('close')">
                    <span class="sr-only">إغلاق القائمة</span>
                    <!-- Heroicon name: outline/x-mark -->
                    <svg
                        height="26"
                        width="26"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>

            <!-- Show when founded notifications list -->
            <template v-if="data?.notifications?.results?.length != 0">
                <ul class="is-scroll divide-y divide-gray-100 overflow-y-auto pb-20 md:max-h-[400px] md:pb-0">

                    <template v-if="loading">
                        <SkeletonsNotification />
                        <SkeletonsNotification />
                        <SkeletonsNotification />
                        <SkeletonsNotification />
                    </template>
                    <template v-else>
                        <HeaderNotification v-for="notification in data?.notifications?.results" :notification="notification" />
                    </template>
                </ul>
                <div class="fixed bottom-0 z-40 w-full border-t border-gray-100 bg-white px-6 py-6 text-center md:relative" >
                    <NuxtLink class="px-6 py-3 font-semibold md:text-sm" :to="{name: 'notifications'}" @click="$emit('close')" >عرض جميع الإشعارات <span aria-hidden="true">←</span></NuxtLink>
                </div>
            </template>
            <!-- Show when empty notifications list  -->

            <div v-else class="flex h-[75%] flex-col items-center justify-center p-6 text-center">
                <span class="flex-shrink-0">
                    <svg
                        class="text-gray-400"
                        height="40"
                        width="40"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        aria-hidden="true">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"></path>
                    </svg>
                </span>
                <p class="pt-4 font-semibold text-gray-700 text-sm xs:text-[15px] md:text-sm">
                    لا توجد إشعارات لعرضها حتى الان.
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useWebSocket } from '@vueuse/core';

const { data } = useAuth() as { data: Ref<{ notifications: { results: Notification[] }, read : boolean }> };

type User = {
    username: string;
    first_name: string;
    last_name: string;
    image: string;
    is_online: boolean;
};

type Notification = {
    user: User;
    sender: User;
    message: string;
    read: boolean;
    date: string;
    url: string;
};

const { status } = useAuth()

const loading = computed(() => status.value == "loading")
const {readNotifications} = storeToRefs(useUtilsStore())

onMounted(async () => {

    const { rawToken, data } = useAuthState();

    await useFetch('/api/notifications/read', {
        headers: {
            Authorization: `JWT ${rawToken.value}`
        }
    });

    readNotifications.value = false

});
</script>

<style scoped></style>
