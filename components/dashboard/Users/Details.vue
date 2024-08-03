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
            <Selector label="نوع العضوية" :options="[{ value: 'عميل' }, { value: 'معبر' }, { value: 'إدارة' }]"
                :modelValue="userData.user_type" />
            <TextInput label="الرصيح المتاح:" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="الرصيد القابل للسحب:" />
            <TextInput label="الرصيد المعلق:" />
        </div>
        <div :class="$style.input_elements">
            <TextInput label="رقم IBAN:" v-model="userData.profile.bank_account" />
            <Selector label="الجنس" :options="[{ value: 'ذكر' }, { value: 'انثى' }]" v-model="userData.profile.gender" />
        </div>
        <div :class="$style.input_elements">
            <DashboardDatePickerInput label="تاريخ الميلاد" v-model="userData.profile.birthday" />
            <TextInput label="الصورة" :type="'file'"/>
        </div>

        <Checkbox v-model="userData.is_active" label="نشط" />
        <div class="flex items-center justify-between pt-6">
            <PrimaryButton >حفظ</PrimaryButton>
            <PrimaryButton >إضافة طلب</PrimaryButton>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';

const id = useRoute().params.id;
const { userData, loading } =  storeToRefs(useDashboardUsersStore());
</script>
<style module>
.input_elements {
    @apply flex flex-col sm:flex-row justify-between items-start gap-x-5 my-2;
}
</style>

