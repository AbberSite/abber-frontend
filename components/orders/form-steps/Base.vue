<template>
    <section
        class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
        aria-labelledby="contact-types-heading"
        x-data="{ selectedOption: null }">
        <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
            <!-- Heroicon name: outline/chevron-up-down -->
            <component :is="activeHeader.icon" class="w-6 h-6" />
        </div>
        <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
            {{ activeHeader.title }}
        </h1>
        <div class="pt-4 text-sm text-gray-800 xs:text-base">
            {{ activeHeader.description }}
        </div>
        <div class="mx-auto w-full max-w-sm pt-10">
            <transition
                enter-active-class="transition-all"
                leave-active-class="transition-all"
                enter-from-class="translate-x-5 opacity-0"
                leave-to-class="-translate-x-5 opacity-0"
                mode="out-in">
                <div v-if="activeStep == 0">
                    <FormStepsContactType :type="data?.type ?? ''" @next="next" />
                </div>

                <div v-else-if="activeStep == 1">
                    <FormStepsInputType :type="data?.inputType ?? ''" @next="next" />
                </div>

                <div v-else-if="activeStep == 2">
                    <FormStepsDreamDetails @next="next" :type="data?.inputType" />
                </div>

                <div v-else-if="activeStep == 3">
                    <FormStepsExpressor @next="next" :type="data?.type" />
                </div>

                <div v-else-if="activeStep == 4">
                    <FormStepsLogin @next="next" />
                </div>

                <div v-else-if="activeStep == 5">
                    <FormStepsPayment @next="next" />
                </div>
            </transition>

            <div class="pt-8 text-center text-sm xs:text-base" v-if="activeStep != 0">
                <button class="font-medium text-blue-600" @click="previous">العودة للخطوة السابقة <span aria-hidden="true">→</span></button>
            </div>

            <nav class="pt-10" aria-label="Progress">
                <ol class="flex items-center justify-center space-x-5 rtl:space-x-reverse" role="list">
                    <li v-for="(step, index) in steps" :key="step">
                        <span class="relative flex items-center justify-center" aria-current="step">
                            <span
                                class="absolute flex h-5 w-5 p-px"
                                v-if="activeNavigationIndex == index"
                                aria-hidden="true">
                                <span class="h-full w-full rounded-full bg-gray-200"></span>
                            </span>
                            <span
                                class="relative block h-2.5 w-2.5 rounded-full"
                                :class="[
                                    activeNavigationIndex < index && 'bg-gray-200 hover:bg-gray-400',
                                    activeNavigationIndex >= index && 'bg-gray-900'
                                ]"
                                aria-hidden="true"></span>
                            <span class="sr-only">
                                {{ step }}
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
    CreditCardIcon,
    ChevronDownIcon
} from '@heroicons/vue/24/outline';

const { data, activeStep, activeNavigationIndex, next, previous } = useFormWizard();

const inputTitle = computed(() =>
    data.value?.inputType == 'text_chat'
        ? 'أدخل معلومات و تفاصيل الحلم'
        : 'لديك دقيقتين يمكنك من خلالها إدخال تفاصيل الحلم'
);

const steps = ref(['الخطوة الأولى', 'الخطوة الثانية', 'الخطوة الثالثة', 'الخطوة الرابعة', 'الخطوة الخامسة']);

const activeHeader = computed(() => {

    const headers = [
        { title: 'طريقة تعبير الحلم', description: 'أختر أحد الطرق التالية لتعبير حلمك', icon: ChevronUpDownIcon },
        {
            title: 'إدخال تفاصيل الحلم',
            description: 'أختر أحد الطرق التالية لإدخال تفاصيل حلمك',
            icon: IdentificationIcon
        },
        { title: 'إدخال تفاصيل الحلم', description: inputTitle.value, icon: IdentificationIcon },
        { title: 'إختيار المعبر', description: 'أختر أحد المعبرين ليقوم بتعبير حلمك', icon: UserIcon },
        { title: 'التسجيل', description: 'سجل دخولك أو إنشأ حسابا جديدا في عبر', icon: LockClosedIcon },
        { title: 'وسيلة الدفع', description: 'إدخل بيانات الدفع لشراء خدمة تعبير الاحلام هذه', icon: CreditCardIcon }
    ];

    return headers[activeStep.value]
});
</script>

<style scoped></style>
