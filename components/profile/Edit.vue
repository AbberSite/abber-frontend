<template>
    <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
        <div class="w-full space-y-3">
            <TextInput
                v-model="tempAccount.first_name" label="الإسم الكامل"
                placeholder="ادخل إسمك الكامل" ><template #append>
                    <div class="text-[13px] leading-loose text-gray-500">يفضل أن يكون إسمك الكامل باللعة العربية</div>
                </template></TextInput>
            <InputError v-for="message in errors.first_name" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <TextInput
                v-model="tempAccount.email"
                label="البريد الألكتروني"
                placeholder="ادخل عنوان بريدك الإلكتروني"
                autocomplete="email"
                required />
            <InputError v-for="message in errors.email" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <LazyPhoneInput v-model="tempAccount.phone" id="phone" mobile />

            <InputError v-for="message in errors.phone" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <TextInput
                v-model="tempAccount.profile.bank_account"
                label="رقم IBAN"
                placeholder="ادخل رقم IBAN"
                dir="ltr"
                required />
            <InputError v-for="message in errors.profile?.bank_account" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <CustomSelect
                v-model="tempAccount.profile.gender"
                :options="[{ value: 'Male', label: 'ذكر' }, { value: 'Female', label: 'أنثى' }]"
                label="الجنس"
            />
            <InputError v-for="message in errors.profile?.gender" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <DashboardDatePickerInput
                v-model:modelDate="tempAccount.profile.birthday"
                label="تاريخ الميلاد"
                placeholder="mm/dd/yyyy"
                :max-date="new Date()"
                prevent-min-max-navigation/>
            <InputError v-for="message in errors.profile?.birthday" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <CustomSelect v-model="tempAccount.profile.maritalStatus"
                :options="[{
                    value: 'single',
                    label: 'أعزب'
                }, {
                    value: 'married',
                    label: 'متزوج/ه'
                }, {
                    value: 'divorced',
                    label: 'مطلق/ه'
                }, {
                    value: 'widowed',
                    label: 'ارمل/ه'
                }]"
                label="الحالة الإجتماعية" />
            <InputError v-for="message in errors.profile?.maritalStatus" :message="message" />
        </div>
        <div class="w-full space-y-3">
            <TextInput v-model="tempAccount.profile.profession"
                label="المهنة"
                placeholder="ادخل مهنتك"
                dir="rtl"
                required />
            <InputError v-for="message in errors.profile?.profession" :message="message" />
        </div>
    </div>
</template>

<script setup lang="ts">
import * as yup from 'yup';
const { data } = useAuth();
const { tempAccount, errors } = storeToRefs(useAccountStore());

// Define yup validation schema
const validationSchema = yup.object().shape({
  first_name: yup.string().required('الإسم الكامل مطلوب').min(3, 'الإسم يجب أن يكون أطول من 3 أحرف'),
  email: yup.string().required('البريد الإلكتروني مطلوب').email('البريد الإلكتروني غير صالح'),
  phone: yup
    .string()
    .required('رقم الهاتف مطلوب')
    .matches(/^\+?\d+$/, 'رقم الهاتف يجب أن يحتوي على أرقام فقط ويمكن أن يبدأ بـ "+"'),
  profile: yup.object().shape({
    bank_account: yup
      .string()
      .required('رقم IBAN مطلوب')
      .matches(/^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/, 'رقم IBAN غير صالح'),
    gender: yup.string().required('الجنس مطلوب').oneOf(['Male', 'Female'], 'الجنس غير صالح'),
    birthday: yup.date().required('تاريخ الميلاد مطلوب').max(new Date(), 'تاريخ الميلاد يجب أن يكون في الماضي'),
    maritalStatus: yup.string().required('الحالة الإجتماعية مطلوبة').oneOf(['single', 'married', 'divorced', 'widowed'], 'الحالة الإجتماعية غير صالحة'),
    profession: yup.string().required('المهنة مطلوبة').min(2, 'المهنة يجب أن تكون أطول من حرفين')
  })
});

function validateInputs() {
  errors.value = {}; // Reset errors
  validationSchema
    .validate(tempAccount.value, { abortEarly: false })
    .catch((validationErrors) => {
      validationErrors.inner.forEach((error: yup.ValidationError) => {
        const path = error.path?.split('.');
        if (path?.length === 2) {
          errors.value.profile = errors.value.profile || {};
          errors.value.profile[path[1]] = [error.message];
        } else {
          errors.value[path![0]] = [error.message];
        }
      });
    });
}

function syncData() {
  tempAccount.value.first_name = data.value.first_name;
  tempAccount.value.image_url = data.value.image_url;
  tempAccount.value.email = data.value.email;
  tempAccount.value.phone = data.value.phone;
  tempAccount.value.profile.bank_account = data.value.profile.bank_account ?? '';
  tempAccount.value.profile.gender = data.value.profile.gender ?? '';
  tempAccount.value.profile.birthday = data.value.profile.birthday ?? '';
  tempAccount.value.profile.maritalStatus = data.value.profile.marital_status ?? '';
  tempAccount.value.profile.profession = data.value.profile.profession ?? '';
}

onMounted(() => {
  errors.value = {};
  syncData();
  watch(tempAccount, (newValue) => {
    validateInputs();
  }, { deep: true, immediate: true });
});

onUnmounted(() => {
  tempAccount.value = {
    image_url: null,
    first_name: '',
    email: '',
    phone: '',
    profile: {
      bank_account: '',
      gender: '',
      birthday: '',
      maritalStatus: '',
      profession: ''
    }
  };
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
