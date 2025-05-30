<template>
  <div class="space-y-6">
    <ClientOnly>
      <HtmlEditor
        label="شروط استلام الطلب"
        v-model="settings.policy_settings.order_terms"
        placeholder="أدخل شروط وأحكام الطلب (HTML)..."
      />
      <HtmlEditor
        label="الشروط والأحكام"
        v-model="settings.policy_settings.terms"
        placeholder="أدخل الشروط والأحكام (HTML)..."
      />
      <HtmlEditor
        label="إتفاقية المستخدم"
        v-model="settings.policy_settings.user_agreement"
        placeholder="أدخل سياسة المستخدم (HTML)..."
      />
      <HtmlEditor
        label="إتفاقية المستخدم الخاصة بحساب (المعبر)"
        v-model="settings.policy_settings.expressor_agreement"
        placeholder="أدخل شروط وأحكام مزود الخدمة (HTML)..."
      />
      <HtmlEditor
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
import HtmlEditor from "./HtmlEditor.vue";
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>
<style scoped>
/* Restore default styles for HTML content inside the editor */
:deep(.ProseMirror) {
  all: revert;
  font-family: inherit;
  color: inherit;
  background: none;
  box-sizing: border-box;
}
:deep(.ProseMirror) h1 {
  @apply text-3xl font-bold mb-4 mt-6;
}
:deep(.ProseMirror) h2 {
  @apply text-2xl font-semibold mb-3 mt-5;
}
:deep(.ProseMirror) h3 {
  @apply text-xl font-semibold mb-2 mt-4;
}
:deep(.ProseMirror) p {
  @apply mb-2 leading-relaxed;
}
:deep(.ProseMirror) ul {
  @apply list-disc pl-6 mb-2;
}
:deep(.ProseMirror) ol {
  @apply list-decimal pl-6 mb-2;
}
:deep(.ProseMirror) li {
  @apply mb-1;
}
</style>
