<template>
    <div
        class="absolute top-[calc(100%+10px)] w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1">
        <a
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            href="#"
            role="menuitem"
            tabindex="-1"
            >الملف الشخصي</a
        >
        <a
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            href="#"
            role="menuitem"
            tabindex="-1"
            >الإعدادات</a
        >
        <a
            @click.prevent="$emit('logout') "
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            role="menuitem"
            tabindex="-1"
            >تسجيل الخروج</a
        >
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
