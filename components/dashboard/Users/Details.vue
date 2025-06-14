<template>
    <SkeletonsUserDetails v-if="loading"/>
    <div v-else>
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2 py-5">
            <div class="flex justify-between items-center">
                <p class="font-medium">تاريخ التسجيل</p>
                <h2>{{ useArabicFormattedDate(userData?.date_joined) }}</h2>
            </div>
            <div class="flex justify-between items-center">
                <p class="font-medium">أخر دخول</p>
                <h2>{{ useArabicFormattedDate(userData?.last_login) }}</h2>
            </div>
        </div>
        <div :class="$style.input_elements">
            <TextInput label="إسم المستخدم:" v-model:modelValue="userData.username"/>
            <TextInput label="البريد الالكتروني:" v-model="userData.email" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="الاسم:" v-model="userData.first_name" />
            <LazyPhoneInput mobile v-model="userData.phone" />
        </div>
        <div :class="$style.input_elements">
            <CustomSelect class="w-full" label="نوع العضوية" :options="[{ value: 'عميل', text: 'عميل' }, { value: 'معبر', text: 'معبر' }, { value: 'إدارة', text: 'إدارة' }]"
                v-model:modelValue="userData.user_type" defaultLabel="إختر" />
            <TextInput label="الرصيح المتاح:" v-model:model-value="userWallet.available_balance" disabled />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="الرصيد القابل للسحب:" v-model:model-value="userWallet.withdrawal_balance" disabled />
            <TextInput label="الرصيد المعلق:" v-model:model-value="userWallet.suspended_balance" disabled/>
        </div>
        <div :class="$style.input_elements">
             <CustomSelect class="w-full" label="الحالة الإجتماعية" :options="[{ value: 'single', text:'أعزب' }, { value: 'married', text: 'متزوج' }, { value: 'divorced', text: 'مطلق' }]" v-model:modelValue="userData.profile.marital_status" defaultLabel="إختر" />
            <TextInput label="الوظيفة:" v-model="userData.profile.profession" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="رقم IBAN:" v-model="userData.profile.bank_account" />
            <CustomSelect class="w-full" label="الجنس" :options="[{ value: 'Male', text:'ذكر' }, { value: 'Female', text: 'انثى' }]" v-model:modelValue="userData.profile.gender" defaultLabel="إختر" />
        </div>
        <div :class="$style.input_elements">
            <DashboardDatePickerInput label="تاريخ الميلاد" v-model:modelDate="userData.profile.birthday" />
            <CustomImageInput class="w-full" label="الصورة" v-model:modelValue="userData.image_url" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="رقم الـPIN:" v-model="userData.user_pin" />
        </div>

        <Checkbox v-model="userData.is_active" label="نشط" @update:modelValue="changeActive" />
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton :loading="updateLoading" @click="updateUserData">حفظ</PrimaryButton>
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
</script>
<style module>
.input_elements {
    @apply flex flex-col sm:flex-row justify-between items-start gap-x-5 my-2;
}
</style>

