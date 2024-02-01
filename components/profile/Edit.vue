<template>
    <div class="grid w-full gap-x-8 gap-y-14 pt-16 sm:grid-cols-2 lg:grid-cols-3">
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="username">الإسم الكامل</label>
            <input
                class="form-control h-[50px] appearance-none"
                v-model="tempAccount.username"
                type="text"
                name="text"
                id="username"
                placeholder="ادخل إسمك الكامل"
                dir="rtl"
                required />
                <InputError v-for="message in errors.first_name" :message="message" />
            <div class="text-[13px] leading-loose text-gray-500">يفضل أن يكون إسمك الكامل باللعة العربية</div>
        </div>
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="email">البريد الألكتروني</label>
            <input
                class="form-control h-[50px]"
                v-model="tempAccount.email"
                type="email"
                name="email"
                id="email"
                value="abber@gmail.com"
                placeholder="ادخل عنوان بريدك الإلكتروني"
                autocomplete="email"
                required />
            <InputError v-for="message in errors.email" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <!-- <label class="block text-sm font-semibold xs:text-base" for="tel">رقم الهاتف</label> -->

            <PhoneInput v-model="tempAccount.phone" />

            <InputError v-for="message in errors.phone" :message="message" />

        </div>
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="iban">رقم IBAN</label>
            <input
                class="form-control h-[50px] appearance-none"
                v-model="tempAccount.profile.iban"
                type="text"
                name="text"
                id="iban"
                placeholder="ادخل رقم IBAN"
                dir="rtl"
                required />
            <InputError v-for="message in errors.profile?.bank_account" :message="message" />

        </div>
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="gender">الجنس</label>
            <select
                v-model="tempAccount.profile.gender"
                class="form-control form-select h-[50px] appearance-none"
                type="select"
                name="select"
                id="gender"
                required>
                <option value="Male" selected>ذكر</option>
                <option value="Female">أنثى</option>
            </select>
            <InputError v-for="message in errors.profile?.gender" :message="message" />

        </div>
        <div class="w-full space-y-3">
            <label class="text-sm font-semibold xs:text-base" for="date" @click="datePicker?.openMenu()">
                تأريخ الميلاد</label
            >

            <DatePicker
                placeholder="mm/dd/yyyy"
                :max-date="new Date()"
                prevent-min-max-navigation
                v-model="tempAccount.profile.birthdate"
                model-type="yyyy-MM-dd"
                ref="datePicker"
                id="date"
                format="yyyy-MM-dd"
                select-text="اختيار"
                cancel-text="الغاء" />

            <!-- <InputError :message="errors.dream_time" /> -->
            <InputError v-for="message in errors.profile?.birthday" :message="message" />

        </div>
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="select">الحالة الإجتماعة</label>
            <select
                class="form-control form-select h-[50px] appearance-none"
                type="select"
                v-model="tempAccount.profile.maritalStatus"
                name="select"
                id="select"
                required>
                <option value="single">أعزب</option>
                <option value="married">متزوج/ه</option>
                <option value="divorced">مطلق/ه</option>
                <option value="widowed">ارمل/ه</option>
            </select>
            <InputError v-for="message in errors.profile?.maritalStatus" :message="message" />

        </div>
        <div class="w-full space-y-3">
            <label class="block text-sm font-semibold xs:text-base" for="text">المهنة</label>
            <input
                v-model="tempAccount.profile.profession"
                class="form-control h-[50px] appearance-none"
                type="text"
                name="text"
                id="text"
                placeholder="ادخل مهنتك"
                dir="rtl"
                required />
            <InputError v-for="message in errors.profile?.profession" :message="message" />

        </div>
    </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';

const { data } = useAuth();

const { tempAccount, errors } = storeToRefs(useAccountStore());

const datePicker = ref<DatePickerInstance>(null);

function syncData() {
    tempAccount.value.username = data.value.first_name;
    tempAccount.value.email = data.value.email;
    tempAccount.value.phone = data.value.phone;
    tempAccount.value.profile.iban = data.value.profile.bank_account;
    tempAccount.value.profile.gender = data.value.profile.gender;
    tempAccount.value.profile.birthdate = data.value.profile.birthday;
    tempAccount.value.profile.maritalStatus = data.value.profile.marital_status;
    tempAccount.value.profile.profession = data.value.profile.profession;
}

onMounted(() => {
    errors.value = {}
    syncData();
});
</script>

<style>
:root {
    --dp-border-radius: 0.375rem;
    --dp-input-padding: 0.8rem 0.25rem;
    --dp-action-buttons-padding: 10px 10px;
}

.iti {
    width: 100%;
    direction: ltr;
}

.iti--allow-dropdown input {
    padding-left: 110px !important;
    padding-right: 16px !important;
}

.iti__selected-flag {
    padding: 0 12px 0 16px !important;
}

.iti--separate-dial-code .iti__selected-dial-code {
    margin-top: 6px;
}

.iti__country-list {
    padding: 11px 6px !important;
}

.iti__country-name,
.iti__dial-code {
    margin-top: 6px;
    display: inline-block;
}

.dp__theme_light {
    --dp-primary-color: rgb(17 24 39);
}

.dp__input::placeholder {
    @apply !text-gray-600 !transition-none;
}
.dp__input:focus {
    border: 2px solid;
}
</style>
