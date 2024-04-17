<template>
  <div class="w-full">
    <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
      <div class="w-full space-y-3">
        <label class="block text-sm font-semibold xs:text-base" for="type">نوع الخصم</label>
        <select class="form-control form-select h-[50px] appearance-none" name="select" id="type" v-model="offer.type"
          required>
          <option value="percentage">نسبة مئوية</option>
          <option value="fixed_amount">مبلغ ثابت</option>
        </select>
      </div>
      <div class="w-full space-y-3">
        <label class="block text-sm font-semibold xs:text-base" for="start-date" @click="datePicker?.openMemu()" >تاريخ بدأ الخصم</label>
        <DatePicker placeholder="yyyy-mm-dd" :min-date="new Date()" prevent-min-max-navigation
          v-model="start_date" model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
          cancel-text="الغاء" />
        <InputError :message="errors.start_date" />
        <!-- <input class="form-control h-[50px] appearance-none"
          :class="{ 'border-red-500 text-red-400': error?.type == 'start_date' }" type="date" name="date"
          id="start-date" dir="rtl" v-model="offer.start_date" required /> -->
      </div>
      <div class="w-full space-y-3">
        <label class="block text-sm font-semibold xs:text-base" for="end-date" @click="datePicker?.openMenu()" >تاريخ إنتهاء الخصم</label>
        <DatePicker placeholder="yyyy-mm-dd" :min-date="new Date()" prevent-min-max-navigation
          v-model="end_date" model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
          cancel-text="الغاء" />
        <InputError :message="errors.end_date" />
      </div>
    </div>
    <div class="w-full max-w-sm space-y-7 pt-8">
      <div class="flex items-center">
        <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="text"
          v-model="offer.text" />
        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text">خصم المحادثة النصية</label>
      </div>
      <template v-if="offer.text">
        <TextInput name="text_amount" type="number" v-model="text_amount" label="مبلغ الخصم"
          placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.text_amount" />
        <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type == 'fixed_amount' ?
          offer.after_discount_text - text_amount : afterDiscountComputed(offer.after_discount_text, text_amount) }}
          ر.س.</div>
      </template>
      <div class="flex items-center">
        <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="video"
          v-model="offer.video" />
        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video">خصم المحادثة الصوتية</label>
      </div>
      <template v-if="offer.video">
        <div class="w-full space-y-3">
          <TextInput name="video_amount" type="number" v-model="video_amount" label="مبلغ الخصم"
            placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.video_amount" />
          <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type == 'fixed_amount' ?
          offer.after_discount_video - video_amount : afterDiscountComputed(offer.after_discount_video,
            video_amount) }} ر.س.</div>
        </div>
      </template>
    </div>
    <div class="pt-8 sm:pt-14">
      <PrimaryButton @click="submit" type="submit" :loading="loading">
        <span class="mt-1.5">حفظ</span>
      </PrimaryButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import useNotification from '~/composables/useNotification';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import useProxy from '~/composables/useProxy';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
const datePicker = ref<DatePickerInstance>(null);
const { errors, defineField, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      text_amount: yup.number().min(1, 'هذا الحقل مطلوب').max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
      video_amount: yup.number().min(1, 'هذا الحقل مطلوب').max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
      start_date: yup.string().required("هذا الحقل مطلوب").default(getCurrentDate()).required('هذا الحقل مطلوب'),
      end_date: yup.string().required("هذا الحقل مطلوب").required('هذا الحقل مطلوب')
    })
  )
})

let offer = ref<{
  type: 'percentage' | 'fixed_amount';
  text: boolean;
  video: boolean;
  service: number;
  after_discount_text?: number;
  after_discount_video?: number;
  id?: number;
}>({
  type: 'percentage',
  text: false,
  video: false,
  service: 0,
  after_discount_text: 0,
  after_discount_video: 0
});
let loading = ref(false);

const { data: user } = useAuth();
const data = await useProxy(`/services/services/${user.value.username}/`);
const my_previos_offer = await useProxy(`/services/services/${data.seller.username}/offers/`);
const [text_amount] = defineField('text_amount');
const [video_amount] = defineField('video_amount');
const [start_date] = defineField('start_date');
const [end_date] = defineField('end_date');
if (my_previos_offer.count != 0) {
  const { id, type, start_date:offer_start_date, end_date:offer_end_date, text, video, text_amount: offer_text_amount, video_amount: offer_video_amount, service } = my_previos_offer.results[0]
  offer.value = {
    id: id,
    type: type,
    text: text,
    video: video,
    service: service
  }
  text_amount.value = offer_text_amount;
  video_amount.value = offer_video_amount;
  start_date.value = formatDateForCalender(offer_start_date);
  end_date.value = formatDateForCalender(offer_end_date);
}
offer.value.service = data.id;
offer.value.after_discount_text = data.service_prices.text_price;
offer.value.after_discount_video = data.service_prices.video_price;
const afterDiscountComputed = ((after_discount, amount) => {
  return after_discount - (after_discount *
    (amount / 100))
})
async function submit() {
  const validation = await validate();
  if (!validation.valid) return;
  loading.value = true;
  const body: {
    type: 'percentage' | 'fixed_amount';
    start_date: string | undefined;
    end_date: string | undefined;
    text_amount: number | undefined;
    video_amount: number | undefined;
    text: boolean;
    video: boolean;
    service: number;
    id?: number;
  } = { text_amount: text_amount.value, video_amount: video_amount.value, start_date: start_date.value, end_date: end_date.value, ...offer.value };
  delete body.after_discount_text;
  delete body.after_discount_video;
  try {
    if (my_previos_offer.count == 0) {
      await useProxy(`/services/services/${data.seller.username}/offers/`, {
        method: 'POST',
        body: body
      })
    } else {
      await useProxy(`/services/services/${data.seller.username}/offers/${body.id}`, {
        method: 'PUT',
        body: body
      })
    }
    useNotification({ type: 'success', content: 'لقد تمت اضافة الخصم بنجاح' })
    loading.value = false;
  } catch (error) {
    loading.value = false;
    useNotification({ type: 'danger', content: 'خطأ في المدخلات، تأكد من مدخلاتك' })
  }

}




function formatDateForCalender(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String(date.getDate() + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}


</script>

<style scoped></style>