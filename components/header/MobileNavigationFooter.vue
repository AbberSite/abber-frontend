<template>
    <div class="space-y-3 py-6">
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
            @click="$emit('navigate', { name: 'index' })"
            >من نحن</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
            @click="$emit('navigate', { name: 'index' })"
            >الأسئلة الشائعة</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
            @click="$emit('navigate', { name: 'index' })"
            >الشروط و الأحكام</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
            @click="$emit('navigate', { name: 'index' })"
            >إتفاقية المستخدم</NuxtLink
        >
    </div>
    <div class="pt-6">
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
            @click="$emit('navigate', { name: 'accounts-sms' })"
            >
            تسجيل الدخول
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>