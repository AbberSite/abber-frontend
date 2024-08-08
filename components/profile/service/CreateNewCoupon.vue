<template>
  <Modal title="إضافة كوبون" @close="emit('close')">
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-5">
        <div class="w-full space-y-3">
          <TextInput id="code" type="text" v-model="code" label="رمز الخصم" placeholder="ادخل رمز الخصم" :error="errors.code"/>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base">نوع الخصم</label>
          <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="coupon.type" required>
            <option value="percentage">نسبة مئوية</option>
            <option value="fixed_amount" >مبلغ ثابت</option>
          </select>
        </div>
        <div class="w-full space-y-3">
          <TextInput id="amount" type="number" v-model="amount" label="مبلغ الخصم" placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.amount"/>

        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base">تأريخ بدأ الكوبون</label>
          <DatePicker id="start_date" placeholder="yyyy-mm-dd" :min-date="new Date()" prevent-min-max-navigation
          v-model="start_date" model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
          cancel-text="الغاء" />
        <InputError :message="errors.start_date" />
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base">تأريخ إنتهاء الكوبون</label>
          <DatePicker id="end_date" placeholder="yyyy-mm-dd" :min-date="new Date()" prevent-min-max-navigation
          v-model="end_date" model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
          cancel-text="الغاء" />
        <InputError :message="errors.end_date" />
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base">المنصات المتاحة</label>
          <select class="form-control block max-h-[300px] min-h-[50px] appearance-none space-y-2 py-4 lg:min-h-[200px]" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'active_platforms'}"
            id="active_platforms" v-model="coupon.active_platforms" multiple required>
            <option value="website" >الموقع</option>
            <option value="android" >تطبيق الاندرويد</option>
            <option value="ios" >تطبيق الايفون</option>
          </select>
          <span class="text-red-500" v-if="error?.id == 'active_platforms'">{{ error.message  }}</span>
        </div>
        <div class="flex items-center">
          <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
            v-model="coupon.multi_use" >
          <label class="mt-1.5 ps-3 text-sm font-medium xs:text-base">إستخدام أكثر من مرة</label>
        </div>
      </fieldset>
    </div>
    <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
      <PrimaryButton
        class="flex h-[50px] w-full items-center justify-center rounded-md " :loading="loading" @click="submit()"
        type="submit"><span>حفظ</span></PrimaryButton>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
const datePicker = ref<DatePickerInstance>(null);
const { errors, defineField, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      code: yup.string().min(3, 'هذا الحقل يجب ان يحتوي 3 احرف على الاقل').required('هذا الحقل مطلوب'),
      start_date: yup.string().required("هذا الحقل مطلوب").default(getCurrentDate()).required('هذا الحقل مطلوب'),
      end_date: yup.string().required("هذا الحقل مطلوب").required('هذا الحقل مطلوب'),
      amount: yup.number().min(1, 'يجب ان يكون هذا الحقل رقم صحيح').required('هذا الحقل مطلوب')
    })
  )
})
const emit = defineEmits(['close', 'refreshCoupons']);
let loading = ref(false);
const [code] = defineField('code');
const [start_date] = defineField('start_date');
const [end_date] = defineField('end_date');
const [amount] = defineField('amount');
const coupon = ref<{
  type: 'percentage' | 'fixed_amount';
  active_platforms: [] | string;
  multi_use: boolean;
}>({
  type: 'percentage',
  active_platforms: [],
  multi_use: false
});

async function submit(){
  const validation = await validate();
  if(!validation.valid ) {
    let input_error = document.getElementById(Object.keys(errors.value)[0]);
    input_error?.scrollIntoView({behavior: 'smooth', block: 'center'});
    input_error?.focus();
    return;
  }
  loading.value = true
  coupon.value.active_platforms = reWriteActivePlatforms(coupon.value.active_platforms);
  coupon.value.code = code.value;
  coupon.value.amount = amount.value;
  coupon.value.start_date = start_date.value;
  coupon.value.end_date = end_date.value;
  const res = await useDirectApi('/coupons/coupons/', {
    method: 'POST',
    body: coupon.value
  })
  if(res){
    loading.value = false;
    useNotification({type: 'success', content: 'لقد انشاءت الكوبون بنجاح'});
    emit('close');
    emit('refreshCoupons');
  }
};


function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function reWriteActivePlatforms(active_platforms: []){
  let stringArray:string = ""; 
  for(const platform of active_platforms){
    stringArray += `'${platform}',`
  }
  return `[${stringArray}]`;
}
</script>

<style></style>