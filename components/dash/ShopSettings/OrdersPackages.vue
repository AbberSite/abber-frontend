<template>
    <DashTablesTable :head-items="{ package: 'الباقة', price:'السعر', expressors: 'المعبرون', users: 'المستخدمين' }" :body-items="data" :actions="{ remove: true, modify: true }" addButton />

    <ClientOnly>
        <ModifyModal @close="showModal = false" v-if="showModal" :title="title" >
            <div class="flex flex-col gap-2 pt-4">
                <TextInput label="اسم التصنيف" />
                <TextInput type="textarea" label="الوصف" />
                <TextInput type="number" label="السعر قبل الخصم" />
                <TextInput type="number" label="السعر" />
                <TextInput type="number" label="عدد الطلبات" />
                <Checkbox label="نشط" />
                <Selector label="المعبرين" />
                <TextInput type="number" label="الترتيب" />
                <TextInput type="number" label="المدة بالايام" />
                <TextInput type="number" label="ارباح المعبر" />
                <PrimaryButton class="my-2 w-full">متابعة</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
const { $listen } = useNuxtApp();
let showModal = ref(false);
let title = ref('');
const data = ref([
    { package: 'برو', price: '100', expressors: 'كل', users: '1' },
    { package: 'اساسي', price: '1000', expressors: 'كل', users: '22' },
    { package: 'عادي', price: '10', expressors: 'كل', users: '105' }
]);
$listen('table-modify-object', (data)=> {showModal.value = true; title.value = "تعديل الباقة";});
$listen('open_add_window', ()=> {showModal.value = true; title.value = "إنشاء باقة جديدة"});
</script>