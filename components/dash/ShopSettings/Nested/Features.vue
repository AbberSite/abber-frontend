<template>
        <DashTablesTable :head-items="{name: 'الخاصية', active: 'نشط'}" :body-items="features" :actions="{ modify: true, remove: true }" addButton/>
        <ClientOnly>
        <ModifyModal @close="showModal = false;" :title="title" v-if="showModal" >
            <div class="flex flex-col gap-2 pt-4" >
                <TextInput label="اسم الخاصية" />
                <TextInput type="number" label="الترتيب" />
                <Selector  label="الخاصية"  :options="[ {value: 'first', text: 'تقارير قياس الاداء الشاملة'}, {value: 'second', text: 'اضافة كوبونات تخفيض'}, {value: 'third', text: 'اضافة مقالات خاصة'}, {value: 'forth', text: 'اضافة بيانات التواصل الاجتماعي'} ]"/>
                <Checkbox label="نشط" />
                <PrimaryButton class="w-full my-2">تطبيق</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
const { $listen } =  useNuxtApp();
let showModal = ref(false);
let title = ref('');
const features = ref([
    { name: 'إضافة اضافية', active: true},
    { name: 'اضافة خاصة بك', active: true},
    { name: 'برو', active: true},
    { name: 'برو', active: true}
]);
$listen('table-modify-object', (data: Object)=> {
    showModal.value = true;
    title.value = "تعديل الخاصية";
});
$listen('open_add_window', ()=> {showModal.value = true; title.value = "إنشاء خاصية جديدة";})
</script>