<template>
    <div
        class="absolute top-[calc(100%+15px)] w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0"
        x-transition x-show="openProfileDropdown" @click.outside="emit('close')" v-cloak>
        <button class="w-full px-4 pb-1.5 pt-3 text-start text-sm font-medium hover:bg-gray-50" type="button"
            @click="emit('transferOrder')" role="menuitem" tabindex="-1">نقل الطلب</button>
        <button class="w-full px-4 pb-1.5 pt-3 text-start text-sm font-medium hover:bg-gray-50" type="button"
            @click="emit('sendMessage')" role="menuitem" tabindex="-1">إرسال رسالة</button>
        <button class="w-full px-4 pb-1.5 pt-3 text-start text-sm font-medium hover:bg-gray-50" type="button"
            @click="emit('sendAlert')" role="menuitem" tabindex="-1">إرسال تنبيه
            للمعبر</button>
        <button class="w-full px-4 pb-1.5 pt-3 text-start text-sm font-medium text-red-600 hover:bg-gray-50"
            type="buuton" @click="emit('cancelOrder')" role="menuitem" tabindex="-1">إلغاء الطلب</button>
    </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['transferOrder', 'sendMessage', 'sendAlert', 'cancelOrder', 'close']);
</script>