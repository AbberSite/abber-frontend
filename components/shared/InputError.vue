<template>
    <div class="text-xs text-red-600">
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