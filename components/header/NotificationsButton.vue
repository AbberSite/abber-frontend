<template>
    <button
        class="relative rounded-full p-1 text-gray-700 hover:text-gray-900 focus:outline-none"
        type="button"
        ref="notificationsButton">
        <span class="sr-only">عرض الاشعارات</span>
        <!-- Heroicon name: outline/bell -->

        <BellIcon class="w-7 h-7" />
        <!-- Show when user have unread notifications -->
        <span
            v-if="readNotifications"
            class="absolute top-[3px] h-[9px] w-[9px] rounded-full border border-white bg-red-600 ltr:left-2 rtl:right-2">
            <span
                class="absolute right-0 inline-flex h-full w-full flex-shrink-0 animate-ping rounded-full bg-red-600 opacity-80"></span>
        </span>
    </button>
</template>

<script setup lang="ts">
import { BellIcon } from '@heroicons/vue/24/outline';

const { status, data } = useAuthState();

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
    read?: boolean;
    date: string;
    url: string;
};
const { readNotifications} =storeToRefs(useUtilsStore());

onMounted(() => {
    data.value?.notifications?.results.forEach((notification: Notification) => {
        if (notification.read == false) {
            readNotifications.value = true;
        }
    });
});
</script>

<style scoped></style>
