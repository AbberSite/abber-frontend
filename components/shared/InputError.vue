<template>

    <div class="text-[13px] leading-loose text-red-600">
        {{ message }}
    </div>
    
</template>

<script setup lang="ts">

defineProps<{
    message? : string
}>()

</script>

<style scoped>

</style>