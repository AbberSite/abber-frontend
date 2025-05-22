<template>
    <SkeletonsUserDetails v-if="loading"/>
    <div v-else>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-if="edit" >
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6" v-else>
            <div>
                <!-- Username and Email -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">إسم المستخدم</span>
                    <span class="text-gray-900">{{ userData.username || '-' }}</span>
                </div>
                <!-- Name and Phone -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">الاسم الكامل</span>
                    <span class="text-gray-900">{{ userData.first_name || '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">البريد الالكتروني</span>
                    <span class="text-gray-900">{{ userData.email || '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">الجوال</span>
                    <span class="text-gray-900">{{ userData.phone || '-' }}</span>
                </div>
               <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">رقم IBAN</span>
                    <span class="text-gray-900">{{ userData.profile?.bank_account || '-' }}</span>
                </div>
                
                <!-- User type and Available balance -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">معرف الفيسبوك</span>
                    <span class="text-gray-900">{{ userData.facebook || '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">معرف إنستجرام</span>
                    <span class="text-gray-900">{{ userWallet.instagram ?? '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">معرف تويتر</span>
                    <span class="text-gray-900">{{ userWallet.twitter ?? '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">معرف وزارة التجارة</span>
                    <span class="text-gray-900">{{ userWallet.twitter ?? '-' }}</span>
                </div>
            </div>
            <div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">الضريبة</span>
                    <span class="text-gray-900">{{ userData.tax || '-' }}</span>
                </div>
                <!-- User type and Available balance -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">ارباح المعبر</span>
                    <span class="text-gray-900">{{ userData.money || '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">الرقم السجل التجاري</span>
                    <span class="text-gray-900">{{ userWallet.numb ?? '-' }}</span>
                </div>
                <!-- Withdrawal and Suspended balance -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">رقم السجل الضريبي</span>
                    <span class="text-gray-900">{{ userWallet.tax ?? '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">باقة الحساب</span>
                    <span class="text-gray-900">{{ userWallet.lfdsj ?? '-' }}</span>
                </div>
                <!-- Marital status and Profession -->
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">صورة السجل التجاري</span>
                    <span class="text-gray-900">{{ userData.photo || '-' }}</span>
                </div>
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">صورة السجل الضريبي</span>
                    <span class="text-gray-900">{{ userData.pho || '-' }}</span>
                </div>
                <!-- IBAN and Gender -->
                
                <div class="flex justify-between items-center border-b py-4">
                    <span class="font-medium text-gray-600">شعار المعبر</span>
                    <span class="text-gray-900">{{ userData.photo || '-' }}</span>
                </div>
            </div>
        </div>
        <!-- <Checkbox v-model="userData.is_active" label="نشط" @update:modelValue="changeActive" class="mt-4" /> -->
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton :loading="updateLoading" v-if="edit" @click="edit = true">حفظ</PrimaryButton>
            <PrimaryButton :loading="updateLoading" v-if="edit" @click="edit = false">إغلاق</PrimaryButton>
            <PrimaryButton :loading="updateLoading" v-else @click="edit = true">التعديل</PrimaryButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { userData, loading, updateLoading, userWallet, edit } = storeToRefs(useDashboardUsersStore());
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

