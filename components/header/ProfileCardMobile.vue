<template>

    <div class="pt-6" v-if="status == 'authenticated'">
        <div class="flex items-center justify-between pt-3">
            <div class="flex items-center">
                <div class="flex-shrink-0">
                    <NuxtImg
                        class="lazyload h-11 w-11 rounded-full bg-gray-50"
                        :src="data.image_url"
                        height="44"
                        width="44"
                        alt="" />
                </div>
                <div class="ms-3 flex flex-col">
                    <div class="font-semibold">
                        {{ data.first_name }}
                    </div>
                    <div class="text-sm font-medium text-gray-500">
                        {{ data.user_type }}
                    </div>
                </div>
            </div>
            <a class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" href="#">
                <span class="sr-only">تعديل البيانات</span>
                <!-- Heroicon name: outline/pencil-square -->
                <PencilSquareIcon class="h-6 w-6" />
        
            </a>
        </div>
        <div class="pt-6">
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                @click="$emit('navigate', { name: 'profile' })"
                >الملف الشخصي
            </NuxtLink>
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                @click="$emit('navigate', { name: 'index' })"
                >الإعدادات
            </NuxtLink>
            <button
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                @click="$emit('logout')">
                تسجيل الخروج
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { PencilSquareIcon } from '@heroicons/vue/24/outline';

const { data, status } = useAuth()

</script>

<style scoped>

</style>