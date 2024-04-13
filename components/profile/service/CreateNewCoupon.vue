<template>
  <Modal title="إضافة كوبون" @close="emit('close')">
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-7">
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">الرمز</label>
          <input class="form-control h-[50px] appearance-none" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'code'}" type="text" name="text" placeholder="إدخل رمز الكوبون"
            dir="rtl" v-model="coupon.code" required />
            <span class="text-red-500" v-if="error?.id == 'code'">{{ error.message  }}</span>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">نوع الخصم</label>
          <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="coupon.type" required>
            <option value="percentage">نسبة مئوية</option>
            <option value="fixed_amount" >مبلغ ثابت</option>
          </select>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">مبلغ الخصم</label>
          <input class="form-control h-[50px] appearance-none" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'coupon'}" type="number" name="number"
            placeholder="ادخل مبلغ الخصم بالريال السعودي" dir="rtl" v-model="coupon.amount" required />
            <span class="text-red-500" v-if="error?.id == 'coupon'">{{ error.message  }}</span>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">تأريخ بدأ الكوبون</label>
          <input class="form-control h-[50px] appearance-none" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'start_date'}" type="date" name="date" dir="rtl" v-model="coupon.start_date" required />
          <span class="text-red-500" v-if="error?.id == 'start_date'">{{ error.message  }}</span>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">تأريخ إنتهاء الكوبون</label>
          <input class="form-control h-[50px] appearance-none" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'end_date'}" type="date" name="date" dir="rtl" v-model="coupon.end_date" required />
          <span class="text-red-500" v-if="error?.id == 'end_date'">{{ error.message  }}</span>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-semibold xs:text-base">المنصات المتاحة</label>
          <select class="form-control block max-h-[300px] min-h-[50px] appearance-none space-y-2 py-4 lg:min-h-[200px]" :class="{'border-red-500 placeholder:text-red-300': error?.id == 'active_platforms'}"
            name="multiple" v-model="coupon.active_platforms" multiple required>
            <option value="site" >الموقع</option>
            <option value="android" >تطبيق الاندرويد</option>
            <option value="ios" >تطبيق الايفون</option>
          </select>
          <span class="text-red-500" v-if="error?.id == 'active_platforms'">{{ error.message  }}</span>
        </div>
        <div class="flex items-center">
          <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
            v-model="coupon.multi_use" >
          <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base">إستخدام أكثر من مرة</label>
        </div>
      </fieldset>
    </div>
    <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
      <PrimaryButton
        class="flex h-[50px] w-full items-center justify-center rounded-md " @click="submit()"
        type="submit"><span class="mt-1.5">حفظ</span></PrimaryButton>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
const emit = defineEmits(['close', 'refreshCoupons']);
const coupon = ref<{
  code: string | '' | undefined | null;
  type: 'percentage' | 'fixed_amount';
  amount: number | undefined;
  start_date: string | null;
  end_date: string | null;
  active_platforms: [] | string;
  multi_use: boolean;
}>({
  code: null,
  type: 'percentage',
  amount: undefined,
  start_date: null,
  end_date: null,
  active_platforms: [],
  multi_use: false
});
let error = ref<{
  id: string;
  message: string;
} | undefined>(undefined);
async function submit(){
  validation()
  if(error.value != undefined ) return;

  coupon.value.active_platforms = coupon.value.active_platforms.toString();
  const res = await useProxy('/coupons/coupons/', {
    method: 'POST',
    body: coupon.value
  })
  if(res){
    useNotification({type: 'success', content: 'لقد انشاءت الكوبون بنجاح'});
    emit('close');
    emit('refreshCoupons');
  }
};


async function validation(){
  if(coupon.value.code == null || coupon.value.code.length <= 3){
    error.value = {
      id: 'code',
      message: 'هذا الحقل يجب ان لا يترك فارغا ولا يقل عن 3 احرف'
    }
  } else if(!coupon.value.amount){
    error.value = {
      id: 'coupon',
      message: 'هذا الحقل يجب ان لا يترك فارغا'
    }
  } else if(coupon.value.start_date == null){
    error.value = {
      id: 'start_date',
      message: 'هذا الحقل يجب ان لا يترك فارغا'
    }
  }
  
  else if(coupon.value.end_date == null){
    error.value = {
      id: 'end_date',
      message: 'هذا الحقل يجب ان لا يترك فارغا'
    }
  } else if(!coupon.value.active_platforms.length){
    error.value = {
      id: 'active_platforms',
      message: 'هذا الحقل يجب ان لا يترك فارغا'
    }
  } else {
    error.value = undefined;
  }
}

</script>

<style></style>