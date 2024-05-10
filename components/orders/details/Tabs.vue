<template>
    <div
        class="sticky is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-8 text-sm rtl:space-x-reverse xs:text-base lg:hidden"
        role="tablist"
        aria-labelledby="tablist-profile"
        aria-orientation="horizontal">
        
        <button
            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
            id="tab-2"
            type="button"
            @click="activeTab = 'chat'"
            role="tab"
            aria-labelledby="tabpanel-preview-2"
            aria-controls="tabpanel-preview-2"
            :class="{
                'border-gray-900': activeTab === 'chat',
                'border-transparent text-gray-500 hover:text-gray-900': activeTab === 'details'
            }">
            المحادثة
        </button>
        <button
            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
            id="tab-1"
            type="button"
            @click="activeTab = 'details'"
            role="tab"
            aria-labelledby="tabpanel-preview-1"
            aria-controls="tabpanel-preview-1"
            :class="{
                'border-gray-900': activeTab === 'details',
                'border-transparent text-gray-500 hover:text-gray-900': activeTab === 'chat'
            }">
            تفاصيل الطلب
        </button>
    </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue?: 'details' | 'chat';
}>();

const emits = defineEmits(['update:modelValue']);
const activeTab = useVModel(props, 'modelValue', emits);
</script>

<style scoped></style>
