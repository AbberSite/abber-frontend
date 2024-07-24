<template>
  <DashboardTitle department="الاعدادات" title="إعدادات الموقع" />
  <DashboardTab
    :tabs="[
      { value: 'tab0', name: 'بيانات الموقع' },
      { value: 'tab1', name: 'بيانات التواصل الاجتماعي' },
      { value: 'tab2', name: 'السياسات' },
      { value: 'tab3', name: 'اعدادات API' },
      { value: 'tab4', name: 'البيانات المالية' },
      { value: 'tab5', name: 'رسوم طرق الدفع' },
      { value: 'tab6', name: 'النسخ الاحتياطي' },
      { value: 'tab7', name: 'إعدادات الباقات' },
      { value: 'tab8', name: 'Orders Packages Settings' },
    ]"
    v-model:model-value="currentTab"
  />
  <div class="pt-4">
    <template v-if="currentTab == 'tab0'">
      <DashboardShopSettingsSiteData />
    </template>
    <template v-else-if="currentTab == 'tab1'">
      <DashboardShopSettingsSocailData />
    </template>
    <template v-else-if="currentTab == 'tab2'">
      <DashboardShopSettingsPolicies />
    </template>
    <template v-else-if="currentTab == 'tab3'">
      <DashboardShopSettingsAPI />
    </template>
    <template v-else-if="currentTab == 'tab4'">
        <DashboardShopSettingsFinance/>
    </template>
    <template v-else-if="currentTab == 'tab5'">
        <DashboardShopSettingsPaymentFees />
    </template>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref("tab0");
</script>
