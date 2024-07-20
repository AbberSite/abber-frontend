<template>
    <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">الحسابات</p>
    <p class="text-lg font-semibold">المعبرون</p>
    <DashboardTab v-model:model-value="currentTab" :tabs="[{name: 'المعبرون', value: 'tab0'}, {name: 'الطلبات', value: 'tab1'}]"/>
    <div class="w-full pt-6" >
        <template v-if="currentTab == 'tab0'">
            <DashboardInputsSearch placeholder="ابحث عن معبر" />
            <DashboardTablesTable :head-items="{first_name: 'معبر', email: 'البريد الالكتروني', emailVerified: '', phone: 'الجوال', phoneVerified: ''}" :body-items="expressors" :actions="{details: true, view: {path: '/expresssors/'}}" />
        </template>
        <template v-else>
            <DashboardTablesTable :head-items="{first_name: 'العميل', email: 'البريد الالكتروني', phone: 'الجوال', content: 'حالة طلب المعبر'}" :body-items="expressors" :actions="{modify: true}" />
        </template>
    </div>
  </div>
</template>

<script setup lang="ts">
let currentTab = ref('tab0');
const expressors = [
    { first_name: 'هيثم صالح', email: 'lsdkjf@glk.co', emailVerified: false, phone: '00971554455', phoneVerified: true, id: 122 },
    { first_name: 'هيثم صالح', email: 'lsdkjf@glk.co', emailVerified: false, phone: '00971554455', phoneVerified: true, id: 123 },
    { first_name: 'هيثم صالح', email: 'lsdkjf@glk.co', emailVerified: false, phone: '00971554455', phoneVerified: true, id: 55 },
    { first_name: 'هيثم صالح', email: 'lsdkjf@glk.co', emailVerified: false, phone: '00971554455', phoneVerified: true, id: 45 },
    { first_name: 'هيثم صالح', email: 'lsdkjf@glk.co', emailVerified: false, phone: '00971554455', phoneVerified: true, id: 45 },
]
</script>