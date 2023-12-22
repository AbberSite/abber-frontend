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
                <svg
                    class="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                </svg>
            </a>
        </div>
        <div class="pt-6">
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
                @click="$emit('navigate', { name: 'blog' })"
                >الملف الشخصي
            </NuxtLink>
            <NuxtLink
                class="-mx-3 block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
                @click="$emit('navigate', { name: 'index' })"
                >الإعدادات
            </NuxtLink>
            <button
                class="-mx-3 w-full text-right block rounded-lg px-3 pb-2.5 pt-4 font-semibold hover:bg-gray-50"
                @click="$emit('logout')">
                تسجيل الخروج
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">

const { data, status } = useAuth()

</script>

<style scoped>

</style>