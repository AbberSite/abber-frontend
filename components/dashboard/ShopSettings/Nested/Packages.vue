<template>
    <DashboardTablesTable :head-items="{package: 'الباقة', price: 'السعر', discount:'الخصم'}" :body-items="packages" :actions="{ modify: true, remove: true }" addButton/>
    <ClientOnly>
        <ModifyModal @close="showModal = false;" :title="title" v-if="showModal" >
            <div class="flex flex-col gap-2 pt-4" >
                <TextInput label="اسم الباقة" />
                <TextInput type="number" label="السعر الشهري" />
                <TextInput type="number" label="السعر السنوي" />
                <TextInput type="number" label="السعر الشهري بعد الخصم" />
                <TextInput type="number" label="السعر السنوي بعد الخصم" />
                <Selector  label="مميزات"  :options="[ {value: 'first', text: 'تقارير قياس الاداء الشاملة'}, {value: 'second', text: 'اضافة كوبونات تخفيض'}, {value: 'third', text: 'اضافة مقالات خاصة'}, {value: 'forth', text: 'اضافة بيانات التواصل الاجتماعي'} ]"/>
                <TextInput type="number" label="المستوى" />
                <Checkbox label="إضافة ال ض.ق.م" />
                <Checkbox label="إضافة ال ض.ق.م إلى رصيد المعبر" />
                <TextInput type="number" label="رسوم المشتري" >
                    <template #append>
                        <div class="text-gray-500 my-2"> سيتم احتساب مبلغ ثابت,لاحتساب نسبة أضف %</div>
                    </template>
                </TextInput>
                <TextInput type="number" label="رسوم المعبر" >
                    <template #append>
                        <div class="text-gray-500 my-2">سيتم احتساب مبلغ ثابت ,لاحتساب نسبة أضف %</div>
                    </template>
                </TextInput>
                <PrimaryButton class="w-full my-2">تطبيق</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
const { $listen } = useNuxtApp();
let showModal = ref(false);
let title = ref("تعديل الباقة")
const packages = ref([
    { package: 'برو', price:'1000 / 200', discount: '100 / 120' },
    { package: 'برو', price:'1000 / 200', discount: '100 / 120' },
    { package: 'برو', price:'1000 / 200', discount: '100 / 120' },
    { package: 'برو', price:'1000 / 200', discount: '100 / 120' }
]);
$listen('table-modify-object', (data:Object)=> {
    showModal.value = true;
    title.value = 'تعديل الباقة';
});
$listen('open_add_window', ()=> {showModal.value = true; title.value = "اضافة باقة جديدة";})
</script>