<template>
    <DashTitle department="الحسابات" title="مدراء العلاقات" />
    <DashTablesTable :head-items="{manager: 'ادارة', expressors: 'المعبرون'}" :body-items="list" :actions="{remove: true, modify: true}"/>
</template>


<script setup>
const list = ref([
    { manager: 'هيثم', expressors: ['طه', 'الشيخ'] },
    { manager: 'هيثم', expressors: ['طه', 'الشيخ'] },
    { manager: 'هيثم', expressors: ['طه', 'الشيخ'] },
])
</script>