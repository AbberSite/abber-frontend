<template>
    <div class="pb-6">
        <div class="flex items-center justify-between">
            <a class="-m-1.5 p-1.5" href="/">
                <span class="sr-only">عبر</span>
                <img class="lazyload h-14 w-auto" src="/images/logo.webp" height="56" width="56" alt="" />
            </a>
            <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button"
                aria-labelledby="menu close button" @click="$emit('close')">
                <span class="sr-only">إغلاق القائمة</span>

                <!-- Heroicon name: outline/x-mark -->
                <XMarkIcon class="h-7 w-7" />

            </button>
        </div>
        <div class="pt-10">
            <nav class="space-y-3">
                <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    @click="$emit('navigate', { name: 'index' })">
                    <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">

                        <!-- Heroicon name: outline/home -->
                        <HomeIcon class="h-6 w-6 flex-shrink-0" />
                    </div>
                    <span class="ms-6 mt-1.5 font-semibold">الرئيسية</span>
                </NuxtLink>

                <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    @click="$emit('navigate', { name: 'blog' })">
                    <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">

                        <!-- Heroicon name: outline/RssIcon -->
                        <RssIcon class="h-6 w-6 flex-shrink-0" />

                    </div>
                    <span class="ms-6 mt-1.5 font-semibold">المدونة</span>
                </NuxtLink>

                <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    @click="$emit('navigate', { name: 'orders' })">
                    <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <!-- Heroicon name: outline/Lifebuoy -->
                        <svg class="h-6 w-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
                        </svg>


                    </div>
                    <span class="ms-6 mt-1.5 font-semibold">الطلبات</span>
                </NuxtLink>

                <NuxtLink class="group -mx-3 flex items-center rounded-lg p-3 hover:bg-gray-50 cursor-pointer"
                    @click="$emit('navigate', { name: 'tickets' })">
                    <div class="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <!-- Heroicon name: outline/Lifebuoy -->
                        <LifebuoyIcon class="h-6 w-6 flex-shrink-0" />

                    </div>
                    <span class="ms-6 mt-1.5 font-semibold">مركز الدعم</span>
                </NuxtLink>
            </nav>
        </div>
    </div>
</template>

<script setup>

import { XMarkIcon, HomeIcon, RssIcon, LifebuoyIcon } from '@heroicons/vue/24/outline';
</script>

<style lang="scss" scoped></style>