<template>
    <Head>
        <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
    </Head>
    <div class="min-h-[20rem]">
        <div class="hidden">
            <span
                class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand"
                :class="cardImage.class">
                <img class="lazyload w-8" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="cardImage.src" />
            </span>
        </div>

        <div class="w-full space-y-3" x-id="['input']" v-if="!loading">


            <!-- <h2 dir="ltr">{{ hyper }}</h2> -->

            <h1 class="text-center font-semibold">سعر الخدمة : <span class="text-blue-600" >{{ hyper.checkout.amount }} ر.س</span></h1>


            <div class="is-scroll flex items-center space-x-3 overflow-x-auto p-1 rtl:space-x-reverse sm:max-w-sm" aria-orientation="horizontal">
                
                <FormStepsCardComponent title="ماستركارد" logo="/images/payments/section/mastercard.svg" id-of-card="MASTER" v-model="paymentMethod" width="26" height="26" />
                <FormStepsCardComponent title="فيزا كارد" logo="/images/payments/section/visa.svg" id-of-card="VISA" v-model="paymentMethod" width="26" height="26" />
                <FormStepsCardComponent title="مدى كارد" logo="/images/payments/section/mada.png" id-of-card="MADA" v-model="paymentMethod"  width="40" height="40" />
                <FormStepsCardComponent title="اس تي س باي" logo="/images/payments/section/stc_pay.webp" id-of-card="STC_PAY" v-model="paymentMethod"  width="40" height="40" />
                <FormStepsCardComponent title="أبل باي" logo="/images/payments/section/apple-pay.svg" id-of-card="APPLEPAY" v-model="paymentMethod"  width="24" height="24" />
                <FormStepsCardComponent title="المحفظة" logo="/images/payments/section/bocket.svg" id-of-card="WALLET" v-model="paymentMethod" v-bind="{ disabled: !hasSufficientBallance }" width="24" height="24" />

            </div>


            <!-- <label class="block text-sm font-semibold xs:text-base" for="payment-method">نوع البطاقة</label>
            <select
                v-model="paymentMethod"
                class="form-control form-select h-[50px] appearance-none"
                type="select"
                name="select"
                id="payment-method"
                required>
                <option value="VISA MASTER MADA">فيزا كارد, ماستر كارد, مدى كارد</option>
                <option value="APPLEPAY">ابل باي</option>
                <option value="STC_PAY">اس تي سي باي</option>
                <option value="WALLET" v-bind="{ disabled: !hasSufficientBallance }">
                    المحفظة {{ !hasSufficientBallance ? '( ليس لديك الرصيد الكافي )' : '' }}
                </option>
            </select> -->
        </div>

        <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
            <Loading class="w-14 h-14" />
        </div>

        <InputError :message="error" />

        <div dir="ltr" class="payment-form" ref="paymentForm" >
            <form
                dir="ltr"
                :action="callbackURL"
                class="paymentWidgets"
                :data-brands="paymentMethod"></form>
        </div>

        <div class="space-y-7" v-if="!loading">
            <div class="flex items-center" x-id="['checkbox']">
                <input
                v-model="useWallet"
                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                    type="checkbox"
                    name="checkbox"
                    id="use-wallet"
                     />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="use-wallet"
                    >إستخدام رصيد المحفظة للدفع</label
                >
            </div>
            <div class="flex items-center" x-id="['checkbox']">
                <input
                    v-model="hasCoupon"
                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                    type="checkbox"
                    name="checkbox"
                    id="have-coupon"
                     />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="have-coupon">لدي كوبون خصم</label>
            </div>
            <div class="w-full space-y-3" v-if="hasCoupon">
                <input
                    class="form-control h-[50px] appearance-none"
                    type="text"
                    name="text"
                    id="coupon"
                    v-model="coupon"
                    placeholder="إدخل كوبون الخصم"
                    dir="rtl"
                    required/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';
import useScript from '~/composables/useScript';

const { state, persist } = useFormWizard<OrderForm>('order');
const { data, getSession } = useAuth();

const callbackURL = window.location.origin + (state.value?.data?.type === 'text_communication' ? '/orders/complete' : '/orders/video-complete');

const paymentWidgetURL = useRuntimeConfig().public.paymentWidgetURL;

const hasCoupon = ref(false)
const useWallet = ref(false)
const coupon = ref("")

let hyper: any = undefined;


const loading = ref(true);
let paymentForm = ref<HTMLDivElement | null>(null);
const error = ref('');

const { fetchBalance } = useWalletStore();

const { balance } = storeToRefs(useWalletStore());

const paymentMethod = ref('MASTER');
const cardType = ref(paymentMethod.value);
const hasSufficientBallance = computed(() => {
    if (!hyper) return false;

    return balance.value.available_balance >= hyper?.checkout?.amount;
});

watch(paymentMethod, async (value) => {
    if (value == 'WALLET') return;
    loading.value = true; 
    hyper.unload();
    const form = document.createElement('form');

    form.dir = 'ltr';
    form.action = callbackURL;
    form.classList.add('paymentWidgets');

    form.dataset.brands = value;

    paymentForm.value?.append(form);

    loading.value = false;

    await loadHyper();
});

const cardImage = computed(
    () =>
        cardImages[cardType.value] ?? {
            src: '/images/payments/general.svg',
            class: 'w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3'
        }
);

const cardImages: { [key: string]: { src: string; class: string } } = {
    general: { src: '/images/payments/general.svg', class: 'w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3' },
    VISA: { src: '/images/payments/visa.webp', class: 'w-8 h-8 lg:top-12 md:top-12 top-10  ltr:right-3 rtl:left-3' },
    MASTER: {
        src: '/images/payments/mastercard.webp',
        class: 'w-8 h-8 lg:top-[2.9rem] md:top-[2.9rem] top-[2.3rem] ltr:right-3 rtl:left-3'
    },
    MADA: { src: '/images/payments/mada.png', class: 'w-8 h-8 top-[1.2rem] md:[1.2rem] ltr:right-3 rtl:left-3' },
    stc_pay: { src: '/images/payments/stc_pay.webp', class: '' }
};

onMounted(async () => {
    // await getSession()

    error.value = '';
    try {
        Promise.all([loadHyper(), fetchBalance()]);
        // await loadHyper();
        // await fetchBalance();
    } catch (error) {
        console.log(error);
    }
});

async function loadHyper() {
    const payment = await createCheckout();

    if (!payment.id) {
        error.value = 'حدث خطأ ما';
        return;
    }

    (window as any).wpwlOptions = {
        style: 'plain',
        locale: 'ar',
        // brandDetectionPriority: paymentMethod.value,
        labels: {
            cardNumber: '0000 0000 0000 0000',
            cvv: '000',
            expiryDate: 'تاريخ الإنتهاء',
            showOtherPaymentMethods: 'الدفع ببطاقة أخرى',
            submit: 'دفع الأن',
            mobilePhoneNumber: 'رقم الهاتف'
        },
        errorMessages: {
            cvvError: 'رمز التحقق غير صالح',
            cardNumberError: 'رقم البطاقة غير صالح',
            expiryMonthError: 'تاريخ الإنتهاء غير صالج',
            expiryYearError: 'تاريخ الإنتهاء غير صالج'
        },
        onFocusIframeCommunication: async function () {
            const form = this.$iframe[0] as HTMLIFrameElement;

            form.classList.add('activeIframe');
        },
        onBlurIframeCommunication: function () {
            const form = this.$iframe[0] as HTMLElement;

            form.classList.remove('activeIframe');
        },
        onReady: function (array: Array<any>) {
            loading.value = false;

            // Groups
            const cardGroup = document.querySelector('.wpwl-group-cardNumber');
            const expiryGroup = document.querySelector('.wpwl-group-expiry') as Element;
            const cvvGroup = document.querySelector('.wpwl-group-cvv') as Element;
            const cardBrand = document.querySelector('.card-brand') as Element;

            // labels
            const cardLabel = document.querySelector('.wpwl-label-cardNumber') as Element;
            const cvvLabel = document.querySelector('.wpwl-label-cvv') as Element;
            const phoneNumberLabel = document.querySelector('.wpwl-label-mobilePhone') as Element;

            // input
            const phoneNumber = document.querySelector('.wpwl-control-mobilePhone') as Element;

            if (phoneNumber) {
              (phoneNumber as HTMLInputElement).placeholder = '05XXXXXXXX';
            }

            cardLabel.innerHTML = 'رقم البطاقة';
            cvvLabel.innerHTML = 'رمز التحقق (CVV)';

            const cardHolderInput = document.querySelector('.wpwl-control-cardHolder') as HTMLInputElement;

            cardHolderInput.value = data.value.username;

            expiryGroup?.remove?.();
            cvvGroup?.remove?.();

            cardBrand.remove();

            cardGroup?.append(cardBrand);

            const div = document.createElement('div');
            div.classList.add('cvv-expiry-wrapper');
            cardGroup?.insertAdjacentElement('afterend', div);

            div.append(cvvGroup);
            div.append(expiryGroup);
        }
    };


    await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}`);
    // @ts-ignore
    hyper = wpwl as any;
}

async function createCheckout(): Promise<{ transaction_id: string; id: string }> {
    return new Promise(async (resolve, reject) => {

        const checkout = await useApi(`/api/orders/${state.value.data?.service_id}/buy`, {
            method: 'POST',
            body: {
                type: state.value.data?.type,

                // TODO: unncomment the above line when finishing from testing
                brand: paymentMethod.value
                // brand: cardType.valuee
            }
        });

        localStorage.setItem('abber:current-transaction-id', checkout.transaction_id);

        (state.value.data as OrderForm).order_id = checkout.order_id;

        persist();

        resolve(checkout);
    });
}
</script>

<style>
.wpwl-container {
    @apply pt-[20px] px-2 ;
}
.wpwl-form-has-inputs{
    @apply shadow-none form-control;
}
.wpwl-group-registration {
    @apply w-full flex ;
}
.wpwl-container .wpwl-registration {
    @apply flex items-center justify-around w-full flex-row-reverse;
}
.wpwl-container .wpwl-registration div{
    @apply pl-0;
}
.wpwl-container .wpwl-wrapper-registration-registrationId{
    @apply flex justify-center
}
.wpwl-container .wpwl-wrapper-registration-cvv {
    @apply hidden;
}
.wpwl-container .wpwl-wrapper-registration-details{
    @apply flex justify-around flex-row-reverse;
}

.wpwl-container .wpwl-button-pay {
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-form {
    @apply flex flex-col items-center;
}
.wpwl-form .wpwl-wrapper-submit{
    @apply w-full;
}
.wpwl-form .wpwl-wrapper-submit button{
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-container-card {
    @apply pt-4
}
.wpwl-form .wpwl-group-brand, .wpwl-form .wpwl-group-cardHolder {
    @apply hidden;
}
.wpwl-form .wpwl-group-cardNumber{
    @apply flex flex-col;
}
.wpwl-form .wpwl-label-cardNumber {
    @apply text-right w-full block text-sm font-semibold xs:text-base;
}
.wpwl-form .wpwl-group-cardNumber iframe {
    @apply form-control h-[50px] pl-12 w-full mt-2;
}
.wpwl-form .wpwl-wrapper-cardNumber {
    @apply w-full;
}
.wpwl-form .wpwl-group-cardNumber .card-brand {
    @apply  top-[54px];
}
.cvv-expiry-wrapper{
    @apply flex items-center justify-between gap-3;
}
.cvv-expiry-wrapper .wpwl-label-cvv {
    direction: rtl;
}
.cvv-expiry-wrapper div{
    @apply flex flex-col text-right w-full;
}
.cvv-expiry-wrapper div input, .cvv-expiry-wrapper div iframe{
    @apply form-control h-[50px] pl-12 w-full mt-2 text-end;
}

/* .wpwl-group-cardNumber {
    @apply relative;
}
.wpwl-control-cardNumber,
.wpwl-control-mobilePhone {
    @apply form-control h-[50px] pl-12 w-full;
}

.wpwl-control-mobilePhone {
    @apply form-control h-[50px]  block text-sm xs:text-base w-full;
    direction: rtl;
}

.wpwl-control-expiry {
    @apply form-control h-[50px] appearance-none w-full;
}

.wpwl-control-cvv {
    @apply form-control h-[50px] appearance-none;
}

.cvv-expiry-wrapper {
    @apply flex items-start justify-between gap-5 mb-2 w-full;
}
.wpwl-group {
    @apply w-full space-y-3;
}
.wpwl-wrapper {
    @apply w-full;
}

.wpwl-form {
    @apply rounded-md
}

.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-cardNumber,
.wpwl-label-mobilePhone {
    @apply block text-sm font-semibold xs:text-base w-full;
    direction: rtl;
}

.wpwl-group-cardHolder,
.wpwl-group-brand {
    @apply hidden;
}

.wpwl-button-pay {
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-button-error {
    @apply !cursor-not-allowed !bg-gray-100 !text-black !border-none;
}

.activeIframe {
    @apply border-gray-900 text-base outline-none ring-1 ring-gray-900 placeholder:opacity-0;
}
 */
</style>
