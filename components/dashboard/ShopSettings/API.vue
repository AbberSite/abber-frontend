<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
        <TextInput label="Twilio id:" v-model="settings.api_settings.twilio_id" dir="ltr"/>
        <TextInput label="Twilio token:" v-model="settings.api_settings.twilio_token" dir="ltr"/>
        <TextInput label="Twilio number:" v-model="settings.api_settings.twilio_number" dir="ltr"/>
        <TextInput label="Twilio messaging service sid:" v-model="settings.api_settings.twilio_messaging_service_sid" dir="ltr" />
        <TextInput label="Access token:" v-model="settings.api_settings.access_token" dir="ltr"/>
        <TextInput label="EntityId mada:" v-model="settings.api_settings.entityId_mada" dir="ltr"/>
        <TextInput label="EntityId visa master:" v-model="settings.api_settings.entityId_visa_master" dir="ltr"/>
        <TextInput label="Test access token:" v-model="settings.api_settings.test_access_token" dir="ltr"/>
        <TextInput label="Test entityId mada:" v-model="settings.api_settings.test_entityId_mada" dir="ltr"/>
        <TextInput label="Test entityId apple pay:" v-model="settings.api_settings.test_entityId_apple_pay" dir="ltr"/>
        <TextInput label="EntityId apple pay:" v-model="settings.api_settings.entityId_apple_pay" dir="ltr"/>
        <TextInput label="Test entityId visa master:" v-model="settings.api_settings.test_entityId_visa_master" dir="ltr"/>
        <TextInput label="Aws access key id:" v-model="settings.api_settings.aws_access_key_id" dir="ltr"/>
        <TextInput label="Aws secret access key:" v-model="settings.api_settings.aws_secret_access_key" dir="ltr"/>
        <TextInput label="Bucket name:" v-model="settings.api_settings.bucket_name" dir="ltr"/>
        <Checkbox label="وضع الدفع التجريبي:" v-model="settings.api_settings.payment_test"/>
        <CustomFileInput
            label="التحقق من ابل:"
            v-model="settings.api_settings.apple_developer_merchantid_domain_association" accept=".txt"/>
        <TextInput label="Our SMS token:" v-model="settings.api_settings.oursms_token" dir="ltr"/>
        <Checkbox label="تفعيل الإشعارات" v-model="settings.api_settings.notifications"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="handleSave">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings, prepareApiSettingsPayload } = useDashboardSettingsStore();

const formData = new FormData();

function handleSave() {
    if(settings.value.api_settings.apple_developer_merchantid_domain_association instanceof File) {
        formData.append(
            'api_settings.apple_developer_merchantid_domain_association',
            settings.value.api_settings.apple_developer_merchantid_domain_association
        );
        updateSettings(2, formData);
    }
    updateSettings(2, {api_settings: prepareApiSettingsPayload()});
}
</script>