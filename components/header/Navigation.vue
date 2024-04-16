<template>
    <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
        <NuxtLink class="font-semibold" :to="{ name: 'index' }"> الرئيسية </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </NuxtLink>
        <NuxtLink class="font-semibold" :to="{ name: 'support' }"> مركز الدعم </NuxtLink>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>