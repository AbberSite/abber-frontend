<template>
    <div  class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right" >
            <thead class="border-b border-t" >
                <tr>
                    <TicketsTableHeaderCol content="التذكرة" ticket="id"/>
                    <TicketsTableHeaderCol content="المشكلة" />
                    <TicketsTableHeaderCol content="تاريخ فتح التذكرة" />
                    <TicketsTableHeaderCol content="الحالة" ticket="status"/>
                    <TicketsTableHeaderCol content="التــاريخ" ticket="id"/>
                    <TicketsTableHeaderCol />
                </tr>
            </thead>
            <tbody class="divide-y">
                <!-- start simple test -->
                <tr>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <NuxtLink  to="/" >{{ '#222' }}</NuxtLink>
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <div>اريد حل مشكلة معينة</div>
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <div>{{ useFormattedDate('2020-02-01') }}</div>
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <div>مفتوحة</div>
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <div>{{ useFormattedDate('2020-02-01') }}</div>
        </td>
        <td class="flex items-center justify-center px-4 pb-4 pt-5">
            <NuxtLink  to="/gg" title="عرض الطلب">
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
                <!-- start simple test -->

                <TicketRow v-for="ticket in tickets" :key="ticket.id" :ticket="ticket"/>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types';
defineProps<{
    tickets: Ticket[]
}>();
</script>