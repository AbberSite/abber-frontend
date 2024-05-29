<template>
    <div  class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right" >
            <thead class="border-b border-t" >
                <tr>
                    <TicketsTableHeaderCol content="التذكرة" ticket="id"/>
                    <TicketsTableHeaderCol content="المشكلة" />
                    <TicketsTableHeaderCol content="تاريخ فتح التذكرة" />
                    <TicketsTableHeaderCol content="الحالة" />
                    <TicketsTableHeaderCol content="اخر تحديث" ticket="date" order="date" />
                    <TicketsTableHeaderCol />
                </tr>
            </thead>
            <tbody class="divide-y">
                <TicketRow v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" />
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { Ticket } from '~/types';
import TicketRow from '~/components/tickets/TicketRow.vue'
defineProps<{
    tickets: Ticket[]
}>();
</script>