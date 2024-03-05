<template>
    <!-- <div
        class="absolute top-[calc(100%+10px)] w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1">
        <NuxtLink
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            role="menuitem"
            tabindex="-1"
            :to="{ name: 'profile' }"
            @click="$emit('close')"
            >الملف الشخصي</NuxtLink
        >
        <a
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            href="#"
            @click="$emit('close')"
            role="menuitem"
            tabindex="-1"
            >الإعدادات</a
        >
        <a
            @click.prevent="$emit('logout')"
            class="block px-4 pb-1.5 pt-3 text-sm font-medium text-gray-800 hover:bg-gray-50 hover:text-gray-900"
            role="menuitem"
            tabindex="-1"
            >تسجيل الخروج</a
        >
    </div> -->

    <div
        class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        x-cloak>
        <NuxtLink class="flex items-center px-4 pb-3 pt-4" to="/profile" @click="$emit('close')">
            <div class="flex-shrink-0">
                <NuxtImg
                    class="lazyload h-10 w-10 rounded-full bg-gray-100"
                    :src="data.image_url"
                    height="40"
                    width="40"
                    alt="صورة المستخدم" />
            </div>
            <div class="ms-3 flex flex-col pt-1">
                <div class="text-sm font-semibold">
                    {{ data.first_name }}
                </div>
                <div class="pt-1 text-xs font-medium text-gray-600">
                    {{ data.user_type }}
                </div>
            </div>
        </NuxtLink>
        <div class="py-2">
            <NuxtLink
                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                href="#"
                role="menuitem"
                tabindex="-1"
                v-if="data.user_type == 'مدير'"
                :to="{ name: 'profile' }"
                @click="$emit('close')"
                >لوحة التحكم
            </NuxtLink>
            <NuxtLink
                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                :to="{ name: 'orders' }"
                @click="$emit('close')"
                role="menuitem"
                tabindex="-1"
                >الطلبات
            </NuxtLink>
            <NuxtLink
                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                :to="{ name: 'wallet' }"
                @click="$emit('close')"
                href="#"
                role="menuitem"
                tabindex="-1"
                >المحفظة
            </NuxtLink>
        </div>
        <div class="py-2">
            <a
                @click.prevent="$emit('logout')"
                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                href="#"
                role="menuitem"
                tabindex="-1"
                >تسجيل الخروج</a
            >
        </div>
    </div>
</template>

<script setup lang="ts">
const { data } = useAuth();
</script>

<style scoped></style>
