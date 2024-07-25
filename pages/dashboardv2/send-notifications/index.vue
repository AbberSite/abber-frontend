<template>
    <DashboardTitle department="الرئيسية" title="التنبيهات والاشعارات" />
    <DashboardTab :tabs="[ { value: 'tab0', name: 'تنبيهات من الادارة' }, { value: 'tab1', name: 'الاشعارات' }, { value: 'tab2', name: 'الرسائل' }, { value: 'tab3', name: 'اعدادات' } ]" v-model:model-value="currentTab" />
    <div class="pt-2">
        <template v-if="currentTab == 'tab0'">
            <DashboardNotificationsFromAdmin/>
        </template>
        <template v-else-if="currentTab == 'tab1'">
            <DashboardTablesTable :head-items="{notification:'اشعار', date: 'التاريخ'}" :body-items="[ {date:'2024-07-25', notification:'لقد دخل الشيخ إلى الاعدادات ووو'}, {date:'2024-07-25', notification:'لقد دخل الشيخ إلى الاعدادات ووو'}, {date:'2024-07-25', notification:'لقد دخل الشيخ إلى الاعدادات ووو'}, { date: '2024-07-25', notification:'لقد دخل الشيخ إلى الاعدادات ووو'} ]"/>
        </template>
        <template v-else-if="currentTab == 'tab2'">
            <DashboardNotificationsMessages />
        </template>
        <template v-else-if="currentTab == 'tab3'">
            <DashboardNotificationsSettings />
        </template>
    </div>
</template>

<script setup lang="ts" >
const currentTab = ref('tab0');

</script>