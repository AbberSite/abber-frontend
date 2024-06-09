<template>
    <div
    class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base"
    role="tablist"
    aria-labelledby="tablist-wallet"
    aria-orientation="horizontal">
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="summary"
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
        id="operations"
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
        id="statement"
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
        id="cards"
        type="button"
        @click="activeTab = 'cards'"
        role="tab"
        aria-labelledby="tabpanel-preview-4"
        aria-controls="tabpanel-preview-4"
        :class="
            activeTab === 'cards' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        <span>البطاقات الإئتمانية</span>
        <Loading class="w-3 h-3" v-if="loading" /> 
        <span v-else class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            {{cards?.count}}
        </span>
    </button>
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="withdrawalRequests"
        type="button"
        @click="activeTab = 'withdrawalRequests'"
        role="tab"
        aria-labelledby="tabpanel-preview-4"
        aria-controls="tabpanel-preview-4"
        :class="
            activeTab === 'withdrawalRequests' ? 'border-gray-900' : 'border-transparent text-gray-500 hover:text-gray-900'
        ">
        <span>طلبات السحب</span>
        <Loading class="w-3 h-3" v-if="loading" /> 
        <span v-else class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            {{requests.length}}
        </span>
    </button>
</div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue?: 'summary' | 'operations' | 'statement' | 'cards' | 'withdrawalRequests';
}>();
let loading = ref(true);
const { pagination } = storeToRefs(useTransactionsStore())
const emits = defineEmits(['update:modelValue']);
const activeTab = useVModel(props, 'modelValue', emits);
let cards;
const {requests} = storeToRefs(useWithdrawalRequestsStore());
const {fetchAll} = useWithdrawalRequestsStore();
onMounted(async()=> {
    cards = await useProxy('/wallets/cards/');
    await fetchAll();
    loading.value = false;
})

</script>

<style scoped></style>
