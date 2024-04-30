<template>
    <div
        class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 py-6 rtl:space-x-reverse xs:px-6 sm:hidden" v-if="!['إدارة', 'معبر'].includes(data?.user_type)" >
        <NuxtLink :to="{ name: 'orders-make' }"
            class="flex h-[50px] w-full items-center justify-center space-x-2 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse">
            <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"
                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round"
                    d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59">
                </path>
            </svg>
            <span class="mt-1.5">طلب تفسير حلم</span>
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const {data} = await useAuth();
</script>