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
        <Selector multiple label="Active payment methods (website)" v-model="settings.api_settings.active_payment_methods.website">
            <optgroup label="الموقع">
                <option value="APPLEPAY">ابل باي</option>
                <option value="MADA">مدى كارد</option>
                <option value="VISA">فيزا كارد</option>
                <option value="MASTER">ماستر كارد</option>
                <option value="STC_PAY">اس تي سي باي</option>
                <option value="BALANCE">المحفظة</option>
                <option value="in_app_purchase">in_app_pruchase</option>
                <option value="CARD">CARD</option>
            </optgroup>
        </Selector>
        <Selector multiple label="Active payment methods (android)" v-model="settings.api_settings.active_payment_methods.android">
            <optgroup label="تطبيق الاندرويد">
                <option value="MADA">مدى كارد</option>
                <option value="VISA">فيزا كارد</option>
                <option value="MASTER">ماستر كارد</option>
                <option value="STC_PAY">اس تي سي باي</option>
                <option value="BALANCE">المحفظة</option>
                <option value="CARD">CARD</option>
            </optgroup>
        </Selector>
        <Selector multiple label="Active payment methods (ios)" v-model="settings.api_settings.active_payment_methods.ios">
            <optgroup label="تطبيق الايفون">
                <option value="APPLEPAY">ابل باي</option>
                <option value="MADA">مدى كارد</option>
                <option value="VISA">فيزا كارد</option>
                <option value="MASTER">ماستر كارد</option>
                <option value="STC_PAY">اس تي سي باي</option>
                <option value="BALANCE">المحفظة</option>
                <option value="in_app_purchase">in_app_pruchase</option>
                <option value="CARD">CARD</option>
            </optgroup>
        </Selector>
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
        <Selector multiple label="Active login methods (website)" v-model="settings.api_settings.active_login_methods.website">
            <optgroup label="الموقع">
                <option value="apple">ابل </option>
                <option value="google">جوجل</option>
                <option value="whatsapp">الواتساب</option>
                <option value="phone">رقم الجوال</option>
                <option value="guest">زائر</option>
            </optgroup>
        </Selector>
        <Selector multiple label="Active login methods (android)" v-model="settings.api_settings.active_login_methods.android">
            <optgroup label="تطبيق الاندرويد">
                <option value="apple">ابل </option>
                <option value="google">جوجل</option>
                <option value="whatsapp">الواتساب</option>
                <option value="phone">رقم الجوال</option>
                <option value="guest">زائر</option>
            </optgroup>
        </Selector>
        <Selector multiple label="Active login methods (ios)" v-model="settings.api_settings.active_login_methods.ios">
            <optgroup label="تطبيق الايفون">
                <option value="apple">ابل </option>
                <option value="google">جوجل</option>
                <option value="whatsapp">الواتساب</option>
                <option value="phone">رقم الجوال</option>
                <option value="guest">زائر</option>
            </optgroup>
        </Selector>
        <Selector label="تفعيل الكوبون" multiple v-model="settings.api_settings.active_coupon_apps">
            <option value="website">الموقع</option>
            <option value="android">تطبيق الاندرويد</option>
            <option value="ios">تطبيق الايفون</option>
        </Selector>
        <TextInput label="Our SMS token:" v-model="settings.api_settings.oursms_token"/>
        <Checkbox label="تفعيل الإشعارات" v-model="settings.api_settings.notifications"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="handleSave">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();

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