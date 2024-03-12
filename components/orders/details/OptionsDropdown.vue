<template>
    <div
    class="absolute top-[calc(100%+15px)] z-20 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
    >
    <button
        class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50"
        type="button"
        @click="$emit('show-review')"
        role="menuitem"
        v-if="!order?.add_review"
        tabindex="-1">
        تقييم المعبر
    </button>

    <button
        class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50"
        type="button"
        @click="$emit('show-review')"

        role="menuitem"
        tabindex="-1">
        الإبلاغ عن مشكلة
    </button>

    <a
        class="block px-4 pb-1.5 pt-3 text-sm font-medium text-red-600 hover:bg-gray-50"
        href="#"
        role="menuitem"
        tabindex="-1"
        >إلغاء الطلب</a
    >

</div>
</template>

<script setup lang="ts">


const { order } = storeToRefs(useOrdersStore())

</script>

<style scoped>

</style>