<template>
    <div class="pt-6" v-if="status == 'authenticated'">
        <div class="flex items-center justify-between pt-3">
            <NuxtLink class="flex items-center" @click="$emit('navigate', { name: 'profile' })">
                <div class="flex-shrink-0">
                    <img
                        class="lazyload h-11 w-11 rounded-full bg-gray-50"
                        :src="data.image_url"
                        height="44"
                        width="44"
                        alt="" />
                </div>
                <div class="ms-3 flex flex-col pt-1">
                    <div class="font-semibold">{{ data.first_name }}</div>
                    <div class="text-sm font-medium text-gray-500">{{ data.user_type }}</div>
                </div>
            </NuxtLink>
            <NuxtLink
                class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                @click="$emit('navigate', { name: 'profile', query: { edit: true } })">
                <span class="sr-only">تعديل البيانات</span>
                <!-- Heroicon name: outline/pencil-square -->
                <PencilSquareIcon class="h-6 w-6" />
            </NuxtLink>
        </div>
        <div class="pt-6">
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                href="#"
                v-if="data.user_type == 'مدير'"

                @click="$emit('navigate', { name: 'profile' })"
                >لوحة التحكم
            </NuxtLink>
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                href="#"
                @click="$emit('navigate', { name: 'orders' })"
                >الطلبات
            </NuxtLink>
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                href="#"
                @click="$emit('navigate', { name: 'index' })"
                >المحفظة
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

const { data, status } = useAuth();
</script>

<style scoped></style>
