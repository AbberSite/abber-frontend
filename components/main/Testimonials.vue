<template>
    <section class="mx-auto max-w-7xl px-4 pb-20 xs:px-6 sm:pb-28 lg:px-8" aria-labelledby="testimonials-heading">
        <div class="flex items-end justify-between">
            <div>
                <h2
                    class="inline-flex rounded-full bg-gray-900 px-4 py-2 text-xs font-medium text-white"
                    id="testimonials-heading">
                    الاراء
                </h2>
                <div class="pt-6 text-lg font-medium leading-[1.75] xs:text-xl 2xl:text-2xl">
                    اراء عملاؤنا بالخدمات التي نقدمها
                </div>
            </div>
        </div>

        <div class="grid gap-x-8 pt-8 sm:grid-cols-2 lg:grid-cols-3">
            <template v-if="loading">
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
                <SkeletonsTestimonial />
            </template>
            <template v-else>
                    <Testimonial v-for="testimonial in testimonials.results" :testimonial="testimonial" />
            </template>
        </div>
    </section>
</template>

<script setup lang="ts">

import type { PaginationResponse, Testimonial } from '~/types';
import { useApiCache } from '~/composables/useApiCache';

const loading = ref(false);

const testimonials = ref<PaginationResponse<Testimonial>>({ results: [] });

async function fetchTestimonails() {
    try {
        loading.value = true;
        const data = await useApiCache<PaginationResponse<Testimonial>>('/api/testimonials/testimonials', {
            ttl: 600000, // 10 minutes cache
            tags: ['testimonials'],
            key: 'testimonials-list'
        });
        if (!data) return;
        testimonials.value = data;
        testimonials.value.results = testimonials.value.results.filter(
            (testimonial: Testimonial, index: number) => index < 6
        );
        loading.value = false;
    } catch (error) {
        useNotification({ content: 'حدث خطأ ما', type: 'danger', extra_data: null });
        loading.value = false;
    }
}


if(!process.client){
    await fetchTestimonails();
}

onMounted(async () => {


    if(testimonials.value?.results?.length == 0){
        await fetchTestimonails();
    }

})
</script>

<style scoped></style>
