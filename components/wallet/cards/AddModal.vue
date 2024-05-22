<template>

    <Modal title="إضافة بطاقة إئتمانية" @close="emit('close')">

        <div class="is-scroll overflow-y-auto flex h-full flex-col gap-7 px-4 py-8 pb-36">
            <fieldset class="space-y-7">
                <div class="max-w-[320px] overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
                    x-show="alert" role="alert">
                    <div class="mt-1.5 flex">
                        <span class="me-3 flex-shrink-0">
                            <!-- Heroicon name: outline/information-circle -->
                            <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg"
                                fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                                </path>
                            </svg>
                        </span>
                        <div class="w-0 flex-1 text-sm font-medium leading-loose">رسوم إضافة بطاقة إئتمانية 1 ر.س. يمكنك
                            الدفع من رصيد المحفظة</div>
                    </div>
                </div>
                <div class="min-h-[20rem]">

                    <div class="hidden">
                        <span class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand"
                            :class="cardImage.class">
                            <img class="lazyload w-8"
                                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                :data-src="cardImage.src" />
                        </span>
                    </div>

                    <div class="is-scroll flex items-center space-x-3 overflow-x-auto p-1 rtl:space-x-reverse max-w-[320px]"
                        id="payment-scrolling" aria-orientation="horizontal">
                        <FormStepsCardComponent title="ماستركارد" logo="/images/payments/section/mastercard.svg"
                            id-of-card="MASTER" v-model="paymentMethod" width="26" height="26" />
                        <FormStepsCardComponent title="فيزا كارد" logo="/images/payments/section/visa.svg"
                            id-of-card="VISA" v-model="paymentMethod" width="26" height="26" />
                        <FormStepsCardComponent title="مدى كارد" logo="/images/payments/section/mada.png"
                            id-of-card="MADA" v-model="paymentMethod" width="40" height="40" />
                        <!-- <FormStepsCardComponent title="اس تي س باي" logo="/images/payments/section/stc_pay.webp"
                            id-of-card="STC_PAY" v-model="paymentMethod" width="40" height="40" />
                        <FormStepsCardComponent title="أبل باي" logo="/images/payments/section/apple-pay.svg"
                            id-of-card="APPLEPAY" v-model="paymentMethod" width="24" height="24" />
                        <FormStepsCardComponent title="المحفظة" logo="/images/payments/section/bocket.svg"
                            id-of-card="WALLET" v-model="paymentMethod" width="24" height="24" /> -->
                    </div>

                    <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
                        <Loading class="w-14 h-14" />
                    </div>

                    <InputError :message="error" />

                    <div dir="ltr" class="payment-form" ref="paymentForm">
                        <form dir="ltr" action="/complete-card" class="paymentWidgets" :data-brands="paymentMethod">
                        </form>
                    </div>
                    <div class="flex items-center" x-id="['checkbox']">
                        <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox"
                            name="checkbox" id="use-wallet" x-model="checkedBox" />
                        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="use-wallet">إستخدام رصيد
                            المحفظة للدفع</label>
                    </div>
                </div>
            </fieldset>
        </div>
        <!-- <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
            <button @click="execute"
                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                ><span class="mt-1.5">متابعة</span></button>
        </div> -->

    </Modal>

</template>

<script setup lang="ts">
import 'intl-tel-input/build/css/intlTelInput.css';
import useScript from '~/composables/useScript';
import intlTelInput from 'intl-tel-input';

const emit = defineEmits(['close', 'show']);
const { data, getSession } = useAuth();

const paymentWidgetURL = useRuntimeConfig().public.paymentWidgetURL;
let hyper: any = undefined;

const cardType = ref('general');
const loading = ref(true);
const paymentForm = ref<HTMLDivElement | null>(null);
const error = ref('');

const { fetchBalance } = useWalletStore();

const { balance } = storeToRefs(useWalletStore());

const paymentMethod = ref('MASTER');

const hasSufficientBallance = computed(() => {
    if (!hyper) return false;

    return balance.value.available_balance >= hyper?.checkout?.amount;
});

let isPaymentScrolled = ref<boolean>(false);

watch(paymentMethod, async (value) => {
    loading.value = true;
    hyper.unload();
    hyper = undefined;
    const form = document.createElement('form');

    form.dir = 'ltr';
    form.action = '/complete-card';
    form.classList.add('paymentWidgets');

    form.dataset.brands = value;

    paymentForm.value?.append(form);

    await loadHyper();
    loading.value = false;

});

// onUnmounted(async () => {
//     hyper.unload();

// const form = document.createElement('form');

// form.dir = 'ltr';
// form.action = '/orders/complete';
// form.classList.add('paymentWidgets');

// form.dataset.brands = paymentMethod.value;

// paymentForm.value?.append(form);

// loading.value = false;

// await loadHyper();
// })

const cardImage = computed(
    () =>
        cardImages[cardType.value] ?? {
            src: '/images/payments/general.svg',
            class: 'w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3'
        }
);

const cardImages: { [key: string]: { src: string; class: string } } = {
    general: { src: '/images/payments/general.svg', class: 'w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3' },
    VISA: { src: '/images/payments/visa.svg', class: 'w-8 h-8 lg:top-12 md:top-12 top-10  ltr:right-3 rtl:left-3' },
    MASTER: {
        src: '/images/payments/mastercard.webp',
        class: 'w-8 h-8 lg:top-[2.9rem] md:top-[2.9rem] top-[2.3rem] ltr:right-3 rtl:left-3'
    },
    MADA: { src: '/images/payments/mada.png', class: 'w-8 h-8 top-[1.2rem] md:[1.2rem] ltr:right-3 rtl:left-3' },
    stc_pay: { src: '/images/payments/stc_pay.webp', class: '' }
};

function execute() {

    hyper.executePayment()

}

onMounted(async () => {
    // await getSession()

    error.value = '';
    try {
        Promise.all([getCountry(), loadHyper(), fetchBalance()]);
        // await loadHyper();
        // await fetchBalance();
    } catch (error) {
        console.log(error);
    }
});
async function getCountry() {
    try {
        const url = 'https://api.bigdatacloud.net/data/reverse-geocode-client';
        const response = await fetch(url);
        const data = await response.json();

        countryCode.value = data.countryCode;
    } catch (error) {
        console.error(error);
        return 'sa';
    }
}

getCountry();

const countryCode = ref('');

async function loadHyper() {
    const payment = await createCheckout();

    if (!payment.id) {
        error.value = 'حدث خطأ ما';
        return;
    }

    (window as any).wpwlOptions = {
        style: 'plain',
        locale: 'ar',
        brandDetection: true,
        brandDetectionPriority: ['VISA', 'MASTER', 'MADA'],
        labels: {
            cardNumber: '0000 0000 0000 0000',
            cvv: '000',
            expiryDate: 'تاريخ الإنتهاء',
            mmyy: 'الشهر / السنة',
            submit: 'متابعة',
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
        onChangeBrand: (data: string) => {
            if (!data) {
                cardType.value = 'general';
                return;
            }
            cardType.value = data;
            const cardNumberInput = document.querySelector('.wpwl-control.wpwl-control-iframe.wpwl-control-cardNumber');
            (cardNumberInput as HTMLInputElement).maxLength = 16;
        },
        onReady: function (array: Array<any>) {
            loading.value = false;
            if (!isPaymentScrolled.value) {
                setTimeout(() => {
                    scrollPayments();
                    isPaymentScrolled.value = true;
                }, 1000);
            }
            // Groups
            const cardGroup = document.querySelector('.wpwl-group-cardNumber');
            const expiryGroup = document.querySelector('.wpwl-group-expiry') as Element;
            const cvvGroup = document.querySelector('.wpwl-group-cvv') as Element;
            const cardBrand = document.querySelector('.card-brand') as Element;

            // labels
            const cardLabel = document.querySelector('.wpwl-label-cardNumber') as Element;
            const cvvLabel = document.querySelector('.wpwl-label-cvv') as Element;
            const phoneNumberLabel = document.querySelector('.wpwl-label-mobilePhone') as Element;

            const cardNumber = document.querySelector('.wpwl-control.wpwl-control-iframe.wpwl-control-cardNumber') as Element;

            (cardNumber as HTMLInputElement).maxLength = 16;
            // (cardNumber as HTML)
            cardLabel.innerHTML = 'رقم البطاقة';
            cvvLabel.innerHTML = 'رمز التحقق (CVV)';

            const cardHolderInput = document.querySelector('.wpwl-control-cardHolder') as HTMLInputElement;

            cardHolderInput.value = data.value.username;

            if (cardBrand)
                cardGroup?.append(cardBrand);

            const div = document.createElement('div');
            div.classList.add('cvv-expiry-wrapper');
            cardGroup?.insertAdjacentElement('afterend', div);

            div.append(expiryGroup);
            div.append(cvvGroup);
        }
    };

    await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}/registration`);

    // @ts-ignore
    hyper = wpwl as any;
}

async function createCheckout(): Promise<{ transaction_id: string; id: string }> {
    return new Promise(async (resolve, reject) => {
        // TODO: update this when finishing from testing and put dynamic service id instead of hardcoded 85

        //

        const checkout = await useApi(`/api/wallet/cards/`, {
            method: 'POST',
            body: {
                type: paymentMethod.value,

                // TODO: unncomment the above line when finishing from testing
                brand: paymentMethod.value.toLowerCase()
                // brand: cardType.valuee
            }
        });

        localStorage.setItem('abber:current-transaction-id', checkout.transaction_id);

        // persist();

        resolve(checkout);
    });
}

async function scrollPayments() {
    let payment_scroll = document.getElementById('payment-scrolling') as Element;
    try {
        payment_scroll.scrollTo({ left: -230, behavior: 'smooth' });
        setTimeout(() => {
            payment_scroll.scrollTo({ left: 0, behavior: 'smooth' });
        }, 800)
    } catch (e) {

    }
}
</script>

<style>
.wpwl-container {
    @apply pt-[20px] px-2;
}

.wpwl-form-has-inputs {
    @apply shadow-none form-control;
}

.wpwl-group-registration {
    @apply w-full flex;
}

.wpwl-container .wpwl-registration {
    @apply flex items-center justify-around w-full flex-row-reverse;
}

.wpwl-container .wpwl-registration div {
    @apply pl-0;
}

.wpwl-container .wpwl-wrapper-registration-registrationId {
    @apply flex justify-center
}

.wpwl-container .wpwl-wrapper-registration-cvv {
    @apply hidden;
}

.wpwl-container .wpwl-wrapper-registration-details {
    @apply flex justify-around flex-row-reverse;
}

.wpwl-container .wpwl-button-pay {
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-form {
    @apply flex flex-col items-center;
}

.wpwl-form .wpwl-wrapper-submit {
    @apply w-full;
}

.wpwl-form .wpwl-wrapper-submit button {
    @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-container-card {
    @apply pt-4
}

.wpwl-form .wpwl-group-brand, .wpwl-form .wpwl-group-cardHolder {
    @apply hidden;
}

.wpwl-form .wpwl-group-cardNumber {
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
    @apply top-[54px];
}

.cvv-expiry-wrapper {
    @apply flex items-center justify-between gap-3 flex-row-reverse;
}

.cvv-expiry-wrapper .wpwl-label-cvv {
    direction: rtl;
}

.cvv-expiry-wrapper div {
    @apply flex flex-col text-right w-full;
}

.cvv-expiry-wrapper div input,
.cvv-expiry-wrapper div iframe {
    @apply form-control h-[50px] pl-12 w-full mt-2 text-end;
}
</style>
