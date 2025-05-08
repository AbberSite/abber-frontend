<template>
  <div class="w-full space-y-3">
    <!-- <label class="block text-sm font-medium xs:text-base" for="tel">{{ sms ? 'رقم الجوال' : mobile ? 'رقم الهاتف' : 'رقم الواتساب' }}</label> -->

    <input ref="phoneInput" class="form-control h-[50px] appearance-none" :type="isApple ? 'text' : 'number'" pattern="\d*" name="phone" id="tel"
      :placeholder="placeholder ?? '12345XXXX'" :maxlength="countryPhoneLength + 1" :minlength="countryPhoneLength" v-model.number="phone"
      :class="[(validationError !== '' || error) && 'form-invalid']" autocomplete="tel" dir="ltr" />
    <InputError :message="error" v-if="!validationError && hideErrorEmpty" />
    <InputError :message="validationError" />

  </div>
</template>

<script setup lang="ts">
import 'intl-tel-input/build/css/intlTelInput.css';
import intlTelInput from 'intl-tel-input';

const phoneInput = ref<Element>();
const {isApple} = useDevice();
const props = defineProps<{
  modelValue?: string;
  error?: string;
  sms?: boolean;
  placeholder?: string;
  mobile?: boolean;
}>();
let hideErrorEmpty = ref(true);
const phone = ref('');
const countryPhoneLength = ref(9)
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
let countryCode;
if(props.sms){
  countryCode = 'SA';
} else {
  countryCode = await getCountry();
}
const errorMap = [
  'أدخل رقم هاتف صالح (مثال 7835196169).',
  'رمز الدولة غير صحيح.',
  'الرقم قصير جدا.',
  'الرقم طويل جدا.',
  'أدخل رقم هاتف صالح (مثال 7835196169).',
  ''
];

const emits = defineEmits(['update:modelValue', 'update:valid']);

const validationError = ref('');

onMounted(() => {
  const iti = intlTelInput(phoneInput.value as Element, {
    initialCountry: countryCode,
    allowDropdown: props.sms ? false : true,
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

  (phoneInput.value as HTMLInputElement)?.addEventListener('countrychange', () => {
    let ISO2CountryCode = iti.selectedCountryData.iso2.toUpperCase();
    countryPhoneLength.value = phoneLength[ISO2CountryCode];
  });

  watch(phone, (value) => {
    hideErrorEmpty.value = false;
    phone.value = phone.value.toString().replace(/\D/g, '');

    validationError.value = '';

    const errorCode = iti.getValidationError();

    if (errorCode == 0) {
      validationError.value = '';

      emits('update:valid', true);
    } else {
      validationError.value = errorMap[errorCode];
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

.iti__country-list {
  padding: 11px 6px !important;
}

.iti__country-name,
.iti__dial-code {
  margin-top: 6px;
  display: inline-block;
}
</style>
