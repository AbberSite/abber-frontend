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
        <MultiSelector
          label="Active payment methods (website)"
          :options="[
            { value: 'APPLEPAY', text: 'ابل باي' },
            { value: 'MADA', text: 'مدى كارد' },
            { value: 'VISA', text: 'فيزا كارد' },
            { value: 'MASTER', text: 'ماستر كارد' },
            { value: 'STC_PAY', text: 'اس تي سي باي' },
            { value: 'BALANCE', text: 'المحفظة' },
            { value: 'in_app_purchase', text: 'in_app_pruchase' },
            { value: 'CARD', text: 'CARD' }
          ]"
          placeholder="الموقع"
          v-model="settings.api_settings.active_payment_methods.website"
        />
        <MultiSelector label="Active payment methods (android)"
          :options="[
            { value: 'MADA', text: 'مدى كارد' },
            { value: 'VISA', text: 'فيزا كارد' },
            { value: 'MASTER', text: 'ماستر كارد' },
            { value: 'STC_PAY', text: 'اس تي سي باي' },
            { value: 'BALANCE', text: 'المحفظة' },
            { value: 'CARD', text: 'CARD' }
          ]"
          placeholder="تطبيق الاندرويد"
          v-model="settings.api_settings.active_payment_methods.android"
        />
        <MultiSelector label="Active payment methods (ios)"
            :options="[
                { value: 'APPLEPAY', text: 'ابل باي' },
                { value: 'MADA', text: 'مدى كارد' },
                { value: 'VISA', text: 'فيزا كارد' },
                { value: 'MASTER', text: 'ماستر كارد' },
                { value: 'STC_PAY', text: 'اس تي سي باي' },
                { value: 'BALANCE', text: 'المحفظة' },
                { value: 'in_app_purchase', text: 'in_app_pruchase' },
                { value: 'CARD', text: 'CARD' }
            ]"
            placeholder="تطبيق الايفون"
            v-model="settings.api_settings.active_payment_methods.ios" />
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
        <MultiSelector label="Active login methods (website)"
            :options="[
                { value: 'apple', text: 'ابل' },
                { value: 'google', text: 'جوجل' },
                { value: 'whatsapp', text: 'الواتساب' },
                { value: 'phone', text: 'رقم الجوال' },
                { value: 'guest', text: 'زائر' }
            ]"
            placeholder="الموقع"
            v-model="settings.api_settings.active_login_methods.website"/>

        <MultiSelector label="Active login methods (android)"
            :options="[
                { value: 'apple', text: 'ابل' },
                { value: 'google', text: 'جوجل' },
                { value: 'whatsapp', text: 'الواتساب' },
                { value: 'phone', text: 'رقم الجوال' },
                { value: 'guest', text: 'زائر' }
            ]"
            placeholder="تطبيق الاندرويد"
            v-model="settings.api_settings.active_login_methods.android"/>
        <MultiSelector label="Active login methods (ios)"
            :options="[
                { value: 'apple', text: 'ابل' },
                { value: 'google', text: 'جوجل' },
                { value: 'whatsapp', text: 'الواتساب' },
                { value: 'phone', text: 'رقم الجوال' },
                { value: 'guest', text: 'زائر' }
            ]"
            placeholder="تطبيق الايفون"
            v-model="settings.api_settings.active_login_methods.ios"/>
        <MultiSelector label="تفعيل الكوبون" 
            :options="[
                { value: 'website', text: 'الموقع' },
                { value: 'android', text: 'تطبيق الاندرويد' },
                { value: 'ios', text: 'تطبيق الايفون' }
            ]"
            placeholder="تفعيل الكوبون"
            v-model="settings.api_settings.active_coupon_apps"/>
        <TextInput label="Our SMS token:" v-model="settings.api_settings.oursms_token"/>
        <Checkbox label="تفعيل الإشعارات" v-model="settings.api_settings.notifications"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="handleSave">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
const paymentsSelected = ref([]);
// Convert array to string like ['android','ios'], object of arrays to "'key1':[...],'key2':[...]" format
function toBracketString(val: any) {
    if (Array.isArray(val)) {
        return `[${val.map(v => `'${v}'`).join(',')}]`;
    }
    if (typeof val === 'object' && val !== null) {
        // For object of arrays, convert each array to "'key':[...]" and join with commas
        return Object.entries(val)
            .map(([k, v]) => `'${k}':[${Array.isArray(v) ? v.map(i => `'${i}'`).join(',') : v}]`)
            .join(',');
    }
    return val ?? '';
}
const formData = new FormData();
function prepareApiSettingsPayload() {
    const apiSettings = { ...settings.value.api_settings };

    // Convert active_login_methods and active_payment_methods objects to bracket string
    apiSettings.active_login_methods = toBracketString(apiSettings.active_login_methods);
    apiSettings.active_payment_methods = toBracketString(apiSettings.active_payment_methods);

    // Convert active_coupon_apps array to bracket string
    apiSettings.active_coupon_apps = toBracketString(apiSettings.active_coupon_apps);

    // Handle apple_developer_merchantid_domain_association as file or skip if empty
    if (
        apiSettings.apple_developer_merchantid_domain_association instanceof File
    ) {
    } else {
        delete apiSettings.apple_developer_merchantid_domain_association;
    }

    return apiSettings;
}

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