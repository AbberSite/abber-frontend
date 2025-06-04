<template>
    <DashboardTitle department="الدعم التقني" title="محادثات الواتساب" />
    <DashboardTablesTable :head-items="{ conversation: 'المحادثة' }" :body-items="data" :actions="{ view: {path: '/whatsapp-chat/conversation/'} }" />
</template>

<script setup lang="ts" >
const data = ref([
    {id: 22, conversation: 'حلم كذا'},
    {id: 22, conversation: 'لقد حلمت بسقوط نجم'},
    {id: 22, conversation: 'لقد حلمت شيء '},
]);

</script>







