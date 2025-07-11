<template>
  <section class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-20 xs:px-6 md:pt-32 lg:px-8 xl:pb-44" aria-labelledby="contact-types-heading">
    <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
      <component :is="activeHeader.icon" class="w-6 h-6" />
    </div>

    <h1 class="pt-6 text-lg font-medium xs:text-xl 2xl:text-2xl" id="contact-types-heading">
      {{ activeHeader?.title }}
    </h1>

    <div class="pt-4 text-sm text-gray-600 xs:text-base text-center" v-html="activeHeader?.description" />
    <div class="mx-auto w-full max-w-sm pt-10">
      <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-x-5 opacity-0" leave-to-class="-translate-x-5 opacity-0" mode="out-in">
        <div :key="activeStepIndex">
          <component :is="activeStep" />
        </div>
      </transition>

      <div class="pt-8 text-center text-sm xs:text-base" v-if="!first && !last">
        <button class="text-blue-600" @click="previous()">
          <span aria-hidden="true">→</span>
          العودة للخطوة السابقة
        </button>
      </div>

      <nav class="pt-10" aria-label="Progress" v-if="!last">
        <div class="flex items-center justify-center space-x-5 rtl:space-x-reverse" role="list">
          <template v-for="(step, index) in steps">
            <div v-if="!step.noDotStep" :key="step.id" @click="previous(step.id)">
              <span class="relative flex items-center justify-center" aria-current="step">
                <span class="absolute flex h-5 w-5 p-px" v-if="activeStepIndex == index" aria-hidden="true">
                  <span class="h-full w-full rounded-full bg-gray-200"></span>
                </span>
                <span class="relative block h-2.5 w-2.5 rounded-full" :class="[activeStepIndex < index && 'bg-gray-200 hover:bg-gray-400', activeStepIndex >= index && 'bg-gray-900']" aria-hidden="true"></span>
                <span class="sr-only">
                  {{ arabicStepsTitle[index] }}
                </span>
              </span>
            </div>
          </template>
        </div>
      </nav>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ChevronUpDownIcon, IdentificationIcon, UserIcon, LockClosedIcon, CreditCardIcon, CheckCircleIcon, UserGroupIcon, ClockIcon } from "@heroicons/vue/24/outline";
import type { OrderForm } from "~/types";
import ContactType from "./ContactType.vue";
import Service from "./Service.vue";
import AuthenticationMethod from "./AuthenticationMethod.vue";
import Authentication from "./Authentication.vue";
import ContinueLogin from "./ContinueLogin.vue";
import TextContact from "./TextContact.vue";
import OrderComplete from "./OrderComplete.vue";
import MyUrgentOrderService from "./MyUrgentOrderService.vue";
import TransferOrder from "./TransferOrder.vue";
import type { FunctionalComponent } from "vue";
const LazyFormStepsPayment = defineAsyncComponent(() => import('./Payment.vue'));
const steps = [
  { id: "contact-type", component: ContactType },
  { id: "dream-details", component: TextContact },
  { id: "service", component: Service },
  { id: "my-urgent-order-service", component: MyUrgentOrderService }, 
{ id: "transfer-order", component: TransferOrder },
  { id: "authentication-method", component: AuthenticationMethod },
  { id: "authentication", component: Authentication, noDotStep: true },
  { id: "continueLogin", component: ContinueLogin, noDotStep: true },
  { id: "payment", component: LazyFormStepsPayment },
  { id: "complete", component: OrderComplete, noDotStep: true },
];

const { state, activeStepId, previous, activeStep, first, activeStepIndex, last, reset } = useFormWizard<OrderForm>("order", steps);

onUnmounted(() => reset());

const arabicStepsTitle = ref([
  'الخطوة الأولى',
  'الخطوة الثانية',
  'الخطوة الثالثة',
  'الخطوة الرابعة',
  'الخطوة الخامسة',
  'الخطوة السادسة',
  'الخطوة السادسة',
  'الخطوة السابعة',
  'الخطوة الثامنة',
])

const activeHeader = computed<{
  title: string;
  description: string;
  icon: FunctionalComponent;
}>(() => {
  const headers: any = {
    "contact-type": {
      title: "طريقة تعبير الحلم",
      description: "أختر أحد الطرق التالية لتعبير حلمك",
      icon: ChevronUpDownIcon,
    },
    "dream-details": {
      title: "إدخال تفاصيل الحلم",
      description: "نضمن لكم السرية الخاصة",
      icon: IdentificationIcon,
    },
    service: {
      title: "إختيار المعبر",
      description: "أختر أحد المعبرين ليقوم بتعبير حلمك",
      icon: UserIcon,
    },
    "my-urgent-order-service": {
      title: "العرض على أكثر من معبر",
      description: "هل تود عرض حلمك على معبر اخر",
      icon: UserGroupIcon,
    },
    "transfer-order": {
      title: "نقل لمعبر آخر",
      description: "هل تود نقل الطلب إلى معبر آخر في حال عدم توفر المعبر الذي تم اختياره؟",
      icon: ClockIcon,
    },
    authentication: {
      title: "التسجيل",
      description: "سجل دخولك أو أنشئ حسابا جديدا في عبر",
      icon: LockClosedIcon,
    },
    "authentication-method": {
      title: "التسجيل",
      description: "سجل دخولك أو أنشئ حسابا جديدا في عبر",
      icon: LockClosedIcon,
    },
    continueLogin: {
      title: "إكمال تسجيل الدخول",
      description: "يتطلب منك ادخال كل البيانات المطلوبة",
      icon: LockClosedIcon,
    },
    payment: {
      title: "وسيلة الدفع",
      description: "إدخل بيانات الدفع لإتمام عملية الطلب",
      icon: CreditCardIcon,
    },
    
    complete: {
      title: "تم إرسال الطلب بنجاح",
      description: `<p>تم إرسال طلب تعبير الحلم الخاصة بك بنجاح.</p><div>سيتواصل معك المعبر قريبا.</div>`,
      icon: CheckCircleIcon,
    },
  };

  return headers[activeStepId.value ? activeStepId.value : "contact-type"];
});
</script>

<style>
ol {
  list-style-type: none !important;
}
</style>
