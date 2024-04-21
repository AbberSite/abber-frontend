<template>
    <div class="px-6 pt-6">
        
        <div class="flex items-center justify-between py-4">
            <div class="font-semibold text-gray-500">حالة التذكرة</div>
            <TicketStatus :status="ticket?.status" />
        </div>
        <div class="flex items-center justify-between py-4">
            <div class="font-semibold text-gray-500">تاريخ فتح التذكرة</div>
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
