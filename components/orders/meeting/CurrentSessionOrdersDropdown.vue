<template>
  <div class="relative">
    <button class="relative flex items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50" type="button" @click="showOrdersDropdown = true" aria-expanded="false" aria-haspopup="true">
      <span class="sr-only">فتح قائمة الطلبات</span>
      <span class="absolute top-[3px] h-[20px] w-[20px] rounded-full border border-white bg-red-600 text-white leading-tight ltr:left-0 rtl:right-0" v-text="orders.length"></span>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    </button>

    <transition enter-active-class="transition-all" leave-active-class="transition-all" enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
      <div v-if="showOrdersDropdown && orders.length > 0" class="absolute top-[calc(100%+15px)] z-20 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
        <template v-for="(order, index) in orders">
          <button v-on-click-outside="() => (showOrdersDropdown = false)" v-if="order.status === 'in_progress'" class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button" role="menuitem" tabindex="-1">تسليم طلب {{ order.buyer.first_name }}</button>
        </template>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { vOnClickOutside } from "@vueuse/components";

const showOrdersDropdown = ref(false);
defineProps<{
  orders: Order[];
}>();
</script>
