<template>
    <div
        class="absolute top-[calc(100%+15px)] hidden sm:flex flex-col gap-2 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        v-cloak
        >
        <div>
            <h3 class="text-sm font-semibold">بين تاريخين</h3>
            <div class="flex flex-col items-center pt-2 gap-2 w-full">
                <div class="w-full">
                    <DatePicker placeholder="من" :max-date="new Date()"  prevent-min-max-navigation v-model="date_start"
                        model-type="yyyy-MM-dd" ref="datePicker" id="date" format="yyyy-MM-dd" select-text="اختيار"
                        cancel-text="الغاء" />
                    <InputError :message="errors.date_start" />
                </div>
                <svg class="w-6 h-6 text-gray-800 dark:text-white" title="إلى" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 19V5m0 14-4-4m4 4 4-4" />
                </svg>
                <div class="w-full">
                    <DatePicker placeholder="إلى" :max-date="new Date()" prevent-min-max-navigation v-model="date_end"
                        model-type="yyyy-MM-dd" ref="datePicker" id="date" format="yyyy-MM-dd" select-text="اختيار"
                        cancel-text="الغاء" />
                    <InputError :message="errors.date_end" />
                </div>
            </div>
        </div>
        <div class="flex justify-between mt-3">
            <div>
            <DashboardTransactionsFiltersTransactionSuccess/>
        </div>
        <div>
            <h3 class="text-sm font-semibold">نوع العملية</h3>
            <DashboardTransactionsFiltersTransactionType /> 
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';
const { filters } = storeToRefs(useDashTransactionsStore());
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
const { defineField, errors, validate } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            date_start: yup.string().required('هذا الحقل مطلوب').default(filters.value.date__gte),
            date_end: yup.string().required('هذا الحقل مطلوب').default(filters.value.date__lte)
        })
    )
})

const datePicker = ref<DatePickerInstance>(null);
const [date_start] = defineField('date_start');
const [date_end] = defineField('date_end');

const watchDate = (field)=> {
    watch(field, async (value)=> {
        if(!(await validate()).valid) {
            if(errors.value.date_start && errors.value.date_end){
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

</script>

<style scoped></style>
