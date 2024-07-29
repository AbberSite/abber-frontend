<template>
    <button
        class="relative rounded-full p-1 text-gray-700 hover:text-gray-900 focus:outline-none"
        type="button"
        ref="notificationsButton">
        <span class="sr-only">عرض الاشعارات</span>
        <!-- Heroicon name: outline/bell -->

        <BellIcon class="w-[26px] h-[26px]" />
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
import type { NotificationHeader } from '~/types';
const { data } = await useAuthState();




const { readNotifications } =storeToRefs(useUtilsStore());

onMounted(async() => {

    data.value?.notifications?.results.forEach((notification: NotificationHeader) => {
        if (!notification.read) {
            readNotifications.value = true;
        }
    });
});
watch(readNotifications, async(value)=> {
    if(value){
        let audio = new Audio('/sounds/notification.wav');
        await audio.play();
    }
});
</script>

<style scoped></style>
