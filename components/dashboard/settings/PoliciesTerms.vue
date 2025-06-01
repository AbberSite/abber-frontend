<template>
  <div class="space-y-6">
    <ClientOnly>
      <Editor
        label="شروط استلام الطلب"
        v-model="settings.policy_settings.order_terms"
        placeholder="أدخل شروط وأحكام الطلب (HTML)..."
      />
      <Editor
        label="الشروط والأحكام"
        v-model="settings.policy_settings.terms"
        placeholder="أدخل الشروط والأحكام (HTML)..."
      />
      <Editor
        label="إتفاقية المستخدم"
        v-model="settings.policy_settings.user_agreement"
        placeholder="أدخل سياسة المستخدم (HTML)..."
      />
      <Editor
        label="إتفاقية المستخدم الخاصة بحساب (المعبر)"
        v-model="settings.policy_settings.expressor_agreement"
        placeholder="أدخل شروط وأحكام مزود الخدمة (HTML)..."
      />
      <Editor
        label="إتفاقية المستخدم (المعبر)"
        v-model="settings.policy_settings.expressor_terms"
        placeholder="أدخل شروط وأحكام مزود الخدمة (HTML)..."
      />
    </ClientOnly>
    <PrimaryButton
      class="my-2"
      :loading="loading"
      @click="
        () =>
          updateSettings(2, {
            policy_settings: { ...settings.policy_settings },
          })
      "
      >حفظ</PrimaryButton
    >
  </div>
</template>
<script setup lang="ts">
import { useDashboardSettingsStore } from "~/stores/dashboard/dashboardSettings";
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>
