<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إدخال تفاصيل الحلم</title>
    </Head>
    <form method="POST" @submit.prevent="submit">
        <fieldset class="space-y-7">
            <div class="w-full space-y-3">
                <TextInput
                    name="dream_title"
                    id="dream_title"
                    type="text"
                    v-model="dream_title"
                    label="عنوان الحلم"
                    :error="errors.dream_title"
                    placeholder="إدخل عنوانا للحلم مثال: رؤية العقرب في المنام" />
            </div>
            <div class="w-full space-y-3">
                <label class="text-sm font-semibold xs:text-base" for="date" @click="datePicker?.openMenu()">
                    تاريخ الحلم
                </label>

                <DatePicker
                    placeholder="mm/dd/yyyy"
                    :max-date="new Date()"
                    prevent-min-max-navigation
                    v-model="dream_time"
                    model-type="yyyy-MM-dd"
                    ref="datePicker"
                    id="date"
                    format="yyyy-MM-dd"
                    select-text="اختيار"
                    cancel-text="الغاء" />

                <InputError :message="errors.dream_time" />

                <!-- <DatePicker date-picker />  -->
            </div>
            <div class="flex items-center">
                <input
                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                    v-model="client"
                    type="checkbox"
                    name="checkbox"
                    :error="errors.client"
                    id="checkbox"
                    x-model="checkedBox" />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="checkbox">هل الحلم لشخص اخر؟</label>
            </div>

            <div class="space-y-7" v-if="client">
                <div class="w-full space-y-3">
                    <label class="block text-sm font-semibold xs:text-base" for="sex">الجنس</label>
                    <select
                        v-model="gender"
                        class="form-control form-select h-[50px] appearance-none"
                        type="select"
                        :class="[errors.gender && 'form-invalid']"
                        name="select"
                        id="sex">
                        <option value="male" selected>ذكر</option>
                        <option value="female">أنثى</option>
                    </select>
                    <InputError :message="errors.gender" />
                </div>
                <div class="w-full space-y-3">
                    <TextInput
                        v-model="age"
                        name="age"
                        id="age"
                        :error="errors.age"
                        type="number"
                        placeholder="إدخل عمر الشخص الاخر"
                        label="العمر" />
                </div>
                <div class="w-full space-y-3">
                    <label class="block text-sm font-semibold xs:text-base" for="martial_status"
                        >الحالة الإجتماعية</label
                    >
                    <select
                        v-model="marital_status"
                        class="form-control form-select h-[50px] appearance-none"
                        :class="[errors.marital_status && 'form-invalid']"
                        type="select"
                        name="select"
                        id="martial_status">
                        <option value="single" selected>أعزب</option>
                        <option value="">متزوج/ه</option>
                        <option>مطلق/ه</option>
                        <option>ارمل/ه</option>
                    </select>
                    <InputError :message="errors.marital_status" />
                </div>
                <div class="w-full space-y-3">
                    <TextInput
                        v-model="profession"
                        :error="errors.profession"
                        name="profession"
                        id="profession"
                        placeholder="إدخل مهنة الشخص الاخر"
                        required
                        label="المهنة" />
                </div>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="textarea">وصف الحلم</label>
                <textarea
                    class="form-control block max-h-[300px] min-h-[200px] py-4"
                    name="textarea"
                    id="textarea"
                    rows="5"
                    :class="[errors.dream && 'form-invalid']"
                    placeholder="أوصف الحلم بالتفصيل"
                    v-model="dream"></textarea>
                <InputError :message="errors.dream" />
            </div>

            <div>
                <PrimaryButton class="w-full">متابعة</PrimaryButton>
            </div>
        </fieldset>
    </form>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
import type { OrderForm } from '~/types';
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
const { next, state } = useFormWizard<OrderForm>('order');
import type { DatePickerInstance } from '@vuepic/vue-datepicker';

const { defineField, errors, validate } = useForm({
    validationSchema: toTypedSchema(
        yup.object({
            dream_title: yup.string().required("هذا الحقل مطلوب").default(state.value.data?.dream_title),
            dream_time: yup.string().required("هذا الحقل مطلوب").default( state.value.data?.dream_time ?? getCurrentDate()),
            dream: yup.string().required("هذا الحقل مطلوب").default(state.value.data?.dream),
            client: yup.boolean().default(state.value.data?.client),

            age: yup
                .number()
                .when('client', {
                    is: true,
                    then: (schema) => schema.required("هذا الحقل مطلوب"),
                    otherwise: (schema) => schema.notRequired()
                })
                .default(state.value.data?.age),

            gender: yup
                .string()
                .default('male')
                .when('client', {
                    is: true,
                    then: (schema) =>
                        schema.oneOf(['male', 'female'], "هذا الحقل مطلوب").required("هذا الحقل مطلوب"),
                    otherwise: (schema) => schema.notRequired()
                })
                .default(state.value.data?.gender),

            marital_status: yup
                .string()
                .default('single')
                .when('client', {
                    is: true,
                    then: (schema) => schema.required("هذا الحقل مطلوب"),
                    otherwise: (schema) => schema.notRequired()
                })
                .default(state.value.data?.marital_status),

            profession: yup
                .string()
                .when('client', {
                    is: true,
                    then: (schema) => schema.required("هذا الحقل مطلوب"),
                    otherwise: (schema) => schema.notRequired()
                })
                .default(state.value.data?.profession)
        })
    )
});

const [dream_title] = defineField('dream_title');
const [dream_time] = defineField('dream_time');
const [dream] = defineField('dream');
const [client] = defineField('client');
const [age] = defineField('age');
const [gender] = defineField('gender', {});
const [marital_status] = defineField('marital_status');
const [profession] = defineField('profession');

const datePicker = ref<DatePickerInstance>(null);

async function submit() {
    if (!(await validate()).valid) return;

    next({
        nextStepId: 'service',
        data: {
            dream_title: dream_title.value,
            dream_time: dream_time.value,
            dream: dream.value,
            client: client.value,
            age: age.value,
            gender: gender.value,
            marital_status: marital_status.value,
            profession: profession.value
        }
    });
}


function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
</script>

<style>
:root {
    /*General*/
    --dp-border-radius: 0.375rem; /*Configurable border-radius*/
    --dp-input-padding: 0.8rem 0.25rem; /*Padding in the input*/
    --dp-action-buttons-padding: 10px 10px; /*Adjust padding for the action buttons in action row*/
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
