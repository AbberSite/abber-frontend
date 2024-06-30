<template>
    <div
    class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base"
    role="tablist"
    aria-labelledby="tablist-profile"
    aria-orientation="horizontal">
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-1"
        type="button"
        @click="activeTab = 'details'"
        role="tab"
        aria-labelledby="tabpanel-preview-1"
        aria-controls="tabpanel-preview-1"
        :class="[
            activeTab === 'details'
                ? 'border-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
        ]">
        البيانات الشخصية
    </button>

    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-2"
        type="button"
        @click="activeTab = 'subscriptions'"
        role="tab"
        aria-labelledby="tabpanel-preview-2"
        aria-controls="tabpanel-preview-2"
        :class="[
            activeTab === 'subscriptions'
                ? 'border-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
        ]">
        <span>الإشتراكات</span>
        <span class="text-white bg-red-500 px-2  py-[1px] rounded-full text-xs font-semibold">جديد</span>
    </button>

    <button v-if="isExperosser()"
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-2"
        type="button"
        @click="activeTab = 'informationsService'"
        role="tab"
        aria-labelledby="tabpanel-preview-2"
        aria-controls="tabpanel-preview-2"
        :class="[
            activeTab === 'informationsService'
                ? 'border-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
        ]">
        <span>بيانات المعبر</span
        >
    </button>
    
    
    <button
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-2"
        type="button"
        @click="activeTab = 'posts'"
        role="tab"
        aria-labelledby="tabpanel-preview-2"
        aria-controls="tabpanel-preview-2"
        :class="[
            activeTab === 'posts'
                ? 'border-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
        ]">
        <span>المفضلة</span
        ><span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
            {{ bookmarkedTotal }}
        </span>
    </button>
    <button 
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        id="tab-2"
        type="button"
        @click="activeTab = 'referralCode'"
        role="tab"
        aria-labelledby="tabpanel-preview-2"
        aria-controls="tabpanel-preview-2"
        :class="[
            activeTab === 'referralCode'
                ? 'border-gray-900'
                : 'border-transparent text-gray-500 hover:text-gray-900'
        ]">
        <span>رمز الدعوة</span
        >
    </button>
    

    
</div>
</template>

<script setup lang="ts">

import { useVModel } from '@vueuse/core'
const {data} = useAuth();
const props = defineProps<{
    modelValue? : string,
}>()
function isExperosser(){
    return data.value.user_type == 'معبر';
}
const { bookmarkedTotal } = storeToRefs(usePostsStore());

const emits = defineEmits(['update:modelValue'])
const activeTab = useVModel(props, 'modelValue', emits)

</script>

<style scoped>

</style>