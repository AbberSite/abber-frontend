<template>
  <DashboardTitle department="الاعدادات" title="إعدادات الموقع" />
  <Tabs     :tabs="[
      { value: 'tab0', name: 'السياسات' },
      { value: 'tab1', name: 'اعدادات API' },
      { value: 'tab2', name: 'اعدادات التطبيق' },
      { value: 'tab3', name: 'البيانات المالية' },
      { value: 'tab7', name: 'تطبيق منام' },
      { value: 'tab4', name: 'رسوم طرق الدفع' },
      { value: 'tab5', name: 'إعدادات الخدمات' },
      { value: 'tab6', name: 'إعدادات باقات الطلبات' },
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
      <DashboardShopSettingsAppSettings />
    </template>
    <template v-else-if="currentTab == 'tab3'">
      <DashboardShopSettingsFinance />
    </template>
    <template v-else-if="currentTab == 'tab4'">
      <DashboardShopSettingsPaymentFees />
    </template>
    <template v-else-if="currentTab == 'tab5'">
      <DashboardShopSettingsExpressors />
    </template>
    <template v-else-if="currentTab == 'tab6'">
      <DashboardShopSettingsOrdersPackages />
    </template>
    <template v-else>
      <DashboardShopSettingsManamSettings />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings'; 
const {getSettings} = useDashboardSettingsStore();
const currentTab = ref("tab0");
getSettings();
</script>
