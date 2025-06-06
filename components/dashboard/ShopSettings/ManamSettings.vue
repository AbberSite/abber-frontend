<template>
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <TextInput type="number" label="سعر الطلب:" v-model="settings.financial_settings.manam_order_price"/>
        <TextInput type="number" label="أرباح المعبر:" v-model="settings.financial_settings.manam_expressor_profits"/>
    </div>
    <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {financial_settings: {...settings.financial_settings}})">حفظ</PrimaryButton>
</template>

<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>
