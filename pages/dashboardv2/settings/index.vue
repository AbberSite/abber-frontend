<template>
    <DashboardTitle department="الاعدادات" title="إعدادات عامة"/>
    <Tabs :tabs="[{ value: 'tab0', name: 'بيانات الموقع' },
      { value: 'tab1', name: 'بيانات التواصل الاجتماعي' },{value: 'tab2', name: 'القوائم'}, {value: 'tab3', name: 'الشروط والاحكام'}, {value: 'tab4', name: 'الصور الافتراضية'}]" v-model:model-value="currentTab"/>
    <div class="pt-4">
        <template v-if="currentTab == 'tab0'">
      <DashboardShopSettingsSiteData />
    </template>
    <template v-else-if="currentTab == 'tab1'">
      <DashboardShopSettingsSocailData />
    </template>
        <template v-else-if="currentTab == 'tab2'">
            <DashboardSettingsPublicSettings />
        </template>
        <template v-else-if="currentTab == 'tab3'">
            <DashboardSettingsPoliciesTerms/>
        </template>
        <template v-else>
            <DashboardSettingsDefaultImages/>
        </template>
    </div> 
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings'; 
const {getSettings} = useDashboardSettingsStore();
const currentTab = ref("tab0");
getSettings();
</script>