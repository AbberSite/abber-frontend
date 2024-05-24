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
import { useWebSocket } from '@vueuse/core';
import type { NotificationHeader } from '~/types';
const { data, rawToken } = await useAuthState();




const { readNotifications } =storeToRefs(useUtilsStore());

onMounted(async() => {
    const {status, data:response} = useWebSocket(useRuntimeConfig().public.WebsocketURL + `/ws/notifications/${data.value.username}/`);
    console.log(response.value)
    watch(status, (value)=> {
        console.log(`notification status: ${value}`);
    })
    data.value?.notifications?.results.forEach((notification: NotificationHeader) => {
        if (notification.read == false) {
            readNotifications.value = true;
        }
    });
    // if(readNotifications.value){
    //     var audio = new Audio('/sounds/notification.wav');
    //     await audio.play();
    // }
});
watch(readNotifications, async(value)=> {
    if(value){
        var audio = new Audio('/sounds/notification.wav');
        await audio.play().then(()=> console.log('sound is running...'));
    }
});
</script>

<style scoped></style>
