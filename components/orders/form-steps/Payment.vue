<template>

  <Head v-if="!deposit">
    <title>عبر - طلب تعبير حلم - وسيلة الدفع</title>
  </Head>
  <div :class="{ my_deposit: deposit || addCard }">
    <div class="hidden">
      <span class="absolute items-center justify-center text-gray-600 hover:text-gray-900 card-brand"
        :class="cardImage.class">
        <img class="lazyload w-8"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          :data-src="cardImage.src" />
      </span>
    </div>

    <div class="space-y-3" v-if="!activeMembership">
      <template v-if="!deposit && !addCard">
        <h1 class="text-center font-medium" v-if="!loading">
          السعر الإجمالي : <span class="text-blue-600">{{ amount }} ر.س</span>
        </h1>
        <div v-if="
          !loading &&
          balance?.withdrawal_balance > 0 &&
          balance?.withdrawal_balance < amount
        " class="flex items-center justify-center">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
            id="supplement" value="supplement" v-model="supplement" />
          <label class="ps-3 font-medium" for="supplement">استخدام الرصيد الحالي للدفع</label>
        </div>

        <div v-if="paymentMethod == 'APPLEPAY' && isApple && !isSafari && !loading"
          class="bg-yellow-200 p-3 my-2 rounded-md flex flex-col items-center">
          <ExclamationTriangleIcon class="w-6 h-6" />
          <div class="flex gap-1 flex-wrap justify-center">
            <span>حتى تتمكن من الدفع</span>
            <span class="flex gap-1">بإستخدام أبل باي
              <img src="/images/payments/applepay.svg" alt="applepay" width="24" height="24" /></span>
            <span class="flex gap-1">تحتاج استخدام متصفح سفاري
              <img src="/images/safari.svg" alt="safari browser" width="16" height="16" /></span>.
          </div>
        </div>
      </template>

      <div class="flex flex-col space-y-3 items-center p-1 rtl:space-x-reverse sm:max-w-sm" id="payment-scrolling"
        aria-orientation="horizontal">
        <template v-if="!deposit && !addCard">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                id="all" value="APPLEPAY" v-model="paymentMethod" />
              <label class="mt-1.5 ps-3 text-sm font-medium" for="all">الدفع عن طريق Apple Pay</label>
              <img src="/images/payments/section/apple-pay.svg" alt="apple pay" width="24" height="24" />
            </div>
            <div class="flex items-center gap-2">
              <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                id="all" value="CARD" v-model="paymentMethod" />
              <label class="mt-1.5 ps-3 text-sm font-medium" for="all">البطاقات الإئتمانية</label>
              <img src="/images/payments/section/cards.png" alt="apple pay" width="100" />
            </div>
            <div class="flex items-center gap-2">
              <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                id="all" value="STC_PAY" v-model="paymentMethod" />
              <label class="mt-1.5 ps-3 text-sm font-medium" for="all"> الدفع بـ</label>
              <img src="/images/payments/section/stc_pay.webp" alt="apple pay" width="40" />
            </div>
            <div class="flex items-center gap-2">
              <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio" name="paymentStatus"
                id="all" value="BALANCE" v-model="paymentMethod" />
              <label class="mt-1.5 ps-3 text-sm font-medium" for="all">الدفع بالـمحفظة</label>
              <img src="/images/payments/section/wallet.svg" alt="apple pay" width="20" />
            </div>

          </div>
        </template>
        <template v-else>
          <FormStepsCardComponent title="ماستركارد" logo="/images/payments/section/mastercard.svg" id-of-card="MASTER"
            v-model="paymentMethod" width="26" height="26" />
          <FormStepsCardComponent title="فيزا كارد" logo="/images/payments/section/visa-icon.png" id-of-card="VISA"
            v-model="paymentMethod" width="26" height="26" />
          <FormStepsCardComponent title="مدى كارد" logo="/images/payments/section/mada.png" id-of-card="MADA"
            v-model="paymentMethod" width="40" height="40" />
        </template>
      </div>
    </div>

    <div v-if="
      !loading && !deposit && !addCard && !ordersPackage && activeMembership
    " class="w-full h-full flex flex-col justify-center items-center space-y-7">
      <h1 class="font-medium">تفاصيل اشتراكك:</h1>
      <div class="relative flex w-full justify-between rounded-md border bg-white px-4 py-4">
        <div>
          <p class="font-medium text-gray-500">الطلبات المتبقية</p>
          <p class="space-x-1 pt-10 text-xl font-bold rtl:space-x-reverse">
            <span>{{ membership.results[0].num_orders }}</span><small>طلب</small>
          </p>
        </div>
        <div class="flex h-10 w-10 items-center justify-center rounded-md">
          <!-- Heroicon name: solid/ -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path
              d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z">
            </path>
            <path fill-rule="evenodd"
              d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 overflow-hidden rounded-md text-gray-200">
          <!-- Heroicon name: solid/ -->
          <svg class="-translate-x-1/4 translate-y-1/4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
            fill="currentColor" height="64" width="64">
            <path
              d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z">
            </path>
            <path fill-rule="evenodd"
              d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
              clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
      <PrimaryButton v-if="membership.results[0].num_orders" :loading="payforsubscrib" @click="payUsingSubscrition()"
        class="w-full mt-3"><span>اكمال طلبك</span></PrimaryButton>
    </div>
    <div v-if="loading" class="w-full h-full flex justify-center items-center min-h-[20rem] mr-2">
      <Loading class="w-14 h-14" />
    </div>

    <InputError :message="error" />

    <div dir="ltr" class="payment-form" ref="paymentForm" v-if="paymentMethod != 'BALANCE'">
      <form dir="ltr" :action="callbackURL" class="paymentWidgets" :data-brands="paymentMethod === 'CARD' ? 'VISA MASTER MADA' : paymentMethod
        "></form>
    </div>

    <template v-if="!deposit && !addCard">
      <div v-if="!loading && paymentMethod == 'BALANCE'" class="py-3 text-center">
        <div class="flex justify-between items-center py-2">
          <p class="font-medium">الرصيد الحالي:</p>
          <p class="font-medium px-2">
            {{ balance?.withdrawal_balance }} ر.س
          </p>
        </div>
        <PrimaryButton v-if="hasSufficientBallance" :loading="waitingByBalance"
          @click="ordersPackage ? useBalance() : (showConfirmDailog = true)" class="w-full"><span>الدفع
            بالمحفظة</span></PrimaryButton>

        <span v-if="!hasSufficientBallance">عذرا، لا يوجد لديك رصيد كافي لشراء الخدمة بمحفظتك</span>
      </div>
      <div class="space-y-7" v-if="!loading && !ordersPackage && !activeMembership">
        <div class="flex items-center">
          <input v-model="hasCoupon" class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox"
            name="checkbox" id="have-coupon" />
          <label class="mt-1.5 ps-3 text-sm font-medium xs:text-base" for="have-coupon">لدي كوبون خصم</label>
        </div>
        <div class="w-full space-y-3" v-if="hasCoupon">
          <input class="form-control h-[50px] appearance-none" type="text" name="text" id="coupon" v-model="coupon"
            placeholder="إدخل كوبون الخصم" dir="rtl" required />
          <p v-if="couponResponse?.error" class="text-red-500">
            {{ couponResponse?.message }}
          </p>
          <p v-if="!couponResponse?.error" class="text-green-500">
            {{ couponResponse?.message }}
          </p>
          <PrimaryButton @click="checkCoupon()" :loading="loadingCoupon">تحقق</PrimaryButton>
        </div>
      </div>
    </template>
  </div>
  <ConfirmDialog v-if="showConfirmDailog" :title="`تأكيد خصم ${hyper.checkout.amount} ر.س من محفظتك`"
    :descritpion="`هل انت متأكد من رغبتك في خصم ${hyper.checkout.amount} ريال سعودي من محفظتك`"
    @close="showConfirmDailog = false" @continue="
      useBalance();
    showConfirmDailog = false;
    " :payment="true" />

  <InformationDialog v-if="dailogInformation" @close="closeInfoDailog" />
</template>

<script setup lang="ts">
const props = defineProps<{
  deposit?: boolean;
  addCard?: boolean;
  ordersPackage?: boolean;
}>();
import { ExclamationTriangleIcon } from "@heroicons/vue/24/outline";
import type { OrderForm } from "~/types";
import useScript from "~/composables/useScript";
const { isApple, isSafari } = useDevice();
let dailogInformation = ref(false);
let state;
let persist;
if (!props.deposit && !props.addCard && !props.ordersPackage) {
  state = useFormWizard<OrderForm>("order").state;
  persist = useFormWizard<OrderForm>("order").persist;
} else if (props.ordersPackage) {
  state = useFormWizard<any>("packages").state;
} else {
  state = useFormWizard<any>("deposit").state;
}
const { data } = useAuth();
let payforsubscrib = ref(false);
var callbackURL: string;
if (!props.deposit && !props.addCard && !props.ordersPackage)
  callbackURL =
    window.location.origin +
    (state.value?.data?.type === "text_communication"
      ? "/orders/complete"
      : "/orders/video-complete");
else if (props.deposit) callbackURL = "/complete-charge";
else if (props.addCard) callbackURL = "/complete-card";
else if (props.ordersPackage) callbackURL = "/packages/complete-package";
const paymentWidgetURL = useRuntimeConfig().public.paymentWidgetURL;
let showConfirmDailog = ref(false);
const hasCoupon = ref(false);
const waitingByBalance = ref(false);
const coupon = ref("");
let couponResponse = ref<{
  error: boolean;
  message: string;
} | null>(null);
let isPaymentScrolled = ref<boolean>(false);
let hyper: any = undefined;

const loading = ref(true);
let loadingCoupon = ref(false);
let paymentForm = ref<HTMLDivElement | null>(null);
const error = ref("");
const supplement = ref(false);
const amount = ref(0);
const { fetchBalance } = useWalletStore();

const { balance } = storeToRefs(useWalletStore());

const paymentMethod = ref(
  props?.deposit || props.addCard ? "MASTER" : isApple ? "APPLEPAY" : "CARD"
);
const cardType = ref("general");
const hasSufficientBallance = computed(() => {
  return balance.value.withdrawal_balance >= hyper?.checkout.amount;
});

const membership = (await useApi(`/api/packages/orders-packages/membership/`, {
  method: "GET",
})) as PaginationResponse<any>;
const activeMembership = ref(
  membership.count > 0 &&
  membership.results[0].num_orders >=
  state.value.data?.selectedServices.length + 1
);

await useScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
);
await useScript("https://applepay.cdn-apple.com/jsapi/v1/apple-pay-sdk.js");

async function reloadPaymentForm(value) {
  if (value == "BALANCE") return;
  if (props.deposit) {
    let buttonsIDontNeed = document.querySelectorAll(
      ".wpwl-wrapper.wpwl-wrapper-submit"
    );
    buttonsIDontNeed.forEach((b) => b.remove());
  }
  loading.value = true;
  hyper.unload();
  document.querySelectorAll("script").forEach((script: HTMLScriptElement) => {
    if (script.src.includes("static.min.js")) {
      script.remove();
    }
  });
  if (value == "CARD") {
    hyper = undefined;
    const form = document.createElement("form");
    form.dir = "ltr";
    form.action = callbackURL;
    form.classList.add("paymentWidgets");
    form.dataset.brands = "VISA MASTER MADA";
    paymentForm.value?.append(form);
    await loadHyper();
    loading.value = false;
    return;
  }
  const form = document.createElement("form");

  form.dir = "ltr";
  form.action = callbackURL;
  form.classList.add("paymentWidgets");
  form.dataset.brands = value == "CARD" ? "VISA MASTER MADA" : value;
 
  paymentForm.value?.append(form);

  await loadHyper();
  loading.value = false;
}
watch(paymentMethod, async (value) => {
  reloadPaymentForm(value);
});

const cardImage = computed(
  () =>
    cardImages[cardType.value] ?? {
      src: "/images/payments/general.svg",
      class: "w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3",
    }
);

const cardImages: { [key: string]: { src: string; class: string } } = {
  general: {
    src: "/images/payments/general.svg",
    class: "w-6 h-6 lg:top-11 md:top-11 top-9 ltr:right-3 rtl:left-3",
  },
  VISA: {
    src: "/images/payments/section/visa-icon.png",
    class: "w-8 h-8 lg:top-12 md:top-12 top-10  ltr:right-3 rtl:left-3",
  },
  MASTER: {
    src: "/images/payments/mastercard.webp",
    class:
      "w-8 h-8 lg:top-[2.9rem] md:top-[2.9rem] top-[2.3rem] ltr:right-3 rtl:left-3",
  },
  MADA: {
    src: "/images/payments/mada.png",
    class: "w-8 h-8 top-[1.2rem] md:[1.2rem] ltr:right-3 rtl:left-3",
  },
  stc_pay: { src: "/images/payments/stc_pay.webp", class: "" },
};

onMounted(async () => {
  document.querySelectorAll("script").forEach((script: HTMLScriptElement) => {
    if (script.src.includes("static.min.js")) {
      script.remove();
    }
  });
  error.value = "";

  try {
    if (!props?.deposit && !props?.addCard && !activeMembership.value) {
      Promise.all([loadHyper(), fetchBalance()]);
    } else {
      if (!activeMembership.value) await loadHyper();
      else {
        loading.value = false;
      }
    }
  } catch (error) {
    console.log(error);
  }
});
async function payUsingSubscrition() {
  payforsubscrib.value = true;
  createCheckout();
}
async function loadHyper() {
  if (paymentMethod.value == "BALANCE") return;
  const payment = await createCheckout();
  if (!payment.id) {
    error.value = "حدث خطأ ما";
    return;
  }

  (window as any).wpwlOptions = {
    style: "plain",
    locale: "ar",
    brandDetection: true,
    brandDetectionPriority: ["VISA", "MASTER", "MADA"],
    labels: {
      cardNumber: "0000 0000 0000 0000",
      cvv: "000",
      expiryDate: "تاريخ الإنتهاء",
      showOtherPaymentMethods: "الدفع ببطاقة أخرى",
      submit: "دفع الأن",
      mobilePhoneNumber: "رقم الهاتف",
    },
    errorMessages: {
      cvvError: "رمز التحقق غير صالح",
      cardNumberError: "رقم البطاقة غير صالح",
      expiryMonthError: "تاريخ الإنتهاء غير صالج",
      expiryYearError: "تاريخ الإنتهاء غير صالج",
    },
    onFocusIframeCommunication: async function () {
      const form = this.$iframe[0] as HTMLIFrameElement;

      form.classList.add("activeIframe");
    },
    onBlurIframeCommunication: function () {
      const form = this.$iframe[0] as HTMLElement;

      form.classList.remove("activeIframe");
    },
    onChangeBrand: (data: string) => {
      if (!data) {
        cardType.value = "general";
        return;
      }
      cardType.value = data;
      const card = document.querySelector(".w-8.lazyloaded");
      card?.removeAttribute("data-src");
      if (card?.src !== undefined) card.src = cardImage.value.src;
    },
    onReady: function (array: Array<any>) {
      loading.value = false;
      if (!isPaymentScrolled.value) {
        setTimeout(() => {
          scrollPayments();
          isPaymentScrolled.value = true;
        }, 1000);
      }

      const cardGroup = document.querySelector(".wpwl-wrapper-cardNumber");
      const expiryGroup = document.querySelector(
        ".wpwl-group-expiry"
      ) as Element;
      const cvvGroup = document.querySelector(".wpwl-group-cvv") as Element;
      const cardBrand = document.querySelector(".card-brand") as Element;
      
      const cardLabel = document.querySelector(
        ".wpwl-label-cardNumber"
      ) as Element;
      const cvvLabel = document.querySelector(".wpwl-label-cvv") as Element;
      const phoneNumberLabel = document.querySelector(
        ".wpwl-label-mobilePhone"
      ) as Element;

      const phoneNumber = document.querySelector(
        ".wpwl-control-mobilePhone"
      ) as Element;
      const cardNumber = document.querySelector(
        ".wpwl-control.wpwl-control-iframe.wpwl-control-cardNumber"
      ) as Element;
      if (phoneNumber) {
        (phoneNumber as HTMLInputElement).placeholder = "05XXXXXXXX";
        (phoneNumber as HTMLInputElement).maxLength = 10;
        (phoneNumber as HTMLInputElement).type = "number";
      }
      if (paymentMethod.value != "APPLEPAY") {
        (cardNumber as HTMLInputElement).maxLength = 16;
        cardLabel.innerHTML = "رقم البطاقة";
        cvvLabel.innerHTML = "رمز التحقق (CVV)";

        const cardHolderInput = document.querySelector(
          ".wpwl-control-cardHolder"
        ) as HTMLInputElement;

        cardHolderInput.value = data.value.username;

        if (cardBrand) cardGroup?.appendChild(cardBrand.cloneNode(true));

        const div = document.createElement("div");
        div.classList.add("cvv-expiry-wrapper");
        div.classList.add("flex-row-reverse");
        cardGroup?.insertAdjacentElement("afterend", div);
        div.append(expiryGroup);
        div.append(cvvGroup);
        let the_cvv_expiry_group = document.querySelectorAll(
          ".cvv-expiry-wrapper > div"
        );
        if ((the_cvv_expiry_group[0].innerText as string).includes("CVV")) {
          const my_cvv_date_group = document.querySelector(
            ".cvv-expiry-wrapper"
          );
          my_cvv_date_group.classList.remove("flex-row-reverse");
        }
      } else if (paymentMethod.value == "APPLEPAY") {
        let applepayButton = document.querySelector(
          ".wpwl-apple-pay-button.wpwl-apple-pay-button-white-with-line"
        );
        let my_text = document.createElement("p");
        my_text.textContent = "شراء بإستخدام";
        applepayButton?.appendChild(my_text);
        let applepaylogo = document.createElement("img");
        applepaylogo.src = "/images/payments/applepay.svg";
        applepaylogo.width = 24;
        applepaylogo.height = 24;
        applepayButton?.appendChild(applepaylogo);
      }
    },
  };

  await useScript(`${paymentWidgetURL}?checkoutId=${payment.id}/registration`);

  hyper = wpwl as any;
  if (paymentMethod.value == "APPLEPAY") loading.value = false;
}

const saveNewDetails = async (data: OrderForm, order) => {
  data.order_item = order;

  try {
    const response = await useApi(`/api/orders/dream-info/`, {
      method: "POST",
      body: data,
    });
  } catch (error) {
  }
};
async function updateOrderInfo(data: OrderForm) {
  console.log(data);
  const dreamDetails = await useApi(
    `/api/orders/dream-info/?order_item=${data.order_id}`
  );

  if (dreamDetails.results.length === 0) {
    if (data.orders && data.orders.length > 1) {
      for (const order of data.orders) {
        saveNewDetails(data, order);
      }
    } else {
      try {
        const savedDetails = await useApi(
          "/api/orders/dream-info/?order_item__isnull=true"
        );
        if (savedDetails.results.length > 0) {
          const response = await useApi(
            `/api/orders/dream-info/${savedDetails.results[0].id}`,
            {
              method: "patch",
              body: { order_item: data.order_id },
            }
          );
        } else {
          saveNewDetails(data, data.order_id);
        }
      } catch (error) {
      }
    }
  }
}

async function createCheckout(): Promise<{
  transaction_id: string;
  id: string;
}> {
  var another_service;
  try {
    another_service = state.value.data?.selectedServices
      .map((service) => service)
      .join(",");
  } catch (e) { }
  if (paymentMethod.value == "BALANCE") {
    let checkout;
    if (props.ordersPackage) {
      await useDirectApi(`/packages/orders-membership/`, {
        method: "POST",
        body: {
          package_id: state.value.data.packageId,
          brand: paymentMethod.value,
        },
      });
      checkout = {
        paid: true,
      };
    } else {
      checkout = await useApi(
        `/api/orders/${state.value.data?.service_id}/buy`,
        {
          method: "POST",
          body: {
            type: state.value.data?.type,
            another_service: another_service,
            brand: paymentMethod.value,
            transfer_order: state.value.data?.transferOrder,
          },
        }
      );
    }
    if (checkout?.cart?.length > 1)
      (state.value.data as OrderFrom).orders = checkout.cart;
    (state.value.data as OrderForm).order_id = checkout.order_id;
    updateOrderInfo(state.value.data);
    return checkout;
  }
  if (!props.deposit && !props.addCard && !props.ordersPackage) {
    return new Promise(async (resolve, reject) => {
      const checkout = await useApi(
        `/api/orders/${state.value.data?.service_id}/buy`,
        {
          method: "POST",
          body: {
            type: state.value.data?.type,
            another_service: another_service,

            brand: paymentMethod.value,
            supplement: supplement.value,
            transfer_order: state.value.data?.transferOrder,
          },
        }
      );
      amount.value = checkout.amount;

      localStorage.setItem(
        "abber:current-transaction-id",
        checkout.transaction_id
      );

      if (checkout?.cart?.length > 1)
        (state.value.data as OrderForm).orders = checkout.cart;
      (state.value.data as OrderForm).order_id = checkout.order_id;

      updateOrderInfo(state.value.data);

      if (checkout.paid) {
        navigateTo(
          callbackURL + `?freeOrder=true&order_id=${checkout.order_id}`,
          { external: true }
        );
        return;
      }
      activeMembership.value = false;
      persist();

      resolve(checkout);
    });
  } else if (props.deposit) {
    return new Promise(async (resolve, reject) => {

      //
      const checkout = await useDirectApi(`/wallets/charge/`, {
        method: "POST",
        body: {
          amount: state.value.data.amount,
          brand: paymentMethod.value,
        },
      });
      amount.value = checkout.amount;

      localStorage.setItem(
        "abber:current-transaction-id",
        checkout.transaction_id
      );

      resolve(checkout);
    });
  } else if (props.addCard) {
    return new Promise(async (resolve, reject) => {

      const checkout = await useApi(`/api/wallet/cards/`, {
        method: "POST",
        body: {
          type: paymentMethod.value,
          brand: paymentMethod.value.toLowerCase(),
        },
      });
      amount.value = checkout.amount;
      localStorage.setItem(
        "abber:current-transaction-id",
        checkout.transaction_id
      );


      resolve(checkout);
    });
  } else if (props.ordersPackage) {
    return new Promise(async (resolve, reject) => {

      const checkout = await useApi(
        `/api/packages/orders-packages/subscribe/`,
        {
          method: "POST",
          body: {
            package_id: state.value.data.packageId,
            brand: paymentMethod.value.toLowerCase(),
          },
        }
      );
      amount.value = checkout.amount;

      localStorage.setItem(
        "abber:current-transaction-id",
        checkout.transaction_id
      );


      resolve(checkout);
    });
  }
}
async function checkCoupon() {
  if (!coupon.value.length) {
    couponResponse.value = {
      error: true,
      message: "خانة الكوبون فارغة، يرجى تعبئتها!",
    };
    return;
  }
  loadingCoupon.value = true;
  let thereIsCoupon: boolean = false;
  let res;
  if (state.value.data?.selectedServices) {
    for (const service of state.value.data.selectedServices) {
      try {
        const res = await useDirectApi(`/orders/check-coupon/${service}/`, {
          method: "POST",
          body: {
            type: state.value.data.type,
            coupon: coupon.value,
          },
        });
        thereIsCoupon = true;
      } catch (e) { }
    }
  }
  try {
    res = await useDirectApi(
      `/orders/check-coupon/${state.value.data?.service_id}/`,
      {
        method: "POST",
        body: {
          type: state.value.data.type,
          coupon: coupon.value,
        },
      }
    );
    thereIsCoupon = true;
   
  } catch (e) {
    
  }
  if (thereIsCoupon) {
    couponResponse.value = {
      error: false,
      message: "لقد تم تفعيل الكوبون بنجاح",
    };
    
    if (paymentMethod.value == "BALANCE") {
      await loadHyper();
      hyper.checkout.amount = res.amount;
      loadingCoupon.value = false;
      return;
    }
    loading.value = true;
    hyper.unload();
    const form = document.createElement("form");

    form.dir = "ltr";
    form.action = callbackURL;
    form.classList.add("paymentWidgets");
    form.dataset.brands =
      paymentMethod.value == "CARD" ? "VISA MASTER MADA" : paymentMethod.value;
    paymentForm.value?.append(form);

    await loadHyper();
    loading.value = false;
  } else {
    couponResponse.value = {
      error: true,
      message: "الرمز غير صالح أو منتهي الصلاحية",
    };
  }
  loadingCoupon.value = false;
}

async function scrollPayments() {
  let payment_scroll = document.getElementById("payment-scrolling") as Element;
  try {
    payment_scroll.scrollTo({ left: -230, behavior: "smooth" });
    setTimeout(() => {
      payment_scroll.scrollTo({ left: 0, behavior: "smooth" });
    }, 800);
  } catch (e) { }
}
async function useBalance() {
  waitingByBalance.value = true;
  try {
    const payment = await createCheckout();
    if (payment.paid) {
      if (
        !data.value.profile.gender ||
        !data.value.profile.birthday ||
        !data.value.profile.marital_status ||
        !data.value.profile.profession
      ) {
        dailogInformation.value = true;
      } else navigateTo(callbackURL + "?balance=true", { external: true });
    }
  } catch (e) {
    console.log(e);
    useNotification({ type: "danger", content: "حدث خطأ ما، اعد المحاولة" });
    waitingByBalance.value = false;
  }
}

async function closeInfoDailog() {
  dailogInformation.value = false;
  navigateTo(callbackURL + "?balance=true", { external: true });
}
watch(supplement, async (data) => {
  reloadPaymentForm(paymentMethod.value);
});
</script>

<style >


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
  @apply flex justify-center;
}

.wpwl-container .wpwl-wrapper-registration-cvv {
  @apply hidden;
}

.wpwl-container .wpwl-wrapper-registration-details {
  @apply flex justify-around flex-row-reverse;
}

.wpwl-container .wpwl-button-pay {
  @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-form {
  @apply flex flex-col items-center;
}

.wpwl-form .wpwl-wrapper-submit {
  @apply w-full;
}

.wpwl-form .wpwl-wrapper-submit button {
  @apply flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-container-card {
  @apply pt-4;
}

.wpwl-form .wpwl-group-brand,
.wpwl-form .wpwl-group-cardHolder {
  @apply hidden;
}

.wpwl-form .wpwl-group-cardNumber {
  @apply flex flex-col;
}

/* .wpwl-form .wpwl-label-cardNumber {
  @apply text-right w-full block text-sm font-medium xs:text-base;
} */

.wpwl-form .wpwl-group-cardNumber iframe {
  @apply form-control h-[50px] pl-12 w-full mt-2;
}

.wpwl-form .wpwl-wrapper-cardNumber {
  @apply w-full;
}

.wpwl-form .wpwl-group-cardNumber .card-brand {
  @apply top-[23px];
}

.cvv-expiry-wrapper {
  @apply flex items-center justify-between gap-3 mt-4;
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
  @apply form-control h-[40px] block text-sm xs:text-base w-full mt-4;
  direction: rtl;
}

.wpwl-label-mobilePhone {
  @apply block text-sm font-medium xs:text-base w-full mb-3;
  direction: rtl;
}

.wpwl-group-mobilePhone {
  @apply flex flex-col items-center text-center;
}

.wpwl-label-cardNumber,
.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-mobilePhone {
  display: block;
  font-size: 16px;
  font-weight: 500;
  line-height: 1rem;
  margin: 0px;
  direction: rtl;
  width: 100%;
}

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
  font-size: 0.875rem;
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

<style scoped>
input[type="radio"] {
  -webkit-appearance: radio;
  -moz-appearance: radio;
  appearance: radio;
}
</style>
