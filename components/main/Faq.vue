<template>
    <section class="mx-auto max-w-7xl px-4 pb-20 xs:px-6 sm:pb-28 lg:px-8" aria-labelledby="faq-heading">
        <div class="grid gap-x-8 lg:grid-cols-3">
            <div class="pb-3">
                <h2
                    class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
                    id="faq-heading">
                    الأسئلة الشائعة
                </h2>
                <div class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">
                    الإجابة على ابرز الأسئلة المتداولة
                </div>
            </div>
            <div class="lg:col-span-2 lg:-mt-8">
                <template v-if="loading">
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                    <SkeletonsFaq />
                </template>

                <template v-else>
                    <div class="divide-y-2 divide-gray-50 ">
                        <details v-for="faq in faqs" class="relative mt-8 pt-8 lg:first-of-type:mt-0">
                            <summary class="flex cursor-pointer select-none list-none justify-between font-medium">
                                <h3 class="leading-[1.75] xs:text-lg xs:leading-[1.75]">
                                    {{ faq.question }}
                                </h3>
                                <span class="ms-6 flex-shrink-0">
                                    <!-- Plus icon rotates to minus when open -->
                                    <svg
                                        class="mt-[5px] text-gray-600 transition-transform duration-200 faq-arrow"
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
                                <p class="text-justify text-sm text-gray-600 xs:text-base">
                                    {{ faq.answer }}
                                </p>
                            </div>
                        </details>
                    </div>
                </template>
                <div class="flex justify-center pt-16" v-if="!moreFaqs && _faqs.results.length > 5">
                    <button
                        class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-4 py-3 text-sm font-medium text-white hover:bg-gray-800"
                        type="button"
                        @click="moreFaqs = true">
                        <span>عرض المزيد...</span>
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PaginationResponse } from '~/types';
import { useApiCache } from '~/composables/useApiCache';

const loading = ref(false);
const moreFaqs = ref(false);
type Faq = {
    question: string;
    answer: string;
};

const _faqs = ref<PaginationResponse<Faq>>({ results: [] });

const faqs = computed(() =>
    moreFaqs.value ? _faqs.value.results : _faqs.value.results.filter((faq, index) => index < 5)
);

async function fetchFaqs() {
    try {
        loading.value = true;
        _faqs.value = await useApiCache<PaginationResponse<Faq>>('/api/faq/', {
            ttl: 600000, // 10 minutes cache
            tags: ['faq'],
            key: 'faq-list'
        });
        loading.value = false;
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
        loading.value = false;
    }
}

onMounted(async () => {
    await fetchFaqs();
});
</script>

<style scoped>
/* Rotate the plus icon to minus when details is open */
details[open] .faq-arrow {
  transform: rotate(45deg);
}
</style>
