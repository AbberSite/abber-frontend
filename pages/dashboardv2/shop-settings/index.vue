<template>
  <DashboardTitle department="الاعدادات" title="إعدادات الموقع" />
  <Tabs     :tabs="[
      { value: 'tab0', name: 'السياسات' },
      { value: 'tab1', name: 'اعدادات API' },
      { value: 'tab2', name: 'البيانات المالية' },
      { value: 'tab3', name: 'رسوم طرق الدفع' },
      { value: 'tab4', name: 'إعدادات الخدمات' },
      { value: 'tab5', name: 'Orders Packages Settings' },
    ]"
    v-model:model-value="currentTab"
  />
  <div class="pt-4">
    <template v-if="currentTab == 'tab0'">
      <DashboardShopSettingsPolicies />
    </template>
    <template v-else-if="currentTab == 'tab1'">
      <DashboardShopSettingsAPI />
    </template>
    <template v-else-if="currentTab == 'tab2'">
      <DashboardShopSettingsFinance />
    </template>
    <template v-else-if="currentTab == 'tab3'">
      <DashboardShopSettingsPaymentFees />
    </template>
    <template v-else-if="currentTab == 'tab4'">
      <DashboardShopSettingsPackages />
    </template>
    <template v-else>
      <DashboardShopSettingsOrdersPackages />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings'; 
const {getSettings} = useDashboardSettingsStore();
const currentTab = ref("tab0");
getSettings();
</script>
