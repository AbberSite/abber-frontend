<template>

  <Head>
    <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
  </Head>
  <div class="min-h-[20rem]">
    <div class="hidden">
      <span class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand"
        :class="cardImage.class">
        <img class="lazyload w-8"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          :data-src="cardImage.src" />
      </span>
    </div>

    <div class="w-full space-y-3">
      <h1 class="text-center font-semibold" v-if="!loading">السعر الإجمالي : <span class="text-blue-600">{{
        hyper.checkout.amount }}
          ر.س</span></h1>


      <div class="is-scroll flex items-center space-x-3 overflow-x-auto p-1 rtl:space-x-reverse sm:max-w-sm"
        id="payment-scrolling" aria-orientation="horizontal">

        <FormStepsCardComponent v-if="isApple && isSafari" title="أبل باي" logo="/images/payments/section/apple-pay.svg"
          id-of-card="APPLEPAY" v-model="paymentMethod" width="24" height="24" />
        <FormStepsCardComponent title="البطاقات الائتمانية" id-of-card="CARD" v-model="paymentMethod" width="26"
          height="26" :multi="true" />
        <FormStepsCardComponent title="اس تي س باي" logo="/images/payments/section/stc_pay.webp" id-of-card="STC_PAY"
          v-model="paymentMethod" width="40" height="40" />
        <FormStepsCardComponent title="المحفظة" logo="/images/payments/section/wallet.svg" id-of-card="BALANCE"
          v-model="paymentMethod" width="24" height="24" />

      </div>


      
    </div>

    <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
      <Loading class="w-14 h-14" />
    </div>

    <InputError :message="error" />

    <div dir="ltr" class="payment-form" ref="paymentForm" v-if="paymentMethod != 'BALANCE'">
      <form dir="ltr" :action="callbackURL" class="paymentWidgets"
        :data-brands="paymentMethod === 'CARD' ? 'VISA MASTER MADA' : paymentMethod"></form>
    </div>

    <div v-if="!loading && paymentMethod == 'BALANCE'" class="py-3 text-center">
      <div class="flex justify-between items-center py-2">
        <p class="font-semibold">الرصيد الحالي:</p>
        <p class="font-semibold px-2">{{ balance?.withdrawal_balance + balance?.available_balance }} ر.س</p>
      </div>
      <PrimaryButton v-if="hasSufficientBallance" :loading="waitingByBalance" @click="showConfirmDailog = true"
        class="w-full"><span class="mt-1.5">الدفع
          بالمحفظة</span></PrimaryButton>

      <span v-if="!hasSufficientBallance">عذرا، لا يوجد لديك رصيد كافي لشراء الخدمة بمحفظتك</span>
    </div>
    <div class="space-y-7" v-if="!loading">
      <div class="flex items-center">
        <input v-model="hasCoupon" class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox"
          name="checkbox" id="have-coupon" />
        <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="have-coupon">لدي كوبون خصم</label>
      </div>
      <div class="w-full space-y-3" v-if="hasCoupon">
        <input class="form-control h-[50px] appearance-none" type="text" name="text" id="coupon" v-model="coupon"
          placeholder="إدخل كوبون الخصم" dir="rtl" required />
        <p v-if="couponResponse?.error" class="text-red-500">{{ couponResponse?.message }}</p>
        <p v-if="!couponResponse?.error" class="text-green-500">{{ couponResponse?.message }}</p>
        <PrimaryButton @click="checkCoupon()" :loading="loadingCoupon">تحقق</PrimaryButton>
      </div>
    </div>
  </div>
  <ConfirmDialog v-if="showConfirmDailog" :title="`تأكيد خصم ${hyper.checkout.amount} ر.س من محفظتك`"
    :descritpion="`هل انت متأكد من رغبتك في خصم ${hyper.checkout.amount} ريال سعودي من محفظتك`"
    @close="showConfirmDailog = false" @continue="useBalance(); showConfirmDailog = false;" :payment="true"/>
</template>

<script setup lang="ts">
import type { OrderForm } from '~/types';
import useScript from '~/composables/useScript';
const { isApple, isSafari } = useDevice()
const { state, persist } = useFormWizard<OrderForm>('order');
const { data, getSession } = useAuth();

const callbackURL = window.location.origin + (state.value?.data?.type === 'text_communication' ? '/orders/complete' : '/orders/video-complete');

const paymentWidgetURL = useRuntimeConfig().public.paymentWidgetURL;
let showConfirmDailog = ref(false);
const hasCoupon = ref(false)
const waitingByBalance = ref(false)
const coupon = ref("")
let couponResponse = ref<{
  error: boolean;
  message: string;
} | null>(null);
let isPaymentScrolled = ref<boolean>(false);
let hyper: any = undefined;


const loading = ref(true);
let loadingCoupon = ref(false);
let paymentForm = ref<HTMLDivElement | null>(null);
const error = ref('');

const { fetchBalance } = useWalletStore();

const { balance } = storeToRefs(useWalletStore());

// const paymentMethod = ref('CARD');
const paymentMethod = ref(isApple && isSafari ? 'APPLEPAY' : 'CARD');
const cardType = ref('general');
const hasSufficientBallance = computed(() => {
  return balance.value.available_balance >= hyper?.checkout?.amount || balance.value.withdrawal_balance >= hyper?.checkout.amount;
});

await useScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js');
await useScript('https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js');

watch(paymentMethod, async (value) => {
  if (value == 'BALANCE') return;
  loading.value = true;
  hyper.unload();
  document.querySelectorAll('script').forEach((script: HTMLScriptElement) => {
    if (script.src.includes('static.min.js')) {
      script.remove();
    }
  })
  if (value == 'CARD') {
    hyper = undefined;
    const form = document.createElement('form');
    form.dir = 'ltr'
    form.action = callbackURL;
    form.classList.add('paymentWidgets');
    form.dataset.brands = 'MASTER';
    paymentForm.value?.append(form);
    await loadHyper();
    loading.value = false;
    return;
  }
  const form = document.createElement('form');

  form.dir = 'ltr';
  form.action = callbackURL;
  form.classList.add('paymentWidgets');
  form.dataset.brands = value == 'CARD' ? 'VISA MASTER MADA' : value;
  // console.log(form);
  paymentForm.value?.append(form);

  await loadHyper();
  loading.value = false;

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
  // while (!done && loading.value) {

  // }
  document.querySelectorAll('script').forEach((script: HTMLScriptElement) => {
    if (script.src.includes('static.min.js')) {
      script.remove();
    }
  })
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
  if (paymentMethod.value == "BALANCE") return;
  const payment = await createCheckout();
  if (!payment.id) {
    error.value = 'حدث خطأ ما';
    return;
  }
  // if(paymentMethod.value == 'APPLEPAY'){
  //   loading.value = false;
  //   console.log("i maked loading is false! -- " + loading.value)
  // }

  (window as any).wpwlOptions = {
    style: 'plain',
    locale: 'ar',
    brandDetection: true,
    brandDetectionPriority: ['VISA', 'MASTER', 'MADA'],
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
    onChangeBrand: (data: string) => {
      // console.log(`this is from onChangeBrand() - ${data}`);
      if (!data) {
        cardType.value = 'general';
        return;
      }
      cardType.value = data;
      const card = document.querySelector('.w-8.lazyloaded');
      card?.removeAttribute('data-src');
      if (card?.src !== undefined)
        card.src = cardImage.value.src;
    },
    onReady: function (array: Array<any>) {
      loading.value = false;
      if (!isPaymentScrolled.value) {
        setTimeout(() => {
          scrollPayments()
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

      // input
      const phoneNumber = document.querySelector('.wpwl-control-mobilePhone') as Element;
      const cardNumber = document.querySelector('.wpwl-control.wpwl-control-iframe.wpwl-control-cardNumber') as Element;
      if (phoneNumber) {
        (phoneNumber as HTMLInputElement).placeholder = '05XXXXXXXX';
        (phoneNumber as HTMLInputElement).maxLength = 10;
        (phoneNumber as HTMLInputElement).type = 'number';
      }
      if (paymentMethod.value != 'APPLEPAY') {
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
        div.append(cvvGroup);
        div.append(expiryGroup);
      } else if (paymentMethod.value == 'APPLEPAY') {
        let applepayButton = document.querySelector(".wpwl-apple-pay-button.wpwl-apple-pay-button-white-with-line");
        let my_text = document.createElement('p');
        my_text.textContent = "شراء بإستخدام";
        applepayButton?.appendChild(my_text);
        let applepaylogo = document.createElement('img');
        applepaylogo.src = '/images/payments/applepay.svg';
        applepaylogo.width = 24;
        applepaylogo.height = 24;
        applepayButton?.appendChild(applepaylogo);
      }
    }

  };

  await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}/registration`);
  // @ts-ignore
  hyper = wpwl as any;
  if (paymentMethod.value == 'APPLEPAY')
    loading.value = false;

}

async function createCheckout(): Promise<{ transaction_id: string; id: string }> {
  var another_service;
  try {
    another_service = state.value.data?.selectedServices.map(service => service).join(',')
  } catch (e) { }
  if (paymentMethod.value == 'BALANCE') {
    const checkout = await useApi(`/api/orders/${state.value.data?.service_id}/buy`, {
      method: 'POST',
      body: {
        type: state.value.data?.type,
        another_service: another_service,

        // TODO: unncomment the above line when finishing from testing
        brand: paymentMethod.value
        // brand: cardType.valuee
      }
    });
    // if(checkout.cart.length > 1)
    //   (state.value.data as OrderFrom).orders = checkout.cart;
    return checkout;
  }
  return new Promise(async (resolve, reject) => {

    const checkout = await useApi(`/api/orders/${state.value.data?.service_id}/buy`, {
      method: 'POST',
      body: {
        type: state.value.data?.type,
        another_service: another_service,


        // TODO: unncomment the above line when finishing from testing
        brand: paymentMethod.value
        // brand: cardType.valuee
      }
    });

    localStorage.setItem('abber:current-transaction-id', checkout.transaction_id);

    (state.value.data as OrderForm).order_id = checkout.order_id;
    if (checkout.cart.length > 1)
      (state.value.data as OrderFrom).orders = checkout.cart;
    persist();

    resolve(checkout);
  });
};

async function checkCoupon() {
  console.log(!coupon.value.length)
  if(!coupon.value.length){
    couponResponse.value = {
      error: true,
      message: 'خانة الكوبون فارغة، يرجى تعبئتها!'
    };
    return;
  }
  loadingCoupon.value = true;
  let thereIsCoupon: boolean = false;
  if (state.value.data?.selectedServices) {
    for (const service of state.value.data.selectedServices) {
      try {
        const res = await useProxy(`/orders/check-coupon/${service}/`, {
          method: 'POST',
          body: {
            type: 'text_communication',
            coupon: coupon.value
          }
        });
        thereIsCoupon = true;
      } catch (e) { }
    }
  }
  try {
    const data = await useProxy(`/orders/check-coupon/${state.value.data?.service_id}/`, {
      method: 'POST',
      body: {
        type: 'text_communication',
        coupon: coupon.value
      }
    });
    thereIsCoupon = true;
    // couponResponse.value = {
    //   error: false,
    //   message: 'لقد تم تفعيل الكوبون بنجاح'
    // }
    // hyper.checkout.amount = data.amount;
    // await hyper.unload();
    // await loadHyper();
  } catch (e) {
    //   couponResponse.value = {
    //     error: true,
    //     message: "رمز غير صالح أو منتهي الصلاحية"
    //   }
  }
  if (thereIsCoupon) {
    couponResponse.value = {
      error: false,
      message: 'لقد تم تفعيل الكوبون بنجاح'
    }
    await loadHyper();
  } else {
    couponResponse.value = {
      error: true,
      message: 'الرمز غير صالح أو منتهي الصلاحية'
    }
  }
  loadingCoupon.value = false;
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
async function useBalance() {
  waitingByBalance.value = true;
  const payment = await createCheckout();
  if (payment.paid)
    navigateTo(callbackURL + '?balance=true', { external: true });
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
  @apply flex items-center justify-between gap-3;
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

.wpwl-control-mobilePhone {
  @apply form-control h-[50px] block text-sm xs:text-base w-full;
  direction: rtl;
}

.wpwl-label-mobilePhone {
  @apply block text-sm font-semibold xs:text-base w-full mb-3;
  direction: rtl;
}

.wpwl-group-mobilePhone {
  @apply flex flex-col items-center text-center
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

.wpwl-container-virtualAccount-APPLEPAY {
  display: flex;
  justify-content: center;
  direction: rtl;
}

.wpwl-apple-pay-button {
  background-color: black;
  color: rgb(241 245 249);
  display: flex;
  border-radius: 9999px;
  align-items: center;
  font-weight: 700;
  font-size: .875rem;
  line-height: 1.25rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  border-color: transparent;
  border-width: 1px;
  border-radius: 9999px;
  justify-content: center;
}

.wpwl-apple-pay-button p {
  margin: 0;
  padding-left: 0.45rem;
}

.wpwl-apple-pay-button img {
  filter: invert();
  width: 2.5rem;

}
</style>
