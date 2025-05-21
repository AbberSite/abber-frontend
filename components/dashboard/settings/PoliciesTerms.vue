<template>
  <div class="space-y-6">
    <HtmlEditor
      label="سياسة المستخدم"
      v-model="settings.policy_settings.user_agreement"
      placeholder="أدخل سياسة المستخدم (HTML)..."
    />
    <HtmlEditor
      label="شروط وأحكام مزود الخدمة"
      v-model="settings.policy_settings.expressor_agreement"
      placeholder="أدخل شروط وأحكام مزود الخدمة (HTML)..."
    />
    <HtmlEditor
      label="الشروط والأحكام"
      v-model="settings.policy_settings.terms"
      placeholder="أدخل الشروط والأحكام (HTML)..."
    />
    <HtmlEditor
      label="شروط وأحكام الطلب"
      v-model="settings.policy_settings.order_terms"
      placeholder="أدخل شروط وأحكام الطلب (HTML)..."
    />
    <PrimaryButton class="my-2" :loading="loading" @click="()=> updateSettings(2, { policy_settings: { ...settings.policy_settings } })">حفظ</PrimaryButton>
  </div>
</template>
<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
import HtmlEditor from './HtmlEditor.vue';
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();

</script>