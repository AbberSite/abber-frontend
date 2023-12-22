<template>
    <div class="hidden md:flex md:gap-x-12 2xl:text-lg">
        <RouterLink class="font-semibold" :to="{ name: 'index' }"> الرئيسية </RouterLink>
        <RouterLink class="font-semibold" :to="{ name: 'blog' }"> المدونة </RouterLink>
        <RouterLink class="font-semibold" :to="{ name: 'index' }"> مركز الدعم </RouterLink>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>