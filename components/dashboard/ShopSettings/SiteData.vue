<template>
        <template v-if="loading"><SkeletonsSocialData/></template>
        <template v-else>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput label="اسم الموقع:" v-model="settings.general_settings.title"/> 
        <TextInput label="البريد الالكتروني للموقع:" v-model="settings.general_settings.email" />
        <LazyPhoneInput mobile v-model="settings.general_settings.phone"/> 
        <TextInput label="عنوان الموقع:" v-model="settings.general_settings.address" />
        <TextInput type="textarea" label="وصف الموقع:" v-model="settings.general_settings.content" /> 
        <TextInput type="textarea" label="الكلمات المفتاحية:" v-model="settings.general_settings.keywords" />
        <TextInput type="textarea" label="اكواد اضافية(head):" v-model="settings.general_settings.extra_head_script" /> 
        <TextInput type="textarea" label="اكواد اضافية(body):" v-model="settings.general_settings.extra_body_script" />
    <div class="mb-8">
    <label class="block mb-2 font-semibold text-gray-700">شعار الموقع:</label>
    <div class="flex items-center gap-6">
      <transition name="fade">
        <img
          v-if="settings.general_settings.logo"
          :src="settings.general_settings.logo"
          alt="شعار الموقع"
          class="w-20 h-20 rounded-full border-2 border-primary-500 shadow-lg object-cover"
        />
      </transition>
      <label class="upload-label group cursor-pointer flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-primary-400 rounded-lg hover:bg-primary-50 transition-all duration-300 relative">
        <svg class="w-8 h-8 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <span class="mt-2 text-xs text-primary-500 group-hover:text-primary-700 transition-colors">اختر صورة</span>
        <input type="file" class="hidden" @change="onFileChange('logo', $event)" @input="files.logo = ($event as any).target.files[0]" />
      </label>
    </div>
  </div>
        <TextInput label="IP الموقع" v-model="settings.general_settings.ip" />
        <TextInput label="رابط تضمين إحصائيات جوجل:" v-model="settings.general_settings.embed_google_analytics" />
        <ClientOnly><Editor label="من نحن" v-model="settings.general_settings.about" /></ClientOnly>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="submit">حفظ</PrimaryButton>
    </template>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';

const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
let files = reactive({
  logo: null
});
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

function submit() {
let payload = { ...settings.value.general_settings };  
  if (files.logo as File && typeof files.logo !== 'string') {
    const formdata = new FormData();
    formdata.append('general_settings.logo', files.logo as File);
    updateSettings(2, formdata);
  }
  delete payload.logo;
  delete payload.default_user_image
  delete payload.default_not_found_image
  updateSettings(2, { general_settings: payload });
}

onMounted(() => {
    files.logo = settings.value.general_settings?.logo;
});
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
