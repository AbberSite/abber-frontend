<template>
    <section
        class="relative flex min-h-screen w-full flex-col items-center px-4 pb-36 pt-28 xs:px-6 md:pt-32 lg:px-8 xl:pb-44"
        aria-labelledby="contact-types-heading"
        x-data="{ selectedOption: null }">
        <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
            <!-- Heroicon name: outline/chevron-up-down -->
            <component :is="headers[activeStep].icon" class="w-6 h-6" />
        </div>
        <h1 class="pt-8 text-lg font-semibold xs:text-xl 2xl:text-2xl" id="contact-types-heading">
            {{ headers[activeStep].title }}
        </h1>
        <div class="pt-4 text-sm text-gray-800 xs:text-base">
            {{ headers[activeStep].description }}
        </div>
        <div class="mx-auto w-full max-w-sm pt-10">
            <transition
                enter-active-class="transition-all"
                leave-active-class="transition-all"
                enter-from-class="translate-x-5 opacity-0"
                leave-to-class="translate-x-5 opacity-0"
                mode="out-in">
                <FormStepsContactType :type="data?.type" @next="next" v-if="activeStep == 0" />
                <FormStepsDreamDetails @next="next" v-else-if="activeStep == 1" />
            </transition>

            data : {{ data }}

            <div class="pt-8 text-center text-sm xs:text-base" v-if="activeStep != 0">
                <button class="font-medium text-blue-600" @click="previous">العودة للخطوة السابقة ←</button>
            </div>

            <nav class="pt-10" aria-label="Progress">
                <ol class="flex items-center justify-center space-x-5 rtl:space-x-reverse" role="list">
                    <li v-for="(step, index) in steps" :key="step">
                        <span class="relative flex items-center justify-center" aria-current="step">
                            <span class="absolute flex h-5 w-5 p-px" v-if="activeStep == index" aria-hidden="true">
                                <span class="h-full w-full rounded-full bg-gray-200"></span>
                            </span>
                            <span
                                class="relative block h-2.5 w-2.5 rounded-full"
                                :class="[
                                    activeStep < index && 'bg-gray-200 hover:bg-gray-400',
                                    activeStep >= index && 'bg-gray-900'
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
import Login from './Login.vue';
import Test from './Test.vue';

import { ChevronUpDownIcon, IdentificationIcon } from '@heroicons/vue/24/outline';

const show = ref(false);
const data = ref<any>({});

const activeStep = ref(0);

const steps = ref(['الخطوة الأولى', 'الخطوة الثانية', 'الخطوة الثالثة', 'الخطوة الرابعة']);
const headers = [
    { title: 'طريقة تعبير الحلم', description: 'أختر أحد الطرق التالية لتعبير حلمك', icon: ChevronUpDownIcon },
    { title: 'إدخال تفاصيل الحلم', description: 'أدخل معلومات و تفاصيل حلمك', icon: IdentificationIcon }
];

function next(result: Object) {
    data.value = Object.assign(data.value, result);

    activeStep.value++;
}

function previous() {
    activeStep.value--;
}
</script>

<style scoped></style>
