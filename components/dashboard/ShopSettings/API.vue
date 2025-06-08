<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
        <TextInput label="Twilio id:" v-model="settings.api_settings.twilio_id"/>
        <TextInput label="Twilio token:" v-model="settings.api_settings.twilio_token"/>
        <TextInput label="Twilio number:" v-model="settings.api_settings.twilio_number"/>
        <TextInput label="Twilio messaging service sid:" v-model="settings.api_settings.twilio_messaging_service_sid" />
        <TextInput label="Access token:" v-model="settings.api_settings.access_token"/>
        <TextInput label="EntityId mada:" v-model="settings.api_settings.entityId_mada"/>
        <TextInput label="EntityId visa master:" v-model="settings.api_settings.entityId_visa_master"/>
        <TextInput label="Test access token:" v-model="settings.api_settings.test_access_token"/>
        <TextInput label="Test entityId mada:" v-model="settings.api_settings.test_entityId_mada"/>
        <TextInput label="Test entityId apple pay:" v-model="settings.api_settings.test_entityId_apple_pay"/>
        <TextInput label="EntityId apple pay:" v-model="settings.api_settings.entityId_apple_pay"/>
        <TextInput label="Test entityId visa master:" v-model="settings.api_settings.test_entityId_visa_master"/>
        <TextInput label="Aws access key id:" v-model="settings.api_settings.aws_access_key_id"/>
        <TextInput label="Aws secret access key:" v-model="settings.api_settings.aws_secret_access_key"/>
        <TextInput label="Bucket name:" v-model="settings.api_settings.bucket_name"/>
        <Checkbox label="وضع الدفع التجريبي:" v-model="settings.api_settings.payment_test"/>
        <TextInput
            type="file"
            label="التحقق من ابل:"
            @input="settings.api_settings.apple_developer_merchantid_domain_association = ($event?.target as HTMLInputElement)?.files?.[0]"
        > <template #prepend>
            <span class="mb-2" v-if="settings.api_settings.apple_developer_merchantid_domain_association">
                حاليا:
                {{
                    typeof settings.api_settings.apple_developer_merchantid_domain_association === 'string'
                        ? settings.api_settings.apple_developer_merchantid_domain_association.split('/').pop()
                        : settings.api_settings.apple_developer_merchantid_domain_association.name
                }}
                <span v-if="typeof settings.api_settings.apple_developer_merchantid_domain_association === 'string'">
                    (.{{
                        settings.api_settings.apple_developer_merchantid_domain_association.split('.').pop()
                    }})
                </span>
                <span v-else>
                    (.{{
                        settings.api_settings.apple_developer_merchantid_domain_association.name.split('.').pop()
                    }})
                </span>
            </span>
        </template></TextInput>
        <TextInput label="Our SMS token:" v-model="settings.api_settings.oursms_token"/>
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