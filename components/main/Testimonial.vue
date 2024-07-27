<template>
    <div class="w-full pt-8 sm:inline-block">
        <figure class="rounded-xl bg-gray-50 px-6 py-6">
            <blockquote>
                <p class="text-justify text-sm text-gray-600 xs:text-base">
                    {{ testimonial.additional_comments }}
                </p>
            </blockquote>
            <figcaption class="flex items-center pt-6" v-if="testimonial.user">
                <div class="flex-shrink-0">
                    <img
                        class="lazyload h-11 w-11 rounded-full bg-gray-100"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        :data-src="testimonial.user?.image "
                        height="44"
                        width="44"
                        alt="" />
                </div>
                <div class="ms-3 flex flex-col">
                    <div class="text-sm font-semibold xs:text-base">
                        {{ testimonial.user.first_name }}                    </div>

                    <div class="mt-1.5 flex items-center text-yellow-400">
                        <svg v-for="i in Math.floor(testimonial.rate)"
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                            height="16"
                            width="16">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                   
                    </div>
                </div>
            </figcaption>
        </figure>
    </div>
</template>

<script setup lang="ts">
import type { Testimonial } from '~/types';

const props = defineProps<{
    testimonial : Testimonial
}>()



</script>

<style scoped></style>
