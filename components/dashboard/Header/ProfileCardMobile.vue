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
                    <div class="font-medium">{{ data.first_name }}</div>
                    <div class="text-sm font-medium text-gray-500">{{ data.user_type }}</div>
                </div>
            </NuxtLink>
            <div class="flex gap-3">
                <NuxtLink class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900 cursor-pointer"
                    @click="$emit('navigate', { name: 'profile', query: { edit: true } })">
                    <span class="sr-only">تعديل البيانات</span>
                    <!-- Heroicon name: outline/pencil-square -->
                    <PencilSquareIcon class="h-6 w-6" />
                </NuxtLink>
                <NuxtLink class="-m-2.5 p-2.5 cursor-pointer" @click="showConfirmDailog = true">
                    <span class="sr-only">تسجيل الخروج</span>
                    <ArrowLeftStartOnRectangleIcon class="h-6 w-6" />
                </NuxtLink>
            </div>
        </div>
        <div class="pt-6">
            <NuxtLink class="-mx-3 block rounded-lg px-3 py-4 font-medium hover:bg-gray-50" :to="{name: 'index'}" @click="$emit('close')">العودة للموقع</NuxtLink>
            <NuxtLink class="-mx-3 block rounded-lg px-3 py-4 font-medium hover:bg-gray-50" :to="{name: 'accounts-new-password'}" @click="$emit('close')">تغيير كلمة المرور</NuxtLink>    
            <NuxtLink class="-mx-3 block rounded-lg px-3 py-4 font-medium hover:bg-gray-50"
                :to="{ name: 'dashboardv2-settings' }" @click="$emit('close')" tabindex="-1">إعدادات الموقع</NuxtLink>      
            <button style="width:-webkit-fill-available" class="-mx-3 text-right block rounded-lg px-3 py-4 font-medium hover:bg-gray-50"
                @click="showConfirmDailog = true">
                تسجيل الخروج
            </button>
        </div>
        <ConfirmDialog v-if="showConfirmDailog" title="هل انت متاكد؟"
            descritpion="هل انت متأكد من انك تريد تسجيل الخروج من حسابك؟" @close="showConfirmDailog = false"
            @continue="$emit('logout')" />
    </div>
</template>

<script setup lang="ts">
import { PencilSquareIcon, ArrowLeftStartOnRectangleIcon } from '@heroicons/vue/24/outline';
const { data, status } = useAuth();

let showConfirmDailog = ref(false)
</script>

<style scoped></style>
