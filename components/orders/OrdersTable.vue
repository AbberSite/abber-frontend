<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
            <thead class="border-b border-t">
                <tr>
                    <OrdersTableHeaderCol content="الطلب"  order="id"/>
                    <OrdersTableHeaderCol content="المعبر" order="expressor"/>
                    <OrdersTableHeaderCol content="الحالة"  order="status"/>
                    <OrdersTableHeaderCol content="العميل"  order="user"/>
                    <OrdersTableHeaderCol content="النوع" order="type" />
                    <OrdersTableHeaderCol content="عنوان الحلم" order="title"/>
                    <OrdersTableHeaderCol content="التأريخ" order="order_item_time_data__start_date" />
                    <th class="px-4 pb-1 pt-1" scope="col"></th>

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


const { filters } = storeToRefs(useOrdersStore());
const { fetchAll } = useOrdersStore()

onMounted(() => {
    const persistedFilters = localStorage.getItem("abber:filters")

    if(!persistedFilters) return

    filters.value = JSON.parse(persistedFilters)
})

defineProps<{
    orders: Order[];
}>();
</script>

<style scoped></style>
