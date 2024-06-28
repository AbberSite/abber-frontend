<script setup lang="ts">
import OrderStatus from '../tables/OrderStatus.vue';
defineProps<{ orders: [] }>();

</script>

<template>
  <div class="is-scroll w-full overflow-x-auto pt-6">
    <table class="w-full text-sm ltr:text-left rtl:text-right relative z-50">
      <thead class="border-b border-t">
        <tr class=" bg-gray-2 text-right dark:bg-meta-4">
          <OrdersTableHeaderCol content="رقم الطلب" />
          <OrdersTableHeaderCol content="المعبر" />
          <OrdersTableHeaderCol content="العميل" />
          <OrdersTableHeaderCol content="النوع" />
          <OrdersTableHeaderCol content="الحالة" />
          <OrdersTableHeaderCol content="وسيلة الدفع" />
          <OrdersTableHeaderCol content="التاريخ" :order="'date'" />
          <OrdersTableHeaderCol content="إستعراض" />
          <OrdersTableHeaderCol content="التفاصيل" />
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="(item, index) in orders" :key="index" class="cursor-pointer" @click.once="navigateTo(`${item.id}/`)">

          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <h5 class="text-blue-600 ">#{{ item.id }}</h5>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ item?.seller?.first_name }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <NuxtLink class="text-blue-500 font-semibold cursor-pointer"
              :to="`/accounts/dashboard/user-update/${item?.buyer?.id}/#tab0`">{{ item?.buyer?.first_name }}</NuxtLink>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p>{{ item?.type == 'text_communication' ? 'محادثة نصية' : 'محادثة صوتية' }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <OrderStatus :status="item.status" style="width: max-content;" />
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <img v-if="item?.order_item_financial_data.payment_method == 'VISA'"
              src="/images/payments/section/visa-icon.png" class="w-7" alt="">
            <img v-else-if="item?.order_item_financial_data.payment_method == 'MASTER'"
              src="/images/payments/section/mastercard.svg" class="w-7" alt="">
            <img v-else-if="item?.order_item_financial_data.payment_method == 'MADA'"
              src="/images/payments/section/mada.png" class="w-7" alt="">
            <img v-else-if="item?.order_item_financial_data.payment_method == 'APPLEPAY'"
              src="/images/payments/applepay.svg" class="w-7" alt="">
            <svg v-else-if="item?.order_item_financial_data.payment_method == 'BALANCE'"
              class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd"
                d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
                clip-rule="evenodd" />
              <path fill-rule="evenodd"
                d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
                clip-rule="evenodd" />
            </svg>
            <svg v-else-if="item?.order_item_financial_data.payment_method == 'CARD'"
              class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 10h18M6 14h2m3 0h5M3 7v10a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1Z" />
            </svg>
            <img v-else-if="item?.order_item_financial_data.payment_method == 'STC_PAY'" src="/images/payments/section/stc_pay.webp" class="w-7" alt="" />
            <svg v-else class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>

          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black dark:text-white">{{ useArabicFormattedDate(item.order_item_time_data.ordered_date) }}
            </p>
          </td>

          <td class="whitespace-nowrap pb-4 pe-12 pt-6" @click.once="navigateTo(`/orders/${item.id}/`)">
            <button class="hover:text-gray-400 cursor-pointer">
              <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  fill="" />
                <path
                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  fill="" />
              </svg>
            </button>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6" @click.once="navigateTo(`${item.id}/`)">
            <button class="hover:text-gray-400 cursor-pointer">
              <svg class="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M8.99981 14.8219C3.43106 14.8219 0.674805 9.50624 0.562305 9.28124C0.47793 9.11249 0.47793 8.88749 0.562305 8.71874C0.674805 8.49374 3.43106 3.20624 8.99981 3.20624C14.5686 3.20624 17.3248 8.49374 17.4373 8.71874C17.5217 8.88749 17.5217 9.11249 17.4373 9.28124C17.3248 9.50624 14.5686 14.8219 8.99981 14.8219ZM1.85605 8.99999C2.4748 10.0406 4.89356 13.5562 8.99981 13.5562C13.1061 13.5562 15.5248 10.0406 16.1436 8.99999C15.5248 7.95936 13.1061 4.44374 8.99981 4.44374C4.89356 4.44374 2.4748 7.95936 1.85605 8.99999Z"
                  fill="" />
                <path
                  d="M9 11.3906C7.67812 11.3906 6.60938 10.3219 6.60938 9C6.60938 7.67813 7.67812 6.60938 9 6.60938C10.3219 6.60938 11.3906 7.67813 11.3906 9C11.3906 10.3219 10.3219 11.3906 9 11.3906ZM9 7.875C8.38125 7.875 7.875 8.38125 7.875 9C7.875 9.61875 8.38125 10.125 9 10.125C9.61875 10.125 10.125 9.61875 10.125 9C10.125 8.38125 9.61875 7.875 9 7.875Z"
                  fill="" />
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
