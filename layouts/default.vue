<template>
    <Header /> 
    <slot/>
    
    <Footer v-if="route.fullPath != '/profile?edit=true'"/> 
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style scoped>

</style>