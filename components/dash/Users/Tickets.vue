<template>
    <div class="flex flex-col space-x-3">
        <DashTablesTable :head-items="head" :body-items="items" :actions="{}"/>
    </div>
</template>

<script setup lang="ts">
const head = {
    seller: 'المستخدم',
    status:'حالة التذكرة',
    title: 'المشكلة',
    date_created: 'تاريخ فتح التذكرة',
    date: 'تاريخ اغلاق التذكرة '
};
const items = [
    { seller: 'احمد عي', date: '2024-07-05 13:03' },
    { seller: ' الشيخ ', date: '2024-07-05 13:03' },
    { seller: 'احمد', date: '2024-07-05 13:03' }]
</script>