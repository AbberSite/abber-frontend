<template>
    <Modal title="انشاء خصم جديد" @close="$emit('close')">
        <div class="is-scroll overflow-y-auto px-6 py-3 flex flex-col gap-3" id="createNewDiscount">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="type">نوع الخصم</label>
                <select class="form-control form-select h-[50px] appearance-none" name="select" id="type"
                    v-model="offer.type" required>
                    <option value="percentage">نسبة مئوية</option>
                    <option value="fixed_amount">مبلغ ثابت</option>
                </select>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="start-date"
                    @click="datePicker?.openMemu()">تاريخ
                    بدأ الخصم</label>
                <DatePicker id="start_date" placeholder="yyyy-mm-dd" prevent-min-max-navigation v-model="start_date"
                    model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
                    cancel-text="الغاء" />
                <InputError :message="errors.start_date" />
                <!-- <input class="form-control h-[50px] appearance-none"
          :class="{ 'border-red-500 text-red-400': error?.type == 'start_date' }" type="date" name="date"
          id="start-date" dir="rtl" v-model="offer.start_date" required /> -->
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="end-date"
                    @click="datePicker?.openMenu()">تاريخ
                    إنتهاء الخصم</label>
                <DatePicker id="end_date" placeholder="yyyy-mm-dd" :min-date="new Date()" prevent-min-max-navigation
                    v-model="end_date" model-type="yyyy-MM-dd" ref="datePicker" format="yyyy-MM-dd" select-text="اختيار"
                    cancel-text="الغاء" />
                <InputError :message="errors.end_date" />
            </div>

            <div class="w-full max-w-sm space-y-7 pt-8">
                <div class="flex items-center">
                    <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        id="text" v-model="offer.text" />
                    <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text">خصم المحادثة النصية</label>
                </div>
                <template v-if="offer.text">
                    <TextInput id="text_amount" type="number" v-model="text_amount" label="مبلغ الخصم"
                        placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.text_amount" />
                    <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type ==
        'fixed_amount' ?
        current_text_price - text_amount : afterDiscountComputed(current_text_price,
            text_amount) }}
                        ر.س.</div>
                </template>
                <div class="flex items-center">
                    <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        id="video" v-model="offer.video" />
                    <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video">خصم المحادثة
                        الصوتية</label>
                </div>
                <template v-if="offer.video">
                    <div class="w-full space-y-3">
                        <TextInput id="video_amount" type="number" v-model="video_amount" label="مبلغ الخصم"
                            placeholder="ادخل مبلغ الخصم بالريال السعودي" :error="errors.video_amount" />
                        <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: {{ offer.type ==
        'fixed_amount' ?
        current_video_price - video_amount :
                            afterDiscountComputed(current_video_price,
                            video_amount) }} ر.س.</div>
                    </div>
                </template>
            </div>
            <div class="pt-8 sm:pt-14">
                <PrimaryButton @click="submit" type="submit" :loading="loading">
                    <span>حفظ</span>
                </PrimaryButton>
            </div>
        </div>
    </Modal>
</template>

<script setup lang="ts">
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
            text_amount: yup.number().min(1, 'هذا الحقل مطلوب').default(1).max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
            video_amount: yup.number().min(1, 'هذا الحقل مطلوب').default(1).max(100, 'هذا لحقل لايمكن ان يتجاوز 100').required('هذا الحقل مطلوب'),
            start_date: yup.string().required("هذا الحقل مطلوب").default(getCurrentDate()).required('هذا الحقل مطلوب'),
            end_date: yup.string().required("هذا الحقل مطلوب").required('هذا الحقل مطلوب')
        })
    )
})
const emit = defineEmits(['close', 'reload']);
let offer = ref<{
    type: 'percentage' | 'fixed_amount';
    text: boolean;
    video: boolean;
    service: number;
    id?: number;
}>({
    type: 'percentage',
    text: false,
    video: false,
    service: 0
});
let loading = ref(false);
const { data: user } = await useAuth();
const data = await useDirectApi(`/services/services/${user.value.username}/`);
const [text_amount] = defineField('text_amount');
const [video_amount] = defineField('video_amount');
const [start_date] = defineField('start_date');
const [end_date] = defineField('end_date');

offer.value.service = data.id;
const current_text_price = data.service_prices.text_price;
const current_video_price = data.service_prices.video_price;

const afterDiscountComputed = ((after_discount: number, amount: number) => {
    return after_discount - (after_discount *
        (amount / 100))
})
async function submit() {
    const validation = await validate();
    if (!validation.valid) {
        let element = document.getElementById(Object.keys(errors.value)[0]);
        element?.scrollIntoView({behavior: 'smooth', block: 'center'});
        element?.focus();
        return;
    }
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
    try {
        await useDirectApi(`/services/services/${data.seller.username}/offers/`, {
            method: 'POST',
            body: body
        })
        useNotification({ type: 'success', content: 'لقد تمت اضافة الخصم بنجاح' });
        emit('reload');
        emit('close');
        offer.value = {
            type: 'percentage',
            text: false,
            video: false,
            service: 0
        }
        loading.value = false;
    } catch (error) {
        loading.value = false;
        useNotification({ type: 'danger', content: 'خطأ في المدخلات، تأكد من مدخلاتك' })
    }

}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

</script>


<style lang="css">
#createNewDiscount .dp__outer_menu_wrap{
    position: static;
}
</style>