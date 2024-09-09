<template>
  <button @click="confirmOrderQuality" class="flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-medium text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse cursor-pointe">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
    </svg>
    <span>
      ضبط الجودة
    </span>
  </button>
</template>

<script lang="ts" setup>
const { order } = storeToRefs(useOrdersStore());
const confirmOrderQuality = async ()=>{
  try {
    const response = await  useDirectApi(`/orders/dashboard-orders/${order.value.id}/update_content/`,{
      method: 'POST',
      body: {
        well_provided: true
      }
    });
    window.close()
  }catch(e){}
}
</script>

<style></style>
