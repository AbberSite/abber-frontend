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
        <CustomImageInput
            label="شعار الموقع:"
            v-model="files.logo"
        />
  </div>
        <TextInput label="IP الموقع" v-model="settings.general_settings.ip" />
        <TextInput label="رابط تضمين إحصائيات جوجل:" v-model="settings.general_settings.embed_google_analytics" />
        <ClientOnly><Editor label="من نحن" v-model="settings.general_settings.about" /></ClientOnly>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="submit">حفظ</PrimaryButton>
    </template>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';

const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
let files = reactive({
  logo: null
});

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
    watch(settings, () => {
        if(!files.logo) {
          files.logo = settings.value.general_settings?.logo || null;
      }
      }, { immediate: true });
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
