<template>
    <template v-if="loading">
        <SkeletonsSocialData/>
    </template>
    <template v-else>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <TextInput label="فيسبوك:" v-model="settings.social_settings.facebook" dir="ltr"/>
            <TextInput label="سناب شات:" v-model="settings.social_settings.snapchat" dir="ltr"/>
            <TextInput label="تويتر:" v-model="settings.social_settings.twitter" dir="ltr"/>
            <TextInput label="استاغرام:" v-model="settings.social_settings.instagram" dir="ltr"/>
        </div>
        <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {social_settings: {...settings.social_settings}})" >حفظ</PrimaryButton>
    </template>

</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>