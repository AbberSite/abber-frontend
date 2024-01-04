<template>
    <section class="mx-auto max-w-7xl px-4 pb-36 xs:px-6 lg:px-8 xl:pb-44" aria-labelledby="testimonials-heading">
        <div class="flex items-end justify-between">
            <div>
                <h2
                    class="inline-flex rounded-full bg-gray-900 px-4 pb-1.5 pt-2 text-xs font-semibold text-white"
                    id="testimonials-heading">
                    الاراء
                </h2>
                <div class="pt-6 text-lg font-semibold leading-[1.75] xs:text-xl 2xl:text-2xl">
                    اراء عملاؤنا بالخدمات التي نقدمها
                </div>
            </div>
        </div>

        <div class="gap-x-8 pt-8 sm:columns-2 lg:columns-3">
            <template v-if="loading">
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
            </template>
            <template v-else>
                <div >
                    <Testimonial v-for="testimonial in testimonials.results" :testimonial="testimonial" />
                </div>
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PaginationResponse, Testimonial } from '~/types';

const loading = ref(false);

const testimonials = ref<PaginationResponse<Testimonial>>({ results: [] });

async function fetchTestimonails() {
    try {
        loading.value = true;

        const { data } = await useFetch('/api/testimonials/testimonials');

        if (!data.value) return;

        testimonials.value = data.value;
        testimonials.value.results = testimonials.value.results.filter(
            (testimonial: Testimonial, index: number) => index < 6
        );

        loading.value = false;
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger' });
    }
}

onMounted(async () => {
    await fetchTestimonails();
    await fetchTestimonails();
});
</script>

<style scoped></style>
