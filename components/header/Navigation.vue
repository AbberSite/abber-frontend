<template>
    <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
        <NuxtLink class="font-semibold" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </NuxtLink>
        <NuxtLink class="font-semibold" v-if="status == 'authenticated' && data?.user_type != 'إدارة'" :to="{ name: 'orders' }" > الطلبات </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'support' }" v-if="data?.user_type != 'إدارة'" > مركز الدعم </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const {status, data} = useAuth();
</script>

<style scoped>

</style>