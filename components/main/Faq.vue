<template>
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="faq-heading">
        <div class="grid gap-x-8 lg:grid-cols-3">
            <div class="pb-3">
                <h2
                    class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white"
                    id="faq-heading">
                    الأسئلة الشائعة
                </h2>
                <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">
                    الإجابة على ابرز الأسئلة المتداولة
                </div>
            </div>
            <div class="divide-y-2 divide-gray-50 lg:col-span-2 lg:-mt-8">

                <template v-if="loading">
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                </template>

                <template v-else>
                    <details v-for="faq in faqs.results" class="relative mt-8 pt-8 lg:first-of-type:mt-0">
                        <summary class="group flex cursor-pointer select-none list-none justify-between font-semibold">
                            <h3 class="leading-[1.75] xs:text-lg xs:leading-[1.75]"> 
                              {{ faq.question }}
                            </h3>
                            <span class="ms-6 flex-shrink-0">
                                <!-- Heroicon name: outline/plus -->
                                <svg
                                    class="mt-[5px] text-gray-800 group-hover:text-gray-900"
                                    height="20"
                                    width="20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="2"
                                    stroke="currentColor"
                                    aria-hidden="true">
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.5v15m7.5-7.5h-15"></path>
                                </svg>
                            </span>
                        </summary>
                        <div class="pt-6">
                            <p class="text-justify text-sm text-gray-800 xs:text-base">
                              {{ faq.answer }}
                            </p>
                        </div>
                        <span class="absolute top-8 flex-shrink-0 cursor-pointer bg-white ltr:right-0 rtl:left-0">
                            <!-- Heroicon name: outline/minus -->
                            <svg
                                class="mt-[5px]"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="2"
                                stroke="currentColor"
                                aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"></path>
                            </svg>
                        </span>
                    </details>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PaginationResponse } from '~/types';

const loading = ref(false);

type Faq = {
    question: string;
    answer: string;
};

const faqs = ref<PaginationResponse<Faq>>({ results: [] });

async function fatchFaqs() {
    try {
        loading.value = true;

        const { data } = await useFetch('/api/faq');

        if (!data.value) return;

        faqs.value = data.value;

        loading.value = false;
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
    }
}

onMounted(async () => {
    await fatchFaqs();
    await fatchFaqs();
});
</script>

<style scoped></style>
