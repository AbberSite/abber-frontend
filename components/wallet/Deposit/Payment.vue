<template>
    <div class="flex h-full flex-col gap-7 px-4 py-8 pb-36">
        <div class="min-h-[20rem]">
            <div class="hidden">
                <span
                    class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand"
                    :class="cardImage.class">
                    <NuxtImg class="lazyload w-8" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="cardImage.src" />
                </span>
            </div>

            <div class="w-full space-y-3" x-id="['input']" v-if="!loading">
                <label class="block text-sm font-semibold xs:text-base" for="payment-method">نوع البطاقة</label>
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
                </select>
            </div>

            <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
                <Loading class="w-14 h-14" />
            </div>

            <InputError :message="error" />

            <div dir="ltr" class="payment-form px-3 sm:px-0" ref="paymentForm">
                <form dir="ltr" target="/orders/something" class="paymentWidgets" :data-brands="paymentMethod"></form>
            </div>
            <div class="flex items-center" x-id="['checkbox']">
                <input
                    class="h-6 w-6 flex-shrink-0 appearance-none rounded border"
                    type="checkbox"
                    name="checkbox"
                    id="use-wallet"
                    x-model="checkedBox" />
                <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="use-wallet"
                    >إستخدام رصيد المحفظة للدفع</label
                >
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import 'intl-tel-input/build/css/intlTelInput.css';
import useScript from '~/composables/useScript';
import intlTelInput from 'intl-tel-input';
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const { state, bus } = useFormWizard<any>('deposit');

const emit = defineEmits(['close']);
const { data, getSession } = useAuth();

const paymentWidgetURL = useRuntimeConfig().public.paymentWidgetURL;

let hyper: any = undefined;
let executePayment: (() => void) | undefined;

bus?.on((event: string) => {
    console.log(executePayment);
    if (executePayment) executePayment();
    // hyper.executePayment();
    // console.log(event);
});

const cardType = ref('general');
const loading = ref(true);
const paymentForm = ref<HTMLDivElement | null>(null);
const error = ref('');

const { fetchBalance } = useWalletStore();

const { balance } = storeToRefs(useWalletStore());

const paymentMethod = ref('VISA MASTER MADA');

const hasSufficientBallance = computed(() => {
    if (!hyper) return false;

    return balance.value.available_balance >= hyper?.checkout?.amount;
});

watch(paymentMethod, async (value) => {
    if (value == 'WALLET') return;

    hyper.unload();

    const form = document.createElement('form');

    form.dir = 'ltr';
    form.action = '/wallet';
    form.classList.add('paymentWidgets');

    form.dataset.brands = value;

    paymentForm.value?.append(form);

    loading.value = false;

    await loadHyper();
});

onUnmounted(async () => {
    hyper.unload();

    const form = document.createElement('form');

    form.dir = 'ltr';
    form.action = '/wallet';
    form.classList.add('paymentWidgets');

    form.dataset.brands = paymentMethod.value;

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

    await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}`);

    // @ts-ignore
    hyper = wpwl as any;
}

async function createCheckout(): Promise<{ transaction_id: string; id: string }> {
    return new Promise(async (resolve, reject) => {
        // TODO: update this when finishing from testing and put dynamic service id instead of hardcoded 85

        //

        const checkout = await useProxy(`/wallets/charge/`, {
            method: 'POST',
            body: {
                // type: 'VISA',
                amount: state.value.data.amount,
                // TODO: unncomment the above line when finishing from testing
                brand: 'visa'
                // brand: cardType.valuee
            }
        });

        localStorage.setItem('abber:current-transaction-id', checkout.transaction_id);

        // persist();

        resolve(checkout);
    });
}

(window as any).wpwlOptions = {
    style: 'plain',
    locale: 'en',
    brandDetection: true,
    brandDetectionPriority: ['VISA', 'MAESTRO', 'MASTER'],
    // inlineFlow: ['KLARNA_PAYMENTS_PAYNOW'],
    labels: {
        cardNumber: '0000 0000 0000 0000',
        cvv: '000',
        expiryDate: 'تاريخ الإنتهاء',
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
    },
    onReady: function (array: Array<any>) {
        const containerKey = array[0]?.containerKey as string;

        if (containerKey) {
            executePayment = () => {
                //@ts-ignore
                (wpwl as any).executePayment(containerKey);
            };
        }

        console.log(containerKey);

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
            const iti = intlTelInput(phoneNumber as Element, {
                initialCountry: countryCode.value,
                separateDialCode: true,
                nationalMode: true,
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js'
            });
            phoneNumberLabel.innerHTML = 'رقم الهاتف';

            (phoneNumber as HTMLInputElement).placeholder = '7835196169';

            phoneNumber;
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

        div.append(expiryGroup);
        div.append(cvvGroup);
    }
};
</script>

<style>
.wpwl-group-cardNumber {
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
    @apply space-y-7;
}

.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-cardNumber,
.wpwl-label-mobilePhone {
    @apply block text-xs font-semibold xs:text-base w-full ml-5;
    direction: rtl;
}

.wpwl-group-cardHolder,
.wpwl-group-brand {
    @apply hidden;
}

.wpwl-button-pay {
    /* @apply flex */
    @apply hidden  h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-button-error {
    @apply !cursor-not-allowed !bg-gray-100 !text-black !border-none;
}

.activeIframe {
    @apply border-gray-900 text-base outline-none ring-1 ring-gray-900 placeholder:opacity-0;
}
</style>
