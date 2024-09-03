<template>
    <span v-if="status == 'مفتوحة'"
        class="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-3 pb-1 pt-1 text-xs font-medium text-yellow-800 rtl:space-x-reverse">
        <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" height="14" width="14">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z">
            </path>
        </svg><span>مفتوحة</span>
    </span>
    <span
        v-if="status == 'معلقة'"
        class="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-3 pb-1 pt-1 text-xs font-medium text-yellow-800 rtl:space-x-reverse">
        <svg
            class="flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            height="14"
            width="14">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
        ><span>معلقة</span></span
    >
    <span v-if="status == 'مغلقة'" class="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 pb-1 pt-1 text-xs font-medium text-gray-600 rtl:space-x-reverse">
        <svg
            class="flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            height="14"
            width="14">
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
        ><span>مغلقة</span>
    </span>
</template>
<script setup lang="ts">
import type { Ticket } from '~/types';
defineProps<{ status?: Ticket['status'] }>();
</script>