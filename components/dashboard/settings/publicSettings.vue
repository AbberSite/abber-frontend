<template>
    <DashboardTablesTable :head-items="{first: 'النص الاول', second: 'النص الثاني'}" :body-items="settingsList" :actions="{modify: true, remove: true}" addButton />
    <ModifyModal @close="showModifyModal = false" v-if="showModifyModal" :title="modifyTitle">
        <div class="mt-3" >
            <TextInput label="الترتيب" />
            <TextInput label="النص الاول" />
            <TextInput label="النص الثاني" />
            <TextInput label="الايقونة" />
            <PrimaryButton class="w-full my-2" >احفظ</PrimaryButton>
        </div>
    </ModifyModal>
</template>
<script setup>
const {$listen} = useNuxtApp();
let showModifyModal = ref(false);
let modifyTitle = ref('');
const settingsList = ref([
    { first: 'سجل بالطريقة المناسبة لك', second: 'أختر وسيلة التسجيل الأكثر ملائمة لك وكن على تواصل دائم' },
    { first: 'سجل بالطريقة المناسبة لك', second: 'أختر وسيلة التسجيل الأكثر ملائمة لك وكن على تواصل دائم' },
    { first: 'سجل بالطريقة المناسبة لك', second: 'أختر وسيلة التسجيل الأكثر ملائمة لك وكن على تواصل دائم' },
]);

$listen('table-modify-object', (data)=> {
    showModifyModal.value = true;
    modifyTitle.value = 'تعديل القائمة'
});
$listen('open_add_window', ()=> {showModifyModal.value = true; modifyTitle.value = "إنشاء قائمة جديدة";});

</script>