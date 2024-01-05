<template>
    <div>
        <FormStepsTextContact @next="(data : any)  => $emit('next', data)" v-if="type === 'text_chat'" /> 
        <FormStepsVoiceContact @next="(data : any)  => $emit('next', data)" v-else /> 
    </div>
</template>

<script setup lang="ts">

    defineProps(['type'])

</script>

<style scoped>

</style>