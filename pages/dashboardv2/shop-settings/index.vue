<template>
  <DashTitle department="الاعدادات" title="إعدادات الموقع" />
  <DashTab
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
      <DashShopSettingsSiteData />
    </template>
    <template v-else-if="currentTab == 'tab1'">
      <DashShopSettingsSocailData />
    </template>
    <template v-else-if="currentTab == 'tab2'">
      <DashShopSettingsPolicies />
    </template>
    <template v-else-if="currentTab == 'tab3'">
      <DashShopSettingsAPI />
    </template>
    <template v-else-if="currentTab == 'tab4'">
      <DashShopSettingsFinance />
    </template>
    <template v-else-if="currentTab == 'tab5'">
      <DashShopSettingsPaymentFees />
    </template>
    <template v-else-if="currentTab == 'tab6'">
      <div class="flex justify-center">
        <PrimaryButton>إستعادة نسخة إحتياطية</PrimaryButton>
      </div>
    </template>
    <template v-else-if="currentTab == 'tab7'">
      <DashShopSettingsPackages />
    </template>
    <template v-else>
      <DashShopSettingsOrdersPackages />
    </template>
  </div>
</template>

<script setup lang="ts">
const currentTab = ref("tab0");
</script>
