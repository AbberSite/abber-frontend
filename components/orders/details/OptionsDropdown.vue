<template>
  <div
    class="absolute top-[calc(100%+15px)] z-20 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
    <button class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button"
      @click="$emit('show-review')" role="menuitem" v-if="order?.add_review" tabindex="-1">
      تقييم المعبر
    </button>

    <a :href="billUrl" target="_blank"
      class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button"
      role="menuitem" tabindex="-1">
      فاتورة الطلب
  </a>

    <button class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button"
      role="menuitem" tabindex="-1">
      الإبلاغ عن مشكلة
    </button>

    <button v-if="isBuyer && order?.status === 'awaiting_delivery' && !order?.content?.inquiry"
      @click="$emit('inquiry')" class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50"
      type="button" role="menuitem" tabindex="-1">
      استفسار للمعبر
    </button>

    <button
      v-if="(['in_progress', 'new'].includes(order?.status) && props.isBuyer) || (order?.status === 'waiting_for_cancellation' && props.isSeller)"
      class="block px-4 pb-1.5 pt-3 text-sm font-medium text-red-600 hover:bg-gray-50" @click="$emit('cancel-order')"
      role="menuitem" tabindex="-1">إلغاء الطلب</button>


  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  isSeller: boolean,
  isBuyer: boolean,
  order: Order,
}>()
const billUrl = `${useRuntimeConfig().public.websiteBasePath}/orders/bill/${props.order?.id}/?action=download`
</script>
