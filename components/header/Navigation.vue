<template>
    <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
        <NuxtLink class="font-semibold" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </NuxtLink>
        <NuxtLink class="font-semibold" v-if="status == 'authenticated'" :to="{ name: 'orders' }"> الطلبات </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'tickets' }"> مركز الدعم </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const {status} = useAuth();
</script>

<style scoped>

</style>