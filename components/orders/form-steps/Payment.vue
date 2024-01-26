<template>
    <Head>
        <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
    </Head>
    <div class="min-h-[20rem]">
        <span
            class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand hidden"
            :class="cardImage.class">
            <NuxtImg class="w-8" :src="cardImage.src" />
        </span>

        <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
            <Loading class="w-14 h-14" />
        </div>

        <form dir="ltr" action="http://localhost:3000" class="paymentWidgets" data-brands="VISA MASTER"></form>
    </div>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';
import useScript from '~/composables/useScript';

const { state } = useFormWizard<OrderForm>('order');

const cardType = ref('general');
const loading = ref(true);
const cardImage = computed(
    () =>
        cardImages[cardType.value] ?? {
            src: '/images/payments/general.svg',
            class: 'w-6 h-6 top-11 ltr:right-3 rtl:left-3'
        }
);

const cardImages: { [key: string]: { src: string; class: string } } = {
    general: { src: '/images/payments/general.svg', class: 'w-6 h-6 top-11 ltr:right-3 rtl:left-3' },
    VISA: { src: '/images/payments/visa.webp', class: 'w-8 h-8 top-12 ltr:right-3 rtl:left-3' },
    MASTER: { src: '/images/payments/mastercard.webp', class: 'w-8 h-8 top-[2.9rem] ltr:right-3 rtl:left-3' },
    MADA: { src: '/images/payments/mada.png', class: 'w-8 h-8 top-[1.2rem] ltr:right-3 rtl:left-3' },
    stc_pay: { src: '/images/payments/stc_pay.webp', class: '' }
};

onUpdated(() => {
    const cardBrand = document.querySelector('.card-brand') as Element;
    cardBrand.classList.remove('hidden');
});
onMounted(async () => {
    try {
        // ${state.value.data?.service_id}
        const data = await useApi(`/api/orders/85/buy`, {
            method: 'POST',
            body: {
                type: state.value.data?.type,

                // TODO: unncomment the above line when finishing from testing
                brand: 'visa'
                // brand: cardType.valuee
            }
        });

        (window as any).wpwlOptions = {
            style: 'plain',
            // locale: 'ar',
            brandDetection: true,
            brandDetectionPriority: ['VISA', 'MAESTRO', 'MASTER'],
            labels: { cardNumber: 'رقم البطاقة', cvv: 'رمز التحقق (CVV)', expiryDate: 'تاريخ الإنتهاء', submit : 'متابعة'},
            errorMessages: {
                cvvError: 'رمز التحقق غير صالح',
                cardNumberError: 'رقم البطاقة غير صالح',
                expiryMonthError: 'تاريخ الإنتهاء غير صالج',
                expiryYearError: 'تاريخ الإنتهاء غير صالج'
            },
            onFocusIframeCommunication: function () {
                const form = this.$iframe[0] as HTMLElement;


                form.classList.add("activeIframe")
            },
            onBlurIframeCommunication: function () {
                const form = this.$iframe[0] as HTMLElement;

                form.classList.remove("activeIframe")

            },
            onChangeBrand: (data: string) => {
                if (!data) {
                    cardType.value = 'general';
                    return;
                }
                cardType.value = data;
            },
            onReady: function () {
                loading.value = false;

                const cardGroup = document.querySelector('.wpwl-group-cardNumber');
                const expiryGroup = document.querySelector('.wpwl-group-expiry') as Element;
                const cvvGroup = document.querySelector('.wpwl-group-cvv') as Element;
                const cardBrand = document.querySelector('.card-brand') as Element;

                expiryGroup?.remove?.();
                cvvGroup?.remove?.();

                cardBrand.remove();

                cardGroup?.append(cardBrand);
                cardBrand.classList.remove('hidden');

                const div = document.createElement('div');
                div.classList.add('cvv-expiry-wrapper');
                cardGroup?.insertAdjacentElement('afterend', div);

                div.append(cvvGroup);
                div.append(expiryGroup);
            }
        };

        await useScript(`https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${data.id}`);
    } catch (error) {
        console.log(error);
    }
});
</script>

<style>
.wpwl-group-cardNumber {
    @apply relative;
}
.wpwl-control-cardNumber {
    @apply form-control h-[50px] pl-12 w-full;
}

.wpwl-control-expiry {
    @apply form-control h-[50px] appearance-none w-full;
}

.wpwl-control-cvv {
    @apply form-control h-[50px] appearance-none;
}

.cvv-expiry-wrapper {
    @apply flex items-center justify-between space-x-5 rtl:space-x-reverse mb-2 w-full;
}
.wpwl-group {
    @apply w-full space-y-3;
    direction: rtl;
}
.wpwl-wrapper {
    @apply w-full;
}

.wpwl-form {
    @apply space-y-7;
}

.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-cardNumber {
    @apply block text-sm font-semibold xs:text-base w-full ml-5;
}

.wpwl-group-cardHolder,
.wpwl-group-brand {
    @apply hidden;
}

.wpwl-button-pay {
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black;
}

.wpwl-button-error {
    @apply !cursor-not-allowed !bg-gray-100 !text-black !border-none;
}

.activeIframe { 
    @apply  border-gray-900 text-base outline-none ring-1 ring-gray-900 placeholder:opacity-0
}
</style>
