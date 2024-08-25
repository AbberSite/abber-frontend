<template>
  <tr>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6">#{{ transaction.id }}</td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6">{{ data?.username == transaction.user ? transaction.amount : transaction.process_additional_data.merchant_amount }}
      ر.س.</td>
    <td class="whitespace-nowrap pe-12 font-medium">
      <span class="flex items-center space-x-1 rtl:space-x-reverse">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="cardImages[transaction.method]?.src ?? cardImages['general'].src"
          :class="cardImages[transaction.method]?.class ?? cardImages['general'].class" alt="" srcset="" class="lazyload"/>
        <span class="pt-2">**** 1898</span></span>
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6">
      {{ transaction.type }}
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6">
      {{ transaction.performed ? ' نعم' : 'لا' }}
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6">
      {{ useFormattedDate(transaction.date) }}
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types';
const { data } = useAuth();
defineProps<{
  transaction: Transaction;
}>();

const cardImages: { [key: string]: { src: string; class: string } } = {
  general: { src: '/images/payments/general.svg', class: 'w-6' },
  VISA: { src: '/images/payments/visa.svg', class: 'w-8' },
  MASTER: { src: '/images/payments/mastercard.webp', class: 'w-8' },
  MADA: { src: '/images/payments/mada.png', class: 'w-8' },
  STC_PAY: { src: '/images/payments/stc_pay.webp', class: 'w-8' }
};

</script>

<style scoped></style>
