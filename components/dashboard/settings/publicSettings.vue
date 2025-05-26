<template>
    <DashboardTablesTable :head-items="{caption_1: 'النص الاول', caption_2: 'النص الثاني'}" :body-items="partitions" :actions="{modify: true, remove: true}" addButton :loading="loading" />
    <ModifyModal @close="showModifyModal = false" v-if="showModifyModal" :title="title">
        <div class="mt-3" >
            <TextInput label="الترتيب" v-model="partitionData.index" />
            <TextInput label="النص الاول" v-model="partitionData.caption_1" />
            <TextInput label="النص الثاني" v-model="partitionData.caption_2" />
            <TextInput label="الايقونة" type="textarea" v-model="partitionData.svg_icon" dir="ltr" />
            <PrimaryButton class="w-full my-2" :loading="loading" @click="updateSettingsPartition" >احفظ</PrimaryButton>
        </div>
    </ModifyModal>
    <ModifyModal @close="showCreateModal = false" v-if="showCreateModal" :title="title">
        <div class="mt-3" >
            <TextInput label="الترتيب" v-model="partitionData.index" />
            <TextInput label="النص الاول" v-model="partitionData.caption_1" />
            <TextInput label="النص الثاني" v-model="partitionData.caption_2" />
            <TextInput label="الايقونة" type="textarea" v-model="partitionData.svg_icon" dir="ltr" />
            <PrimaryButton class="w-full my-2" :loading="loading" @click="createSettingsPartition" >إنشاء</PrimaryButton>
        </div>
    </ModifyModal>
    <ConfirmDialog v-if="showDeleteConfirm" @close="cancelDelete" @continue="confirmDelete" title="تأكيد الحذف"
        descritpion="هل أنت متأكد أنك تريد حذف هذه القائمة؟ لا يمكن التراجع عن هذا الإجراء." />
</template>
<script setup lang="ts">
import { useDashboardSettingsStore } from '~/stores/dashboard/dashboardSettings';
const {$listen} = useNuxtApp();
const { partitions, loading, partitionData, showCreateModal, showModifyModal, title, showDeleteConfirm } = storeToRefs(useDashboardSettingsStore());
const { getSettings, getSettingsPartitions, createSettingsPartition, removeSettingsPartition, updateSettingsPartition } = useDashboardSettingsStore();
const deleteId = ref<number|null>(null);

$listen('table-modify-object', (data)=> {
    partitionData.value = data;
    showModifyModal.value = true;
    title.value = 'تعديل القائمة'
});
$listen('open_add_window', ()=> {
    resetPartitionData();
    showCreateModal.value = true; 
    title.value = "إنشاء قائمة جديدة";
});
// Listen for remove event
$listen('table-remove-object', (data) => {
    deleteId.value = data.id;
    showDeleteConfirm.value = true;
});

function confirmDelete() {
    if (deleteId.value !== null) {
        removeSettingsPartition(deleteId.value);
    }
    showDeleteConfirm.value = false;
    deleteId.value = null;
}
function cancelDelete() {
    showDeleteConfirm.value = false;
    deleteId.value = null;
}

function resetPartitionData() {
    partitionData.value = {
        index: '',
        caption_1: '',
        caption_2: '',
        svg_icon: ''
    };
}
onMounted(() => {
    getSettings();
    getSettingsPartitions();
});
</script>