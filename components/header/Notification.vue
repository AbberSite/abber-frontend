<template>
    <li
    :class="[notification.read ? 'hover:bg-gray-50' : 'bg-gray-50']">
    <NuxtLink :to="notification.url.replace('orders/orders','orders').replace('orders/order','orders').replace('/wallets/withdrawal-requests/', '/wallet?activeRoute=withdrawalRequests')" class="flex flex-col px-6 py-8 md:py-6">
        <div class="flex items-start justify-between">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <img
                        class="lazyload h-11 w-11 rounded-full bg-gray-100 md:h-10 md:w-10"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        :data-src="notification.sender.image"
                        height=""
                        width=""
                        alt="صورة المستخدم" />
                </div>
                <div class="ms-3 flex flex-col pt-1">
                    <div class="text-sm font-semibold">
                        {{ notification.sender.first_name }}
                    </div>
                </div>
            </div>
            <time class="text-xs text-gray-600" :datetime="notification.date">
                {{ getTimeDifference(notification.date) }}
            </time>
        </div>
        <p class="pt-6 text-justify text-sm text-gray-800 md:pt-4">
            {{ notification.message }}
        </p>
    </NuxtLink>
</li>
</template>

<script setup lang="ts">
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

defineProps<{
    notification : Notification
}>()

function getTimeDifference(_start: string) {
        const end = new Date();
        const start = new Date(_start);

        const timeDifference = end.getTime() - start.getTime();

        const daysDifference = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        const minutesDifference = Math.floor(timeDifference / (60 * 1000));

        const rtf = new Intl.RelativeTimeFormat('ar', { numeric: 'auto', style: 'narrow' });
        if(minutesDifference <= 59){
            return rtf.format(-minutesDifference, 'minute')
        } else if(minutesDifference > 59 && minutesDifference < 1440){
            return rtf.format(-Math.floor(minutesDifference / 60), 'hour')
        } else if(daysDifference >= 1 && daysDifference < 7){
            return rtf.format(-daysDifference, 'day')
        }
        else if (daysDifference >= 7 && daysDifference < 30) {
            const weeks = Math.floor(daysDifference / 7);
            return rtf.format(-weeks, 'week');
        } else {
            return rtf.format(-(Math.floor(daysDifference / 30)), 'month')
        }
    }

</script>

<style scoped>

</style>