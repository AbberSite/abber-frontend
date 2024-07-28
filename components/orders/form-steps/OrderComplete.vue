<template>
    <div>
        <div class="mx-auto w-full max-w-sm pt-10">
            <a
                class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800"
                href="/">
                <span>تصفح الطلبات</span></a
            >
            <div class="pt-4">
                <NuxtLink
                    class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
                    :to="{ name: 'index' }">
                    <span class="ms-3">الصفحة الرئيسية</span>
                </NuxtLink>
            </div>
            <div class="pt-4">
                <NuxtLink
                    class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
                    :to="{ name: 'blog' }">
                    <span class="ms-3">المدونة</span>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import type { OrderForm } from '~/types';



const { reset } = useFormWizard<OrderForm>("order")

onUnmounted(() => {
    reset()
})
</script>

<style scoped></style>
