<template>
    <section
        class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
        aria-labelledby="contact-types-heading">
        <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
            <!-- Heroicon name: outline/chevron-up-down -->
            <component :is="activeHeader.icon" class="w-6 h-6" />
        </div>
        <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
            {{ activeHeader?.title }}
        </h1>
        <div class="pt-4 text-sm text-gray-800 xs:text-base">
            {{ activeHeader?.description }}
        </div>
        <div class="mx-auto w-full max-w-sm pt-10">
            <ClientOnly>
                <transition
                    enter-active-class="transition-all"
                    leave-active-class="transition-all"
                    enter-from-class="translate-x-5 opacity-0"
                    leave-to-class="-translate-x-5 opacity-0"
                    mode="out-in">
                    <div :key="activeStepIndex">
                        <component :is="activeStep" />
                    </div>
                </transition>
            </ClientOnly>

            <!-- {{ state }} -->

            <div class="pt-8 text-center text-sm xs:text-base" v-if="!first">
                <button class="font-medium text-blue-600" @click="previous()">
                    العودة للخطوة السابقة <span aria-hidden="true">→</span>
                </button>
            </div>

            <nav class="pt-10" aria-label="Progress">
                <ol class="flex items-center justify-center space-x-5 rtl:space-x-reverse" role="list">
                    <li v-for="(step, index) in steps" :key="step.id" @click="previous(step.id)">

                        {{ canGoBackTo(step.id) }}
                        <span class="relative flex items-center justify-center" aria-current="step">
                            <span class="absolute flex h-5 w-5 p-px" v-if="activeStepIndex == index" aria-hidden="true">
                                <span class="h-full w-full rounded-full bg-gray-200"></span>
                            </span>
                            <span
                                class="relative block h-2.5 w-2.5 rounded-full"
                                :class="[
                                    activeStepIndex < index && 'bg-gray-200 hover:bg-gray-400',
                                    activeStepIndex >= index && 'bg-gray-900'
                                ]"
                                aria-hidden="true"></span>
                            <span class="sr-only">
                                {{ arabicStepsTitle[index] }}
                            </span>
                        </span>
                    </li>
                </ol>
            </nav>
        </div>
    </section>
</template>

<script setup lang="ts">
import {
    ChevronUpDownIcon,
    IdentificationIcon,
    UserIcon,
    LockClosedIcon,
    CreditCardIcon
} from '@heroicons/vue/24/outline';
import type { OrderForm } from '~/types';
import ContactType from './ContactType.vue';
import Service from './Service.vue';
import AuthenticationMethod from './AuthenticationMethod.vue';
import Authentication from './Authentication.vue';
import Payment from './Payment.vue';
import TextContact from './TextContact.vue';
import type { FunctionalComponent } from 'vue';

const steps = [
    { id: 'contact-type', component: ContactType },
    { id: 'dream-details', component: TextContact },
    { id: 'service', component: Service },
    { id: 'authentication-method', component: AuthenticationMethod },
    { id: 'authentication', component: Authentication },
    { id: 'payment', component: Payment }
];

const { state, activeStepId, previous, activeStep, first, activeStepIndex, canGoBackTo } = useFormWizard<OrderForm>('order', steps);

// const inputTitle = computed(() =>
//     state.value.data?.inputType == 'text_chat'
//         ? 'أدخل معلومات و تفاصيل الحلم'
//         : 'لديك دقيقتين يمكنك من خلالها إدخال تفاصيل الحلم'
// );

const arabicStepsTitle = ref([
    'الخطوة الأولى',
    'الخطوة الثانية',
    'الخطوة الثالثة',
    'الخطوة الرابعة',
    'الخطوة الخامسة',
    'الخطوة السادسة'
]);

const activeHeader = computed<{title : string, description : string, icon : FunctionalComponent}>(() => {
    const headers : any = {
    
        'contact-type': {
            title: 'طريقة تعبير الحلم',
            description: 'أختر أحد الطرق التالية لتعبير حلمك',
            icon: ChevronUpDownIcon
        },
        'dream-details': {
            title: 'إدخال تفاصيل الحلم',
            description: 'أختر أحد الطرق التالية لإدخال تفاصيل حلمك',
            icon: IdentificationIcon
        },
        service: { title: 'إختيار المعبر', description: 'أختر أحد المعبرين ليقوم بتعبير حلمك', icon: UserIcon },
        authentication: { title: 'التسجيل', description: 'سجل دخولك أو إنشأ حسابا جديدا في عبر', icon: LockClosedIcon },
        'authentication-method': {
            title: 'التسجيل',
            description: 'سجل دخولك أو إنشأ حسابا جديدا في عبر',
            icon: LockClosedIcon
        },
        payment: {
            title: 'وسيلة الدفع',
            description: 'إدخل بيانات الدفع لشراء خدمة تعبير الاحلام هذه',
            icon: CreditCardIcon
        }

    };

    return headers[activeStepId.value ? activeStepId.value : 'contact-type'];
});

</script>

<style></style>
