<template>
  <div class="mb-4">
    <label class="block mb-1 font-medium">صورة المستخدم الافتراضية:</label>
    <div class="flex items-center gap-4">
      <img
        v-if="settings.general_settings.default_user_image"
        :src="settings.general_settings.default_user_image"
        alt="صورة المستخدم الافتراضية"
        class="w-16 h-16 rounded border object-cover"
      />
      <input type="file" @change="onFileChange('default_user_image', $event)" />
    </div>
  </div>
  <div class="mb-4">
    <label class="block mb-1 font-medium">صورة غير موجود:</label>
    <div class="flex items-center gap-4">
      <img
        v-if="settings.general_settings.default_not_found_image"
        :src="settings.general_settings.default_not_found_image"
        alt="صورة غير موجود"
        class="w-16 h-16 rounded border object-cover"
      />
      <input type="file" @change="onFileChange('default_not_found_image', $event)" />
    </div>
  </div>
  <PrimaryButton class="my-2">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { settings } = storeToRefs(useDashboardSettingsStore());

// Dummy upload handler, replace with your real upload logic
function onFileChange(key: string, event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (!file) return;
  // Example: preview locally (for real use, upload to server and set the URL)
  const reader = new FileReader();
  reader.onload = (e) => {
    settings.value.general_settings[key] = e.target?.result as string;
  };
  reader.readAsDataURL(file);
}
</script>