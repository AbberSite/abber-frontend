<template>
    <DashboardTitle department="الاعدادات" title="إعدادات عامة"/>
    <Tabs :tabs="[{value: 'tab0', name: 'القوائم'}, {value: 'tab1', name: 'الشروط والاحكام'}, {value: 'tab2', name: 'الصور الافتراضية'}]" v-model:model-value="currentTab"/>
    <div class="pt-4">
        <template v-if="currentTab == 'tab0'">
            <DashboardSettingsPublicSettings />
        </template>
        <template v-else-if="currentTab == 'tab1'">
            <span class="font-semibold text-gray-800" >انتظر الانتهاء من الeditor </span>
        </template>
        <template v-else>
            <DashboardSettingsDefaultImages/>
        </template>
    </div> 
</template>

<script setup lang="ts">
const currentTab = ref('tab0');

</script>