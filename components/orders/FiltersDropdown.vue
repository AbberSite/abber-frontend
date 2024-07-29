<template>
    <div
        class="absolute top-[calc(100%+15px)] flex w-[280px] justify-between rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        v-cloak
        >
        <div>
            <h3 class="text-sm font-medium">حالة الطلب</h3>
                <FiltersOrderStatus /> 
        </div>
        <div>
            <h3 class="text-sm font-medium">نوع الطلب</h3>
            <FiltersOrderType /> 
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
