<template>
  <template v-if="loading"><SkeletonsSocialData/></template>
  <template v-else >
    <div class="mb-8">
      <CustomImageInput
        label="صورة المستخدم الافتراضية:"
        v-model="files.default_user_image"
      />
    </div>
    <div class="mb-8">
      <CustomImageInput
        label="صورة غير موجود:"
        v-model="files.default_not_found_image"
      />
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="submitFiles">حفظ</PrimaryButton>
  </template>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue';
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
import CustomImageInput from '~/components/shared/CustomImageInput.vue';

const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();

let files = reactive({
  default_user_image: settings.value.general_settings?.default_user_image || null,
  default_not_found_image: settings.value.general_settings?.default_not_found_image || null,
});

onMounted(() => {
  watch(settings, () => {
    if(!files.default_user_image || !files.default_not_found_image) {
      files.default_user_image = settings.value.general_settings?.default_user_image || null;
      files.default_not_found_image = settings.value.general_settings?.default_not_found_image || null;
  }
  }, { immediate: true });
  
});
const submitFiles = async () => {
  const formdata = new FormData();
  if (files.default_user_image && typeof files.default_user_image !== 'string') {
    formdata.append('general_settings.default_user_image', files.default_user_image);
  }
  if (files.default_not_found_image && typeof files.default_not_found_image !== 'string') {
    formdata.append('general_settings.default_not_found_image', files.default_not_found_image);
  }
  if (!formdata.has('general_settings.default_user_image') && !formdata.has('general_settings.default_not_found_image')) {
    return;
  }
  await updateSettings(2, formdata);
};
</script>