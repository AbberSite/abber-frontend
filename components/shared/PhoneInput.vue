<template>
    <div class="w-full space-y-3">
        <label class="block text-sm font-semibold xs:text-base" for="tel">رقم الهاتف</label>

        <input
            ref="phoneInput"
            class="form-control h-[50px] appearance-none"
            type="text"
            name="phone"
            id="tel"
            placeholder="7835196169"
            v-model="phone"
            :class="[error !== '' && 'form-invalid']"
            autocomplete="tel"
            dir="ltr"
            required />

        <div class="text-[13px] leading-loose text-red-600">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

const phoneInput = ref<Element>();

const props = defineProps<{
    modelValue?: string;
}>();

const phone = ref('');
async function getCountry() {
    try {
        const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
        const response = await fetch(url);
        const data = await response.json();
        return data.countryCode;
    } catch (error) {
        console.error(error);
        return 'sa';
    }
}

const countryCode = await getCountry();
const errorMap = [
    'أدخل رقم هاتف صالح (مثال 7835196169).',
    'رمز الدولة غير صحيح.',
    'الرقم قصير جدا.',
    'الرقم طويل جدا.',
    'أدخل رقم هاتف صالح (مثال 7835196169).',
    ''
];

const emits = defineEmits(['update:modelValue', 'update:valid']);

const error = ref('');

onMounted(() => {
    const iti = intlTelInput(phoneInput.value as Element, {
        initialCountry: countryCode,
        separateDialCode: true,
        nationalMode: true,
        utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
    });

    if (props.modelValue) {
        iti.setNumber(props.modelValue as string);
    }

    (phoneInput.value as HTMLInputElement)?.addEventListener('blur', () => {
        const errorCode = iti.getValidationError();
    });

    watch(phone, (value) => {
        phone.value = phone.value.replace(/\D/g, '');

        if (phone.value.length > 9) {
            phone.value = phone.value.slice(0, 9);
        }

        error.value = '';

        const errorCode = iti.getValidationError();

        if (errorCode == 0) {
            error.value = '';

            emits('update:valid', true);
        } else {
            error.value = errorMap[errorCode];
            emits('update:valid', false);
        }

        emits('update:modelValue', iti.getNumber());
    });
});
</script>

<style>
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
</style>
