<template>
    <SkeletonsUserDetails v-if="loading"/>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <TextInput v-model="userData.username" label="الإسم التجاري" />
                <TextInput v-model="userData.first_name" label="رقم السجل التجاري" />
                <TextInput v-model="userWallet.twitter" label="معرف تويتر" />
                <TextInput v-model="userData.facebook" label="معرف الفيسبوك" />
                <TextInput v-model="userData.email" label="الشعار" />
                <!-- Remove v-model from file input, add @change -->
                <TextInput label="صورة من سجل التجاري" type="file" @change="handleFileChange('commercialRegister', $event)" />
                <TextInput v-model="userData.profile.bank_account" label="الجنسية" />
                <TextInput v-model="userWallet.twitter" label="نبذة تعريفية" />
                <TextInput v-model="userWallet.twitter" label="خصم خاص على رسوم الموقع"><template #append><span class="text-gray-600 py-2">سيتم احتساب مبلغ ثابت, لاحتساب نسبة أضف %</span></template></TextInput>
            </div>
            <div>
                <TextInput v-model="userData.tax" label="العنوان" />
                <TextInput v-model="userData.money" label="رقم التسجيل الضريبي" />
                <TextInput v-model="userWallet.instagram" label="معرف إنستجرام" />
                <TextInput v-model="userWallet.numb" label="رابط وزارة التجارة الخاص بك" />
                <!-- Remove v-model from file input, add @change -->
                <TextInput type="file" label="صورة من السجل الضريبي" @change="handleFileChange('taxRegister', $event)" />
                <TextInput v-model="userWallet.lfdsj" label="رابط المعبر الخاص بك" />
                <!-- Remove v-model from file input, add @change -->
                <TextInput label="الهوية الوطنية" type="file" @change="handleFileChange('nationalId', $event)" />
                <Checkbox v-model="userData.is_activ" label="blog" @update:modelValue="changeActive" class="my-4" />
                <TextInput v-model="userData.photo" label="ساعات العمل" />
            </div>
        </div>
        <!-- <Checkbox v-model="userData.is_active" label="نشط" @update:modelValue="changeActive" class="mt-4" /> -->
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton :loading="updateLoading">حفظ</PrimaryButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { userData, loading, updateLoading, userWallet } = storeToRefs(useDashboardUsersStore());
const { updateActiveStatus, updateUserData } = useDashboardUsersStore();

const changeActive = async () => {
    await updateActiveStatus();
};
// onMounted(async () => {
//     setInterval(() => {
//         edit.value = !edit.value;
//     }, 5000);
// });

// Add file handler
function handleFileChange(field, event) {
    const file = event.target.files[0];
    if (!file) return;
    // You can store the file in a reactive object or process as needed
    // Example: userData[field] = file;
    // For demonstration, you might want to store in a separate object:
    // files[field] = file;
}
</script>
<style module>
/* No extra styles needed, grid and flex handled in template */
</style>

