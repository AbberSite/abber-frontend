<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
            <thead class="border-b border-t">
                <tr>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>الطلب</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>المعبر</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>الحالة</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>العميل</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>النوع</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button">
                            <span>وسيلة الدفع</span>
                        </button>
                    </th>
                    <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                        <button
                            class="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 pb-2 pt-3"
                            type="button">
                            <span>التأريخ</span>
                            <svg
                                class="flex-shrink-0"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                height="14"
                                width="14">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
                            </svg>
                        </button>
                    </th>
                    <th class="px-4 pb-1 pt-1" scope="col"></th>
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

defineProps<{
    orders: Order[];
}>();
</script>

<style scoped></style>
