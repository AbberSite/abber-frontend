<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 sm:hidden">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
            </TransitionChild>

            <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full "
                enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform"
                leave-from="translate-y-0" leave-to="translate-y-full" as="template">
                <div class="fixed bottom-0 z-50 w-full  rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6">
                    <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button"
                        @click="$emit('close')"></button>
                    <div class="pb-4 pt-8 ">
                        <div class="flex items-center justify-between space-x-3 rtl:space-x-reverse">
                            <h3 class="mt-1.5 text-lg font-semibold">فلترة</h3>
                            <a @click.prevent="apply"
                                class="flex items-center rounded-md bg-gray-900 px-4 pb-2 pt-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800"
                                href="/dashbaordv2/transactions/">تطبيق</a>
                        </div>
                        <div class="max-h-[50vh] overflow-auto datepicker_mobile">

                            <div class="pt-7">
                                <h3 class="text-sm font-semibold">بين تاريخين</h3>
                                <div class="flex flex-col items-center pt-2 gap-2 w-full">
                                    <div class="w-full">
                                        <DatePicker placeholder="من" :max-date="new Date()" prevent-min-max-navigation
                                            v-model="date_start" model-type="yyyy-MM-dd" ref="datePicker" id="date"
                                            format="yyyy-MM-dd" select-text="اختيار" cancel-text="الغاء" />
                                        <InputError :message="errors.date_start" />
                                    </div>
                                    <svg class="w-6 h-6 text-gray-800 dark:text-white" title="إلى" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                        viewBox="0 0 24 24">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
                                    </svg>
                                    <div class="w-full">
                                        <DatePicker placeholder="إلى" :max-date="new Date()" prevent-min-max-navigation
                                            v-model="date_end" model-type="yyyy-MM-dd" ref="datePicker" id="date"
                                            format="yyyy-MM-dd" select-text="اختيار" cancel-text="الغاء" />
                                        <InputError :message="errors.date_end" />
                                    </div>
                                </div>
                            </div>
                            <div class="flex  pt-10 rtl:space-x-reverse flex-wrap">
                                <div>
                                    <h3 class="text-sm font-semibold">نوع العملية</h3>
                                    <div class="grid grid-rows-6 grid-flow-col gap-1">
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="paid"
                                                :value="null" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'1'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">سحب</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'2'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إرجاع</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'3'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">رسوم
                                                الخدمة</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'4'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">دفع
                                                الفاتورة</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'5'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">شحن الرصيد</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'6'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">باقة
                                                المعبر</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'7'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">تسجيل/تجديد
                                                النطاق</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'8'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إضافة
                                                بطاقة</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'9'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">عملية على
                                                الرصيد</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'10'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">إلغاء
                                                الطلب</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'11'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Cart
                                                checkout</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="paymentStatus" v-model="type" id="text"
                                                :value="'12'" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">Orders
                                                Package</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="pt-6">
                                    <h3 class="text-sm font-semibold">حالة الدفع</h3>
                                    <div class="space-y-3 pt-4">
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="success" v-model="success" id="all" :value="null" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium">الكل</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="success" v-model="success" id="paid" :value="true" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium">تم الدفع</label>
                                        </div>
                                        <div class="flex items-center">
                                            <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                                                type="radio" name="success" v-model="success" id="text"
                                                :value="false" />
                                            <label class="mt-1.5 ps-3 text-sm font-medium">فشل الدفع</label>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';
const { filters } = storeToRefs(useDashTransactionsStore())

import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
const { defineField, errors, validate } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            date_start: yup.string().required('هذا الحقل مطلوب'),
            date_end: yup.string().required('هذا الحقل مطلوب')
        })
    )
})

const datePicker = ref<DatePickerInstance>(null);
const [date_start] = defineField('date_start');
const [date_end] = defineField('date_end');

const watchDate = (field) => {
    watch(field, async (value) => {

        if (!(await validate()).valid) {
            if (errors.value.date_start && errors.value.date_end) {
                filters.value.date__gte = '';
                filters.value.date__lte = '';
            }
        };
        console.log(value);
        filters.value.date__gte = date_start.value;
        filters.value.date__lte = date_end.value;
    });
};
watchDate(date_start);
watchDate(date_end);


const success = ref(filters.value.success);
const type = ref(filters.value.type);

const emit = defineEmits(["close"])


function apply() {
    filters.value.success = success.value;
    filters.value.type = type.value;
    emit("close");
}
</script>

<style scoped></style>
