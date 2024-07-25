<template>
    <DashboardTitle department="الدعم التقني" title="اعدادات مركز المساعدة"/>
    <DashboardTablesTable :head-items="{ problem: 'مشكلة', parent:'الأب' }" :body-items="data" :actions="{ modify: true, remove: true }" addButton />
    <ClientOnly>
        <ModifyModal @close="showModal = false" v-if="showModal" :title="title" >
            <div class="flex flex-col gap-2 mt-2" >
                <Selector label="الأب" :options="[ {value: '1', text: 'الطلبات'}, {value: '2', text: 'المدفوعات'}, {value: '3', text: 'طلبات الارجاع'} ]"/>
                <TextInput label="اسم المشكلة" />
                <TextInput label="الحل" type="textarea"/>
                <Selector multiple label="دور المستخدم" :options="[ { value: 'مستخدم' }, { value: 'معبر' },{ value: 'إدارة' }, ]" />
                <PrimaryButton class="w-full my-2" >متابعة</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
let showModal = ref(false);
let title = ref('');
const {$listen} = useNuxtApp();
const data = ref([
    { problem: 'اريد فاتورة', parent: 'الطلبات' },
    { problem: 'اريد فاتورة', parent: 'الطلبات' },
    { problem: 'اريد فاتورة', parent: 'الطلبات' },
    { problem: 'اريد إلغاء طلب الدومين', parent: 'تقنية -> الدومين الخاص' }
]);
$listen('table-modify-object', (data)=> {
    showModal.value = true;
    title.value = "تعديل المشكلة";
});
$listen('open_add_window', ()=> {
    showModal.value = true;
    title.value = "انشاء مشكلة جديدة";
})
</script>