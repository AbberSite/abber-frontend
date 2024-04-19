<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
            <thead class="border-b border-t">
                <tr>
                    <OrdersTableHeaderCol content="الطلب"  order="id"/>
                    <OrdersTableHeaderCol content="المعبر" v-if="data.user_type != 'معبر'"  />
                    <OrdersTableHeaderCol content="الحالة"  order="status"/>
                    <OrdersTableHeaderCol content="العميل" v-if="data.user_type != 'عميل'"  order="buyer__first_name"/>
                    <OrdersTableHeaderCol content="النوع" />
                    <OrdersTableHeaderCol content="عنوان الحلم" order="title"/>
                    <OrdersTableHeaderCol content="التأريخ" order="order_item_time_data__ordered_date" />
                    <!-- <th class="px-4 pb-1 pt-1" scope="col"></th> -->
                    <OrdersTableHeaderCol />
                </tr>
            </thead>
            <tbody class="divide-y">
                <OrderRow v-for="order in orders" :key="order.id" :order="order" />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types';

const { data } = useAuth()

defineProps<{
    orders: Order[];
}>();
</script>

<style scoped></style>
