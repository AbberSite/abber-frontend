<template>
    <div class="w-full pt-8 sm:inline-block">
        <figure class="rounded-xl bg-gray-50 px-6 py-6">
            <figcaption class="flex flex-col items-center">
                <div class="flex-shrink-0">
                    <img class="lazyload h-20 w-20 rounded-full bg-gray-100 object-cover"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        :data-src="expressor.seller.image"
                        height="80"
                        width="80"
                        alt="صورة المعبر" />
                </div>
                <div class="pt-6 font-semibold">
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
                        class="flex-shrink-0 text-gray-300"
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
                    <span class="ms-1.5 mt-1.5 text-xs font-medium text-gray-800 xs:text-sm"
                        >({{ expressor.ordered_count }})</span
                    >
                </div>
            </figcaption>

            <blockquote>
                <p class="pt-6 text-justify text-sm text-gray-800 xs:text-base">

                    {{ expressor.seller.about }}

                    <!-- هناك حقيقة مثبتة منذ زمن طويل وهي أن المحتوى المقروء لصفحة ما سيلهي القارئ عن التركيز على الشكل
                    الخارجي للنص -->
                    
                </p>
            </blockquote>
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
