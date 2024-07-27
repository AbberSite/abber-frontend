<template>
    <div class="py-6">
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 py-3 font-medium hover:bg-gray-50"
            @click="$emit('navigate', { name: 'accounts-sms' })"
            >
            تسجيل الدخول
        </NuxtLink>
    </div>
    <div class="space-y-3 py-6">
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 py-3 font-medium hover:bg-gray-50"
            @click="$emit('navigate', { name: 'about' })"
            >من نحن</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 py-3 font-medium hover:bg-gray-50"
            @click="$emit('navigate', {name: 'index', hash: '#faqs'})"
            >الأسئلة الشائعة</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 py-3 font-medium hover:bg-gray-50"
            @click="$emit('navigate', { name: 'terms' })"
            >الشروط و الأحكام</NuxtLink
        >
        <NuxtLink
            class="-mx-3 block rounded-lg px-3 py-3 font-medium hover:bg-gray-50"
            @click="$emit('navigate', { name: 'user-agreement' })"
            >إتفاقية المستخدم</NuxtLink
        >
    </div>
    
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>