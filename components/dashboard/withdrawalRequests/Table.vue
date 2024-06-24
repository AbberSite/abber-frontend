<script setup lang="ts">
import { ref } from 'vue'
import OrderStatus from '../tables/OrderStatus.vue';
import OrderType from '../tables/OrderType.vue';
defineProps<{ list: [] }>();

</script>

<template>
  <div class="is-scroll w-full overflow-x-auto pt-6">
    <table class="w-full text-sm ltr:text-left rtl:text-right">
      <thead class="border-b border-t">
        <tr class=" bg-gray-2 text-right dark:bg-meta-4">
          <OrdersTableHeaderCol content="رقم الطلب" />
          <OrdersTableHeaderCol content="العميل" />
          <OrdersTableHeaderCol content="المبلغ القابل للسحب" />
          <OrdersTableHeaderCol content="المبلغ" />
          <OrdersTableHeaderCol content="رسوم السحب" />
          <OrdersTableHeaderCol content="مبلغ التحويل" />
          <OrdersTableHeaderCol content="نوع الرصيد" />
          <OrdersTableHeaderCol content="حالة الطلب" />
          <OrdersTableHeaderCol content="تاريخ الطلب" />
          <OrdersTableHeaderCol content="الوظائف" />
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="(item, index) in list" :key="index" class="">

          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <h5 class="font-medium text-black dark:text-white">{{ item.id }}</h5>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item?.seller?.first_name }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item?.withdrawal_amount }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item.amount }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item.tax }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item.transfer_amount }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item.type }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item.status }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ useArabicFormattedDate(item.date) }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <div class="flex items-center gap-4 justify-center">
              <button class="hover:text-green-400/80 text-green-600" title="الموافقة">
                <svg width="18" height="18" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                  viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z"
                    clip-rule="evenodd" />
                </svg>

              </button>
              <button class="text-red-500 hover:text-red-300/80" title="الرفض">
                <svg :aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                    d="m6 6 12 12m3-6a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>

              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
