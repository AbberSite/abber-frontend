<template>
    <Head>
        <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
    </Head>
    <div>
        <form @submit.prevent="submit">
            <fieldset class="space-y-7">
                <div class="w-full space-y-3">
                    <label class="block text-sm font-semibold xs:text-base" for="card">رقم البطاقة</label>
                    <div class="relative flex items-center">
                        <input
                            class="form-control h-[50px] pl-12"
                            type="card"
                            dir="ltr"
                            name="card"
                            :value="cardNumber"
                            id="card-input"
                            @input="formatCardInput"
                            placeholder="0000 0000 0000 0000"
                            required />
                        <span
                            class="absolute items-center justify-center text-gray-600 hover:text-gray-900"
                            :class="cardImage.class">
                            <!-- <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48"> <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path> <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path> <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg> -->

                            <NuxtImg class="w-8" :src="cardImage.src" />
                        </span>
                    </div>
                <InputError :message="errors.cardNumber" />

                </div>

                <div class="flex items-center justify-between space-x-5 rtl:space-x-reverse">
                    <div class="w-full space-y-3">
                        <label class="block text-sm font-semibold xs:text-base" for="text">رمز التحقق (CVV)</label>
                        <input
                            class="form-control h-[50px] appearance-none"
                            type="text"
                            name="text"
                            @input="formatCvvInput"
                            v-model="cvv"
                            dir="ltr"
                            id="text"
                            placeholder="000"
                            required />
                    </div>
                    <div class="w-full space-y-3">
                        <label class="block text-sm font-semibold xs:text-base" for="text">تأريخ الإنتهاء</label>
                        <input
                            class="form-control h-[50px] appearance-none"
                            dir="ltr"
                            type="text"
                            :value="expiryDate"
                            @input="formatExpiryDateInput"
                            name="text"
                            id="expiry-date-input"
                            placeholder="MM/YY"
                            required />

                    </div>
                </div>

                <InputError :message="errors.cvv" />
                <InputError :message="errors.expiryDate" />



                <div>
                    <PrimaryButton class="w-full" type="submit">متابعة</PrimaryButton>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script setup lang="ts">
import { formatCreditCard, getCreditCardType, formatDate } from 'cleave-zen';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { number, object, string } from 'yup';
import type { OrderForm } from '~/types';
import valid from "card-validator"
import { Input } from 'postcss';

const { next } = useFormWizard<OrderForm>('order');

const { defineField, errors, validate, errorBag, setErrors } = useForm({
    validationSchema: toTypedSchema(
        object({
            cardNumber: string()
                .required('الرجاء ادخال رقم البطاقة')
                .test(
                    'test-number', 
                    'رقم بطاقة الائتمان غير صالح',
                    (value) => valid.number(value).isValid
                ),
            expiryDate: string().required('الرجاء ادخال تاريخ النتهاء صلاحية البطاقة ').test(
                    'test-date', 
                    'تاريخ انتهاء الصلاحية غير صالح',
                    (value) => valid.expirationDate(value).isValid
                ),
            cvv: string().required('الرجاء ادخال رقم cvv').test(
                    'test-cvv', 
                    'رقم cvv غير صالح',
                    (value) => value.length == 3
                ),
        })
    )
});

const [cardNumber] = defineField('cardNumber');
const [expiryDate] = defineField('expiryDate');
const [cvv] = defineField('cvv');

const cardType = ref('general');
const cardImage = computed(
    () =>
        cardImages[cardType.value] ?? {
            src: '/images/payments/general.svg',
            class: 'w-6 h-6 top-3 ltr:right-3 rtl:left-3'
        }
);

const cardImages: { [key: string]: { src: string; class: string } } = {
    general: { src: '/images/payments/general.svg', class: 'w-6 h-6 top-3 ltr:right-3 rtl:left-3' },
    visa: { src: '/images/payments/visa.webp', class: 'w-8 h-8 top-[1.1rem] ltr:right-3 rtl:left-3' },
    mastercard: { src: '/images/payments/mastercard.webp', class: 'w-8 h-8 top-[0.9rem] ltr:right-3 rtl:left-3' },
    mada: { src: '/images/payments/mada.png', class: 'w-8 h-8 top-[1.2rem] ltr:right-3 rtl:left-3' },
    stc_pay: { src: '/images/payments/stc_pay.webp', class: '' }
};

function submit() {
    next({
        nextStepId: 'complete'
    });
}

function formatCardInput(event: any) {

    const value: string = event.target.value;

    cardNumber.value = formatCreditCard(value, {
        strictMode: true,
        delimiterLazyShow : true
    });

    const madaPattern = /^(4[^79]|5[^67]|6[3])$/;

    if (madaPattern.test(value)) {
        cardType.value = 'mada';
        return;
    }

    cardType.value = getCreditCardType(value);
}

function formatExpiryDateInput(event: any) {

    let value: string = (event.target.value as string).slice(0, 5);

    expiryDate.value = formatDate(value, {

        datePattern: ['m', 'y'],
        delimiterLazyShow : true,

    });

}

function formatCvvInput(event : any){

    let value: string = (event.target.value as string);
    cvv.value = value.slice(0, 3)
    
}

</script>

<style scoped></style>
