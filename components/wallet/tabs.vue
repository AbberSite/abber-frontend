<template>
    <div
    class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base"
    role="tablist"
    aria-labelledby="tablist-wallet"
    aria-orientation="horizontal">
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-1"
        type="button"
        @click="activeTab = 'summary'"
        role="tab"
        aria-labelledby="tabpanel-preview-1"
        aria-controls="tabpanel-preview-1"
        :class="
            activeTab === 'summary' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        الملخص المالي
    </button>
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-2"
        type="button"
        @click="activeTab = 'operations'"
        role="tab"
        aria-labelledby="tabpanel-preview-2"
        aria-controls="tabpanel-preview-2"
        :class="
            activeTab === 'operations' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        <span>العمليات المالية</span
        ><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            <Loading class="w-3 h-3" v-if="loading" /> 
            <template v-else>
                {{ pagination?.count ?? 0 }}
            </template>
        </span>
    </button>
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-3"
        type="button"
        @click="activeTab = 'statement'"
        role="tab"
        aria-labelledby="tabpanel-preview-3"
        aria-controls="tabpanel-preview-3"
        :class="
            activeTab === 'statement' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        <span>كشف الحساب</span
        ><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            <Loading class="w-3 h-3" v-if="loading" /> 
            <template v-else>
            {{ pagination?.count ?? 0 }}
            </template>
        </span>
    </button>
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-4"
        type="button"
        @click="activeTab = 'cards'"
        role="tab"
        aria-labelledby="tabpanel-preview-4"
        aria-controls="tabpanel-preview-4"
        :class="
            activeTab === 'cards' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        <span>البطاقات الإئتمانية</span
        ><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            {{cardsCount}}
        </span>
    </button>
</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue?: 'summary' | 'operations' | 'statement' | 'cards';
}>();
const { pagination, loading } = storeToRefs(useTransactionsStore())
const emits = defineEmits(['update:modelValue']);
const activeTab = useVModel(props, 'modelValue', emits);
const {count:cardsCount} = await useProxy('/wallets/cards/');

</script>

<style scoped></style>
