<template>
    <button
    class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black"
    :disabled="disabled"
    href="/accounts/whatsapp/opt"> <span class="mt-1.5">

        <Loading  v-if="loading" v-bind="{disabled : disabled}"/>
        <span class="mt-1.5" v-else><slot /></span>
     </span></button>
</template>

<script setup lang="ts">



defineProps<{ loading? : boolean, disabled? : boolean}>()

</script>

<style scoped>

</style>