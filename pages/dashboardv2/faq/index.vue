<template>
    <DashboardTitle department="الدعم التقني" title="الأسئلة الشائعة" />
    <DashboardTablesTable :head-items="{question: 'سوأل', answer: 'إجابة'}" :body-items="questions" :actions="{modify: true, remove: true}" addButton />

    <ClientOnly>
        <ModifyModal v-if="showModal" @close="showModal = false;" :title="title">
            <div class="flex flex-col gap-2 mt-2">
                <TextInput label="السوأل"/>
                <TextInput label="الإجابة" type="textarea"/>
                <PrimaryButton class="w-full my-2">حفظ</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
const {$listen} = useNuxtApp();
let showModal = ref(false);
let title = ref('');
const questions = ref([
    { question: 'ماهي منصة عبر', answer: 'هي منصة عربية لتفسير و تعبير الأحلام و الرؤى تجمع عدد من المعبرين الموثوقين الذين لديهم العلم بالكتاب والسنة وبتعبير الرؤى' }, 
    { question: 'كيف يمكن اختيار المعبر المناسب', answer: 'يمكن زيارة صفحة المعبرين واختيار المعبر المناسب لك حسب الأكثر طلباً او الأكثر تقييماً' }
]);
$listen('table-modify-object', (data)=> {showModal.value = true; title.value = "تعديل السوأل";})
$listen('open_add_window', (data)=> {showModal.value = true; title.value = "إنشاء سوأل جديد";})
</script>