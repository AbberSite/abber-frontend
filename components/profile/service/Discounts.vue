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
        <label class="block text-sm font-semibold xs:text-base" for="start-date">تأريخ بدأ الخصم</label>
        <input class="form-control h-[50px] appearance-none"
          :class="{ 'border-red-500 text-red-400': error?.type == 'start_date' }" type="date" name="date" id="start-date"
          dir="rtl" v-model="offer.start_date" required />
        <span v-if="error?.type == 'start_date'" class="text-red-500">{{ error.message }}</span>
      </div>
      <div class="w-full space-y-3">
        <label class="block text-sm font-semibold xs:text-base" for="end-date">تأريخ إنتهاء الخصم</label>
        <input class="form-control h-[50px] appearance-none"
          :class="{ 'border-red-500 text-red-400': error?.type == 'end_date' }" type="date" name="date" id="end-date"
          dir="rtl" v-model="offer.end_date" required />
        <span v-if="error?.type == 'end_date'" class="text-red-500">{{ error.message }}</span>
      </div>
    </div>
    <div class="w-full max-w-sm space-y-7 pt-8">
      <div class="flex items-center">
        <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="text"
          v-model="offer.text" />
        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text">خصم المحادثة النصية</label>
      </div>
      <template v-if="offer.text">
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base" for="amount">مبلغ الخصم</label>
          <input class="form-control h-[50px] appearance-none"
            :class="{ 'border-red-500 text-red-400': error?.type == 'text_amout' }" type="number" name="number"
            id="amount" placeholder="ادخل مبلغ الخصم بالريال السعودي" dir="rtl" v-model="offer.text_amount" required />
          <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type == 'fixed_amount' ?
          offer.after_discount_text - offer.text_amount : offer.after_discount_text - (offer.after_discount_text *
            (offer.text_amount / 100)) }} ر.س.</div>
          <span v-if="error?.type == 'text_amount'" class="text-red-500">{{ error.message }}</span>
        </div>
      </template>
      <div class="flex items-center">
        <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="video"
          v-model="offer.video" />
        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video">خصم المحادثة الصوتية</label>
      </div>
      <template v-if="offer.video">
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base" for="video-amount">مبلغ الخصم</label>
          <input class="form-control h-[50px] appearance-none" type="number" name="number" id="video-amount"
            placeholder="ادخل مبلغ الخصم بالريال السعودي" dir="rtl" v-model="offer.video_amount"
            :class="{ 'border-red-500 text-red-400': error?.type == 'text_amout' }" required />
          <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type == 'fixed_amount' ?
          offer.after_discount_video - offer.video_amount : offer.after_discount_video - (offer.after_discount_video *
            (offer.video_amount / 100)) }} ر.س.</div>
          <span v-if="error?.type == 'video_amount'" class="text-red-500">{{ error.message }}</span>
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
import useFormattedDate from '~/composables/useFormattedDate';
import useNotification from '~/composables/useNotification';
import useProxy from '~/composables/useProxy';

let offer = ref<{
  type: 'percentage' | 'fixed_amount';
  start_date: string | null;
  end_date: string | null;
  text: boolean;
  video: boolean;
  text_amount: number;
  video_amount: number;
  service: number;
  after_discount_text?: number;
  after_discount_video?: number;
  id?: number;
}>({
  type: 'percentage',
  start_date: null,
  end_date: null,
  text: false,
  video: false,
  text_amount: 1,
  video_amount: 1,
  service: 0,
  after_discount_text: 0,
  after_discount_video: 0
});
let loading = ref(false);
let error = ref<{
  type: string;
  message: string;
} | undefined>(undefined);
const { data: user } = useAuth();
const data = await useProxy(`/services/services/${user.value.username}/`);
const my_previos_offer = await useProxy(`/services/services/${data.seller.username}/offers/`);
if (my_previos_offer.count != 0) {
  offer.value = my_previos_offer.results[0]
  offer.value.start_date = formatDateForCalender(offer.value.start_date);
  offer.value.end_date = formatDateForCalender(offer.value.end_date);
}
offer.value.service = data.id;
offer.value.after_discount_text = data.service_prices.text_price;
offer.value.after_discount_video = data.service_prices.video_price;
async function submit() {
  validation();
  if (error.value != undefined) return;
  loading.value = true;
  const body: {
    type: 'percentage' | 'fixed_amount';
    start_date: string | null;
    end_date: string | null;
    text: boolean;
    video: boolean;
    text_amount: number;
    video_amount: number;
    service: number;
    id?: number;
  } = offer.value;
  delete body.after_discount_text;
  delete body.after_discount_video;
  try {
    if(my_previos_offer.count == 0){
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


function validation() {
  if (offer.value.start_date == null) {
    error.value = {
      type: 'start_date',
      message: 'هذا الحقل مطلوب'
    }
  } else if (offer.value.end_date == null) {
    error.value = {
      type: 'end_date',
      message: 'هذا الحقل مطلوب'
    }
  } else if (offer.value.text_amount < 1) {
    error.value = {
      type: 'text_amount',
      message: 'يجب ان الخصم اكبر من 1 ر.س'
    }
  } else if (offer.value.video_amount < 1) {
    error.value = {
      type: 'video_amount',
      message: 'يجب ان يكون الخصم اكبر من 1 ر.س'
    }
  } else {
    error.value = undefined;
  }
};

function formatDateForCalender(date) {
  date = new Date(date);
  const year = date.getFullYear();
  const month = String((date.getMonth() + 1)).padStart(2, '0');
  const day = String(date.getDate() + 1).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


</script>

<style scoped></style>