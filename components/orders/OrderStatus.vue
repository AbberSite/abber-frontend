<template>
    <span
        v-if="status == 'complete'"
        class="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 pb-1 pt-1 text-xs font-medium text-gray-600 rtl:space-x-reverse">
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
        ><span class="pt-1">مكتمل</span></span
    >

    <span
        v-if="status == 'new'"
        class="inline-flex items-center space-x-1 rounded-full bg-teal-100 px-3 pb-1 pt-1 text-xs font-medium text-teal-800 rtl:space-x-reverse">
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
        ><span class="pt-1">جديد</span></span
    >

    <span
        v-if="status == 'awaiting_delivery'"
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
        ><span class="pt-1">بإنتظار الإستلام</span></span
    >


    <span
    v-if="status == 'waiting_for_cancellation'"
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
    ><span class="pt-1">بإنتظار الالغاء</span></span
>

<span
v-if="status == 'in_progress'"
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
><span class="pt-1">قيذ التنفيذ</span></span
>

    <span
        v-if="status == 'cancelled'"
        class="inline-flex items-center space-x-1 rounded-full bg-red-100 px-3 pb-1 pt-1 text-xs font-medium text-red-800 rtl:space-x-reverse">
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
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
        ><span class="pt-1">ملغى</span></span
    >
</template>

<script setup lang="ts">
import type { Order } from '~/types';

defineProps<{
    status?: Order['status'];
}>();
</script>

<style scoped></style>
