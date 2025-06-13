<template>
    <DashboardTablesTable :head-items="{ title: 'العنوان', sentTo: 'ارسال إلى', email:'بريد الكتروني', sms:'رسالة نصية', whatsapp: 'واتساب', notification: 'إشعار' }" :body-items="data" :actions="{modify: true, remove: true}" addButton/>
    <ClientOnly>
        <ModifyModal v-if="showModal" @close="showModal = false" :title="title">
            <div class="flex flex-col gap-2 mt-2">
                <TextInput label="العنوان"/>
                <TextInput label="الرسالة" type="textarea"/>
                <CustomSelect label="الحالة" :options="[{value: 'فاتورة'}, {value: 'طلب'}, {value: 'معبر'}]"/>
                <CustomSelect label="إرسال إلى" :options="[{value: 'عميل'}, {value: 'معبر'}, {value: 'مدير'}]"/>
                <Checkbox label="البريد الاكتروني"/>
                <Checkbox label="رسالة نصية"/>
                <Checkbox label="واتساب"/>
                <Checkbox label="اشعار"/>
                <PrimaryButton class="w-full my-2">ارسال</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
const {$listen} = useNuxtApp();
let title = ref('');
let showModal = ref(false);
const data = ref([
    {title: 'فاتورة جديدة', sentTo: 'عميل', email: false, sms: true, whatsapp: true, notification: false},
    {title: 'إعادة فتح الطلب', sentTo: 'معبر', email: false, sms: true, whatsapp: true, notification: false},
    {title: 'طلب جديد مؤكد', sentTo: 'عميل', email: false, sms: true, whatsapp: true, notification: false},
]);
$listen('table-modify-object', ()=> {
    showModal.value = true;
    title.value = "تعديل الرسالة" 
});
$listen('open_add_window', ()=> { showModal.value = true; title.value = "إنشاء رسالة جديدة" })

</script>