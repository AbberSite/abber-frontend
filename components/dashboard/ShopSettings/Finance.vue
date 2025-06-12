<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput type="number" label="الضريبة:" v-model="settings.financial_settings.tax"/>
        <TextInput type="number" label="خصم على الفواتير الإلكترونية:" v-model="settings.financial_settings.bill_tax"/>
        <TextInput type="number" label="عمولة الدومين (بالريال):" v-model="settings.financial_settings.domain_tax"/>
        <TextInput type="number" label="سعر صرف (الدولار) مقابل (الريال):" v-model="settings.financial_settings.usd_sar"/>
        <TextInput type="number" label="الحد الاقصى لسحب الرصيد:" v-model="settings.financial_settings.max_amount"/>
        <TextInput type="number" label="الحد الادنى لسعر الخدمة:" v-model="settings.financial_settings.min_price"/>
        <TextInput type="number" label="الحد الاقصى لسعر الخدمة:" v-model="settings.financial_settings.max_price"/>
        <TextInput type="number" label="رسوم سحب الرصيد:" v-model="settings.financial_settings.balance_withdrawal_tax"/>
        <TextInput type="number" label="سعر الطلب الافتراضي:" v-model="settings.financial_settings.default_order_price"/>
        <TextInput type="number" label="رسوم المعبر للطلب المستعجل:" v-model="settings.financial_settings.without_service_order_fees"/>
        <TextInput type="number" label="ربح الاحالة:" v-model="settings.financial_settings.referral_profit"/>
        <TextInput type="number" label="Minimum balance gift:" v-model="settings.financial_settings.min_balance_gift"/>
        <TextInput type="number" label="Referral gift:" v-model="settings.financial_settings.referral_gift"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {financial_settings: {...settings.financial_settings}})">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();

</script>