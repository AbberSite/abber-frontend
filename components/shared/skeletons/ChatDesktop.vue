<template>
    <div class="animate-pulse w-full flex flex-col gap-2" >
        <Message class="justify-start flex-row-reverse"/>
        <Message class="justify-start flex-row-reverse"/>
        <Message/>
        <Message/>
        <Message class="justify-start flex-row-reverse"/>
        <Message/>
        <Message class="justify-start flex-row-reverse"/>
        <Message/>
    </div>
</template>

<script setup lang="ts">
import Message from './Message.vue';
</script>