<template>
    <DashboardTablesTable :head-items="{ message: 'رسالة', sender: 'المرسل', type: 'نوع التنبيه', date: 'التاريخ' }" :body-items="data" addButton />
    <ClientOnly>
        <ModifyModal v-if="showModal" @close="showModal = false" title="إرسال تنبيه جديد">
            <div class="flex flex-col gap-2 mt-2">
                <TextInput label="الرسالة" type="textarea"/>
                <!-- i need custom selector here in the future -->
                <CustomSelect multi label="المستخدمين الموجه لهم التنبيه" :options="[{value: 'طه غازي'}, {value: 'الشيخ المختار'}, {value: 'طه غازي'}]" />
                <div class="my-1">
                    <h3 class="font-medium"  >طريقة الإرسال</h3>
                    <div  class="grid grid-cols-2 gap-2" >
                        <Checkbox label="ارسال كإيميل" />
                        <Checkbox label="ارسال sms" />
                        <Checkbox label="ارسال واتساب" />
                        <Checkbox label="ارسال كإشعار" />
                    </div>
                </div>
                <div class="my-1">
                    <h3 class="font-medium"  >ارسال لكل من </h3>
                    <div  class="grid grid-cols-2 gap-2" >
                        <Checkbox label="المستخدمين" />
                        <Checkbox label="المعبرين" />
                        <Checkbox label="المدراء" />
                    </div>
                </div>
                <PrimaryButton class="w-full my-2">ارسال</PrimaryButton>
            </div>
        </ModifyModal>
    </ClientOnly>
</template>

<script setup lang="ts">
import CustomSelect from '~/components/shared/CustomSelect.vue';

const { $listen } = useNuxtApp();
let showModal = ref(false);
const data = ref([
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
    { message: 'هذا نص اختباري فقط', sender: 'admin', type: 'اشعار', date: '2024-12-12' },
]);
$listen('open_add_window', ()=> showModal.value = true);
</script>