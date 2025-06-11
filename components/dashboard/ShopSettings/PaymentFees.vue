<template>
    <template v-if="loading"><SkeletonsSocialData/></template>
    <template v-else>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput type="number" label="الخصم على الفيزا وماستركارد:" v-model="settings.payment_methods_fees_settings.visa_master_tax"/>
        <TextInput type="number" label="الخصم على الفيزا والماستر كارد (ثابت):" v-model="settings.payment_methods_fees_settings.fixed_visa_master_tax"/>
        <TextInput type="number" label="الخصم على مدى:" v-model="settings.payment_methods_fees_settings.mada_tax"/>
        <TextInput type="number" label="الخصم على مدى (ثابت):" v-model="settings.payment_methods_fees_settings.fixed_mada_tax"/>
        <TextInput type="number" label="الخصم على stc:" v-model="settings.payment_methods_fees_settings.stc_pay_tax"/>
        <TextInput type="number" label="الخصم على stc (ثابت):" v-model="settings.payment_methods_fees_settings.fixed_stc_pay_tax"/>
        <TextInput type="number" label="الخصم على المحفظة:" v-model="settings.payment_methods_fees_settings.balance_tax"/>
        <TextInput type="number" label="الخصم على المحفظة (ثابت):" v-model="settings.payment_methods_fees_settings.fixed_balance_tax"/>
        <TextInput type="number" label="الخصم على ابل باي:" v-model="settings.payment_methods_fees_settings.applepay_tax"/>
        <TextInput type="number" label="الخصم على ابل باي (ثابت):" v-model="settings.payment_methods_fees_settings.fixed_applepay_tax"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {payment_methods_fees_settings: {...settings.payment_methods_fees_settings}})">حفظ</PrimaryButton>
    </template>
</template>
<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { settings, loading } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>