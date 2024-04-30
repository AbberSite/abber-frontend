<template>
    <div class="pt-6" v-if="status == 'authenticated'">
        <div class="flex items-center justify-between pt-3">
            <NuxtLink class="flex items-center" @click="$emit('navigate', { name: 'profile' })">
                <div class="flex-shrink-0">
                    <img class="lazyload h-11 w-11 rounded-full bg-gray-50"
                        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                        :data-src="data.image_url" height="44" width="44" alt="" />
                </div>
                <div class="ms-3 flex flex-col pt-1">
                    <div class="font-semibold">{{ data.first_name }}</div>
                    <div class="text-sm font-medium text-gray-500">{{ data.user_type }}</div>
                </div>
            </NuxtLink>
            <div class="flex gap-3">
                <NuxtLink class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900"
                    @click="$emit('navigate', { name: 'profile', query: { edit: true } })">
                    <span class="sr-only">تعديل البيانات</span>
                    <!-- Heroicon name: outline/pencil-square -->
                    <PencilSquareIcon class="h-6 w-6" />
                </NuxtLink>
                <NuxtLink class="-m-2.5 p-2.5 "
                    @click="$emit('logout')">
                    <span class="sr-only">تسجيل الخروج</span>
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M17 16L21 12M21 12L17 8M21 12L7 12M13 16V17C13 18.6569 11.6569 20 10 20H6C4.34315 20 3 18.6569 3 17V7C3 5.34315 4.34315 4 6 4H10C11.6569 4 13 5.34315 13 7V8"
                            stroke="#374151" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                    </svg>
                </NuxtLink>
            </div>
        </div>
        <div class="pt-6">
            <NuxtLink class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50" href="#"
                v-if="data.user_type == 'إدارة'" @click="$emit('navigate', '/dashboard')">لوحة التحكم
            </NuxtLink>
            <NuxtLink class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
                href="/profile/service" v-if="data?.user_type == 'معبر'"
                @click="$emit('navigate', { name: 'profile-service' })">إدارة الخدمة</NuxtLink>
            <NuxtLink class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50" href="/profile"
                @click="$emit('navigate', { name: 'profile' })">الملف الشخصي</NuxtLink>
            <NuxtLink class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50" href="#"
                v-if="data.user_type != 'إدارة'" @click="$emit('navigate', { name: 'orders' })">الطلبات
            </NuxtLink>
            <NuxtLink class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50" href="#"
                v-if="data.user_type != 'إدارة'" @click="$emit('navigate', { name: 'wallet' })">المحفظة
            </NuxtLink>
            <button class="-mx-3 block rounded-lg px-3 pb-3 pt-5 font-semibold hover:bg-gray-50"
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
