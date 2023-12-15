<template>
    <button
    class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
    href="/accounts/whatsapp/opt"> <span class="mt-1.5">
        <Loading  v-if="loading"/>
        <span v-else><slot /></span>
     </span></button>
</template>

<script setup lang="ts">



defineProps<{ loading? : boolean}>()

</script>

<style scoped>

</style>