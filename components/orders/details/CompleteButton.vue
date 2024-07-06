<template>
  <a v-if="((order?.status == 'awaiting_delivery' ) || (order?.status == 'in_progress' && isSeller)) && order?.service" class="flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse cursor-pointer" @click.prevent="emit('showIt')">
    <template v-if="loading">
      <Loading />
    </template>
    <template v-else>
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z"></path>
      </svg>
      <span class="mt-1.5" v-text="isSeller ? (order?.status == 'in_progress' ? 'تسليم الطلب' : 'إعادة فتح الطلب') : isBuyer ? 'إستلام الطلب' : ''"></span>
    </template>
  </a>
</template>

<script lang="ts" setup>
const props = defineProps<{
  order: Order;
  isSeller: boolean;
  isBuyer: boolean;
}>();

const emit = defineEmits(["showIt"]);

const loading = ref(false);

// const { updateOrderStatus } = useOrdersStore();
</script>

<style></style>
