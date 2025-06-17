<template>
  <Modal title="إضافة كوبون" @close="emit('close')">
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-5">
        <div class="w-full space-y-3">
          <TextInput id="code" type="text" v-model="code" label="رمز الخصم" placeholder="ادخل رمز الخصم" :error="errors.code" />
        </div>
        <CustomSelect
          v-model="coupon.type"
          :options="[
            { value: 'percentage', label: 'نسبة مئوية' },
            { value: 'fixed_amount', label: 'مبلغ ثابت' }
          ]"
          label="نوع الخصم"
          dialog
        />
        <div class="w-full space-y-3">
          <TextInput id="amount" type="number" v-model="amount" label="مبلغ الخصم" placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.amount" />
        </div>
        <div class="w-full space-y-3">
          <DashboardDatePickerInput
            v-model:modelDate="start_date"
            label="تاريخ بدأ الكوبون"
            :min-date="new Date()"
            no-max
          />
          <InputError :message="errors.start_date" />
        </div>
        <div class="w-full space-y-3">
          <DashboardDatePickerInput
            v-model:modelDate="end_date"
            label="تاريخ إنتهاء الكوبون"
            :min-date="start_date"
            no-max
          />
          <InputError :message="errors.end_date" />
        </div>
        <div class="w-full space-y-3">
          <CustomSelect
            id="active_platforms"
            :options="[
              { value: 'website', text: 'الموقع' },
              { value: 'android', text: 'تطبيق الاندرويد' },
              { value: 'ios', text: 'تطبيق الايفون' }
            ]"
            label="المنصات المتاحة"
            v-model:model-value="coupon.active_platforms"
            multi
            dialog
          />
          <span class="text-red-500" v-if="error?.id === 'active_platforms'">{{ error.message }}</span>
        </div>
        <div class="flex items-center">
          
          <!-- <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" v-model="coupon.multi_use" />
          <label class="mt-1.5 ps-3 text-sm font-medium xs:text-base">إستخدام أكثر من مرة</label> -->
        </div>
        <Checkbox
          v-model="coupon.multi_use"
          id="multi_use"
          label="إستخدام أكثر من مرة"
          class="mt-1.5 ps-3 text-sm font-medium xs:text-base"/>
      </fieldset>
    </div>
    <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
      <PrimaryButton class="flex h-[50px] w-full items-center justify-center rounded-md" :loading="loading" @click="submit" type="submit">
        <span>حفظ</span>
      </PrimaryButton>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import CustomSelect from '~/components/shared/CustomSelect.vue';

const { errors, defineField, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      code: yup.string().min(3, 'هذا الحقل يجب ان يحتوي 3 احرف على الاقل').required('هذا الحقل مطلوب'),
      start_date: yup.string().required('هذا الحقل مطلوب'),
      end_date: yup
        .string()
        .required('هذا الحقل مطلوب')
        .test('is-after-start', 'تاريخ الإنتهاء يجب أن يكون بعد تاريخ البداية', function (value) {
          return new Date(value!) > new Date(this.parent.start_date);
        }),
      amount: yup.number().min(1, 'يجب ان يكون هذا الحقل رقم صحيح').required('هذا الحقل مطلوب')
    })
  )
});

const emit = defineEmits(['close', 'refreshCoupons']);
let loading = ref(false);

const [code] = defineField('code');
const [start_date] = defineField('start_date');
const [end_date] = defineField('end_date');
const [amount] = defineField('amount');

const coupon = ref<{
  type: 'percentage' | 'fixed_amount';
  active_platforms: string[];
  multi_use: boolean;
}>({
  type: 'percentage',
  active_platforms: [],
  multi_use: false
});

async function submit() {
  const validation = await validate();
  if (!validation.valid) {
    const input_error = document.getElementById(Object.keys(errors.value)[0]);
    input_error?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    input_error?.focus();
    return;
  }

  loading.value = true;
  coupon.value.active_platforms = reWriteActivePlatforms(coupon.value.active_platforms);
  coupon.value.code = code.value;
  coupon.value.amount = amount.value;
  coupon.value.start_date = start_date.value;
  coupon.value.end_date = end_date.value;

  try {
    const res = await useDirectApi('/coupons/coupons/', {
      method: 'POST',
      body: coupon.value
    });
    if (res) {
      loading.value = false;
      useNotification({ type: 'success', content: 'لقد انشاءت الكوبون بنجاح' });

      // Clear form data
      resetForm();

      emit('close');
      emit('refreshCoupons');
    }
  } catch (error: any) {
    loading.value = false;
    if (error.response?.status === 400) {
      useNotification({ type: 'error', content: error.response.data.message });
    } else {
      useNotification({ type: 'error', content: 'حدث خطأ ما' });
    }
  }
  loading.value = false;
}

function reWriteActivePlatforms(active_platforms: string[]) {
  return active_platforms.map((platform) => `'${platform}'`).join(',');
}

function resetForm() {
  code.value = '';
  start_date.value = '';
  end_date.value = '';
  amount.value = null;
  coupon.value = {
    type: 'percentage',
    active_platforms: [],
    multi_use: false
  };
}
</script>

<style></style>