<template>
  <div class="mb-8">
    <label class="block mb-2 font-semibold text-gray-700">صورة المستخدم الافتراضية:</label>
    <div class="flex items-center gap-6">
      <transition name="fade">
        <img
          v-if="settings.general_settings.default_user_image"
          :src="settings.general_settings.default_user_image"
          alt="صورة المستخدم الافتراضية"
          class="w-20 h-20 rounded-full border-2 border-primary-500 shadow-lg object-cover"
        />
      </transition>
      <label class="upload-label group cursor-pointer flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-primary-400 rounded-lg hover:bg-primary-50 transition-all duration-300 relative">
        <svg class="w-8 h-8 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <span class="mt-2 text-xs text-primary-500 group-hover:text-primary-700 transition-colors">اختر صورة</span>
        <input type="file" class="hidden" @change="onFileChange('default_user_image', $event)" @input="files.default_user_image = ($event as any).target.files[0]" />
      </label>
    </div>
  </div>
  <div class="mb-8">
    <label class="block mb-2 font-semibold text-gray-700">صورة غير موجود:</label>
    <div class="flex items-center gap-6">
      <transition name="fade">
        <img
          v-if="settings.general_settings.default_not_found_image"
          :src="settings.general_settings.default_not_found_image"
          alt="صورة غير موجود"
          class="w-20 h-20 rounded-full border-2 border-primary-500 shadow-lg object-cover"
        />
      </transition>
      <label class="upload-label group cursor-pointer flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-primary-400 rounded-lg hover:bg-primary-50 transition-all duration-300 relative">
        <svg class="w-8 h-8 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <span class="mt-2 text-xs text-primary-500 group-hover:text-primary-700 transition-colors">اختر صورة</span>
        <input type="file" class="hidden" @change="onFileChange('default_not_found_image', $event)" @input="files.default_not_found_image = ($event as any).target.files[0]" />
      </label>
    </div>
  </div>
  <PrimaryButton class="my-2" :loading="loading" @click="submitFiles" >حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
let files = reactive({
  default_user_image: null,
  default_not_found_image: null
});
onMounted(() => {
  // Initialize files with current settings
  files.default_user_image = settings.value.general_settings.default_user_image;
  files.default_not_found_image = settings.value.general_settings.default_not_found_image;
});
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
const submitFiles = async () => {
  const formdata = new FormData();
  if (files.default_user_image && typeof files.default_user_image !== 'string') {
    formdata.append('general_settings.default_user_image', files.default_user_image);
  };
  if (files.default_not_found_image && typeof files.default_not_found_image !== 'string') {
    formdata.append('general_settings.default_not_found_image', files.default_not_found_image);
  };
  if (!formdata.has('general_settings.default_user_image') && !formdata.has('general_settings.default_not_found_image')) {
    return;
  }
  await updateSettings(2, formdata);
};
</script>

<style scoped>
.upload-label {
  box-shadow: 0 2px 8px 0 rgba(80, 120, 200, 0.07);
  transition: box-shadow 0.3s, border-color 0.3s;
}
.upload-label:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 16px 0 rgba(80, 120, 200, 0.15);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>