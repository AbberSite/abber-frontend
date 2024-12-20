<template>
    <tr class="cursor-pointer" @click.once="order.content?.urgent && (order.service_details == null) && (order.buyer.username != data.username) ? showDialog = true : navigateTo(`/orders/${order.type == 'text_communication' ? order.id : `video/${order.id}`}/`)">
        <td class="whitespace-nowrap py-5 pe-12">
            <NuxtLink @click.once="(order?.seller?.username   == data.username || order.buyer.username == data.username) ?? navigateTo({ name:  order.type == 'text_communication' ? 'orders-id' : 'orders-video-id' , params: { id: order.id } })" title="عرض الطلب" class="text-blue-600">#{{ order.id }}</NuxtLink>
        </td>
        <td class="whitespace-nowrap py-5 pe-12" v-if="data.user_type != 'معبر'">
            {{ order.seller?.first_name ?? 'لا يوجد' }}
        </td>
        <td class="whitespace-nowrap pe-12">
            <OrderStatus :status="order.status" />
        </td>
        <td class="whitespace-nowrap py-5 pe-12" v-if="data.user_type != 'عميل'">
            {{ order.buyer.first_name }}
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            {{ order.type == 'text_communication' ? 'محادثة نصية' : 'محادثة صوتية' }}
        </td>
        <td class="whitespace-nowrap pe-12">
            {{ order.dream_title ?? 'لا يوجد' }}
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            {{ useFormattedDate(order.order_item_time_data.ordered_date) }}
        </td>
        <td class="flex items-center justify-center px-4 pb-4 pt-5">
            <NuxtLink  @click.once="(order?.seller?.username   == data.username || order.buyer.username == data.username) ?? navigateTo({ name:  order.type == 'text_communication' ? 'orders-id' : 'orders-video-id' , params: { id: order.id } })" title="عرض الطلب">
                <svg
                    class="flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    height="20"
                    width="20">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path>
                </svg>
            </NuxtLink>
        </td>
    </tr>
    <ConfirmDialog v-if="showDialog" title="هل انت متأكد من انك تريد قبول هذا الطلب المستعجل؟" descritpion="اذا وافقت على تسلم الحلم، فإنه لن يستطيع اي معبر اخر تفسيره." @close="showDialog = false;" @continue="acceptOrder(order)"/>
</template>

<script setup lang="ts">
import type { Order } from '~/types';

const { data } = useAuth();

defineProps<{
    order: Order;
}>();

let showDialog = ref<boolean>(false);
async function acceptOrder(order){
    await useDirectApi(`/orders/my-orders/${order.id}/accept_order/`, {method: 'POST'});
    showDialog.value = false; 
    navigateTo(`/orders/${order.type == 'text_communication' ? order.id : `video/${order.id}`}/`)
}
</script>

<style scoped></style>
