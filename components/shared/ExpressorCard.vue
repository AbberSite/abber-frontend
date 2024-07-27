<template>
    <div class="w-full pt-8 sm:inline-block" v-if="expressor.active" >
        <figure class="space-y-6 rounded-xl bg-gray-50 px-6 py-6">
            <figcaption class="flex flex-col items-center">
                <div class="flex-shrink-0">
                    <img class="lazyload h-20 w-20 rounded-full bg-gray-100 object-cover"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        :data-src="expressor.seller.image"
                        height="80"
                        width="80"
                        alt="صورة المعبر" />
                </div>
                <div class="pt-6 font-medium">
                    {{ expressor.seller.first_name }}
                </div>
                <div class="flex items-center justify-center pt-2 ">
                    <svg
                        v-for="i in Math.floor(expressor.rate) ?? 1"
                        class="flex-shrink-0 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        height="18"
                        width="18">
                        <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <svg
                        v-for="i in  Math.ceil(5 - expressor.rate)"
                        class="flex-shrink-0 text-gray-200"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        height="18"
                        width="18">
                        <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <span class="ms-1.5 text-xs font-medium text-gray-600 xs:text-sm"
                        >({{ expressor.ordered_count }})</span
                    >
                </div>
            </figcaption>
            <blockquote>
                <p class="text-justify text-sm text-gray-700 xs:text-base" v-text="expressor.seller.about && expressor.seller.about.length > 140 ? expressor.seller.about.substring(0, 140) + '...' : expressor.seller.about"></p>
            </blockquote>
            <div class="w-full">
                  <NuxtLink class="flex items-center justify-center rounded-full bg-gray-100 px-4 py-4 text-center text-sm font-medium hover:bg-gray-200" :to="`/expressors/${expressor.seller.username}`">
                    <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span class="ms-2">زيارة الملف الشخصي</span></NuxtLink>
                </div>
        </figure>
    </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types';


function floor(n: number) {
    return Math.floor(n);
}

defineProps<{
    expressor : Service
}>()
</script>

<style scoped></style>
