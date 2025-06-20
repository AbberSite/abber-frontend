<template>
    <div class="absolute top-[calc(100%+10px)] w-48 divide-y-2 divide-gray-50 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" x-cloak>
        <NuxtLink class="flex items-center px-4 pb-3 pt-4" to="/profile" @click="$emit('close')">
            <div class="flex-shrink-0">
                <img class="lazyload h-10 w-10 rounded-full bg-gray-100"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                    :data-src="data.image_url" height="40" width="40" alt="صورة المستخدم" />
            </div>
            <div class="ms-3 flex flex-col pt-1">
                <div class="text-sm font-medium">
                    {{ data.first_name }}
                </div>
                <div class="pt-1 text-xs font-medium text-gray-600">
                    {{ data.user_type }}
                </div>
            </div>
        </NuxtLink>
        <div class="py-2">
            <NuxtLink class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" :to="{ name: 'index' }"
                role="menuitem" tabindex="-1">العودة للموقع</NuxtLink>
            <NuxtLink class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                :to="{ name: 'accounts-new-password' }" role="menuitem" tabindex="-1">تغيير كلمة المرور</NuxtLink>
            <NuxtLink class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50"
                :to="{ name: 'dashboardv2-settings' }" role="menuitem" tabindex="-1">إعدادات الموقع</NuxtLink>


        </div>
        <div class="py-2">
            <a @click.prevent="showConfirmDailog = true"
                class="block px-4 pb-1.5 pt-3 text-sm font-medium hover:bg-gray-50" href="#" role="menuitem"
                tabindex="-1">تسجيل الخروج</a>
        </div>

    </div>
    <ConfirmDialog v-if="showConfirmDailog" title="هل انت متاكد؟"
        descritpion="هل انت متأكد من انك تريد تسجيل الخروج من حسابك؟" @close="showConfirmDailog = false"
        @continue="$emit('logout')" />
</template>

<script setup lang="ts">
import ConfirmDialog from '~/components/shared/ConfirmDialog.vue';
const { data } = useAuth();
let showConfirmDailog = ref(false);

</script>

<style scoped></style>
