<template>
    <div
        class="grid w-full gap-x-8 gap-y-14 pb-36 pt-16 sm:grid-cols-2 lg:hidden lg:grid-cols-3 px-1"
        >
        <div class="w-full space-y-4">
            <div class="text-sm font-semibold text-gray-500 xs:text-base">حالة التذكرة</div>
            <TicketStatus :status="ticket?.status" />
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-semibold text-gray-500 xs:text-base">تاريخ فتح التذكرة</div>
            <div class="font-semibold">
                {{ useFormattedDate(ticket?.date) }}
            </div>
        </div>
        
    </div>
</template>

<script setup lang="ts">
import TicketStatus from '../TicketStatus.vue';

const { ticket } = storeToRefs(useTicketsStore());
</script>

<style scoped></style>
