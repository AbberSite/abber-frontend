<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
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