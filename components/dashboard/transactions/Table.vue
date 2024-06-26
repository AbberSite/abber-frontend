<script setup lang="ts">
defineProps<{ list: [] }>();

</script>

<template>
  <div class="is-scroll w-full overflow-x-auto pt-6">
    <table class="w-full text-sm ltr:text-left rtl:text-right">
      <thead class="border-b border-t">
        <tr class=" bg-gray-2 text-right dark:bg-meta-4">
          <OrdersTableHeaderCol content="رقم المعاملة" />
          <OrdersTableHeaderCol content="رقم الطلب/الفاتورة" />
          <OrdersTableHeaderCol content="المبلغ" />
          <OrdersTableHeaderCol content="عملية ناجحة" />
          <OrdersTableHeaderCol content="نوع العملية" />
          <OrdersTableHeaderCol content="وسيلة الدفع" />
          <OrdersTableHeaderCol content="تاريخ العملية" />
          <OrdersTableHeaderCol content="المستخدم" />
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="(item, index) in list" :key="index" class="">

          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <h5 class="font-medium text-black">{{ item.id }}</h5>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">#{{ item?.process_id }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item?.amount }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <svg v-if="item?.performed" class="w-5 h-5 text-green-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z" clip-rule="evenodd"/>
</svg>
<svg v-else class="w-5 h-5 text-red-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>

          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item.type }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <DashboardTransactionsTypePayment :type="item.method"/>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ useArabicFormattedDate(item.date) }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item.user }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
