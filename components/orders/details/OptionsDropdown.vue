<template>
  <div
    class="absolute top-[calc(100%+15px)] z-20 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
    <button class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button"
      @click="$emit('show-review')" role="menuitem" v-if="order?.add_review" tabindex="-1">
      تقييم المعبر
    </button>

    <button class="block w-full px-4 pb-1.5 pt-3 text-right text-sm font-medium hover:bg-gray-50" type="button"
      @click="$emit('show-review')" role="menuitem" tabindex="-1">
      الإبلاغ عن مشكلة
    </button>

    <button v-if="allowCancelOrder" class="block px-4 pb-1.5 pt-3 text-sm font-medium text-red-600 hover:bg-gray-50"
      @click.prevent="cancelOrder" role="menuitem" tabindex="-1">إلغاء الطلب</button>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: User,
}>()

const { order } = storeToRefs(useOrdersStore())
const { updateOrderStatus } = useOrdersStore()
const isSeller = props.user.username === order.value?.seller?.username
const isBuyer = props.user.username === order.value?.buyer?.username

const allowCancelOrder = (['in_progress', 'new'].includes(order.value?.status) && isBuyer) || (order.value?.status === 'waiting_for_cancellation' && isSeller);
async function cancelOrder() {
  await updateOrderStatus(order.value?.id, 'cancelled');
  

  useNotification({ content: isBuyer ? 'تم طلب إلغاء الطلب' : 'تم إلغاء الطلب', type: 'success' });
}
</script>

<style scoped></style>