<template>
    <template v-if="loading"><SkeletonsSocialData/></template>
    <template v-else>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2" >
            <TextInput type="number" label="مدة إرسال تنبيه طلب متأخر إلى المعبر (ساعات):" v-model="settings.policy_settings.expressor_notification_time" />
            <TextInput type="number" label="تغيير الطلب المتأخر (ساعات):" v-model="settings.policy_settings.cancel_order_time"/>
            <!-- <TextInput type="number" label="مدة تأخير دور العميل (دقائق):" v-model="settings.policy_settings.change_order_index_time"/> -->
            <TextInput type="number" label="مدة تحويل حالة التحويل الطلبات المكتملة لتم الارسال (بالساعة):" v-model="settings.policy_settings.order_completion_time"/>
            <TextInput type="number" label="عدد الايام لتحويل (حالة التحويل للخدمات المنفذة لمكتمل):" v-model="settings.policy_settings.trans_completion_time"/>
            <!-- <TextInput type="number" label="مهلة إنهاء جلسة الفيديو بعد خروج المعبر (بالساعات):" v-model="settings.policy_settings.end_meeting_time"/> -->
            <TextInput type="number" label="إكمال الطلبات الباشرة قيد التنفيذ المتأخرة في التسليم (بالساعة):" v-model="settings.policy_settings.in_progress_order_completion_time"/>
            <TextInput type="number" label="إكمال الطلبات المتأخرة في الاستلام (بالساعة):" v-model="settings.policy_settings.complete_overdue_orders_time"/>
            <TextInput type="number" label="الحد الأقصى لمدة التسجيل الصوتي (ثواني):" v-model="settings.policy_settings.record_max_elapsed_time"/>
            <TextInput type="number" label="الحد الأقصى للطلبات المستعجلة:" v-model="settings.policy_settings.urgent_service_stock_limit"/>
        </div>
        <PrimaryButton class="my-2" :loading="loading" @click="updateSettings(2, {policy_settings: {...settings.policy_settings}})">حفظ</PrimaryButton>
    </template>
</template>


<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const { loading, settings } = storeToRefs(useDashboardSettingsStore());
const { updateSettings } = useDashboardSettingsStore();
</script>