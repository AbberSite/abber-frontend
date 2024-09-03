<template>
    <tr>
        <td class="whitespace-nowrap py-5 pe-12">{{ notification?.message }}</td>
        <td class="whitespace-nowrap py-5 pe-12" >{{ notification?.type ?? '--' }}</td>
        <td class="whitespace-nowrap py-5 pe-12">{{ notification.sender?.first_name }}</td>
        <td class="whitespace-nowrap py-5 pe-12" >{{ useFormattedDate(notification?.date) }}</td>
        <td class="flex items-center justify-center px-4 pb-4 pt-5">
            <NuxtLink :to="notificationURL" title="عرض الإشعار"><svg
                    class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z">
                    </path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                </svg></NuxtLink>
        </td>
    </tr>
</template>

<script lang="ts" setup>
import type { Notification } from '~/types'
const props = defineProps<{ notification: Notification }>();
const {notification} = toRefs(props);
let notificationURL = notification.value.url?.replace('orders/order', 'orders').replace('orders/orders', 'orders')

if (notification.value.extra_data?.order_type == 'video_communication') {
  notificationURL = notificationURL?.replace(/\/orders\/(\d+)\//, (match, p1) => `/orders/video/${p1}`); 
}
</script>