<template>
    <tr class="cursor-pointer" @click="navigateTo(`/support/${ticket.id}/`)" >
        <td class="whitespace-nowrap py-5 pe-12">
            <NuxtLink :to="{ name: 'support-id', params: { id: ticket.id } }" class="text-blue-600">#{{ ticket.id }}</NuxtLink>
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            <div>{{ticket.title}}</div>
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            <div>{{ useFormattedDate(ticket.date) }}</div>
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            <TicketStatus :status="ticket.status"/>
        </td>
        <td class="whitespace-nowrap py-5 pe-12">
            <div>{{ useFormattedDate(ticket.end_date) }}</div>
        </td>
        <td class="flex items-center justify-center px-4 pb-4 pt-5">
            <NuxtLink :to="{ name: 'support-id', params: { id: ticket.id } }" title="عرض الطلب">
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
</template>

<script setup lang="ts">
import type { Ticket } from '~/types';
import TicketStatus from '~/components/tickets/TicketStatus.vue';
defineProps<{ticket: Ticket}>();
</script>