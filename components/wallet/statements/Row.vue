<template>

  <tr>
    <td class="whitespace-nowrap py-5 pe-12">#{{ transaction.id }}</td>
    <td class="whitespace-nowrap pe-12">
      <span class="flex items-center space-x-1 rtl:space-x-reverse">
        <img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="cardImages[transaction.method]?.src ?? cardImages['general'].src"
          :class="cardImages[transaction.method]?.class ?? cardImages['general'].class" alt="" srcset="" class="lazyload"/>
        <span class="pt-2">**** 1898</span>
      </span>
    </td>
    <td class="whitespace-nowrap py-5 pe-12">{{ transaction.type }}</td>
    <td class="whitespace-nowrap py-5 pe-12">
      {{ credit == 0 ? '-' : credit + ' ر.س. ' }}
    </td>
    <td class="whitespace-nowrap py-5 pe-12">
      {{ debit == 0 ? '-' : debit + ' ر.س. ' }}
    </td>
    <td class="whitespace-nowrap py-5 pe-12">{{ record?.balance }} ر.س.</td>
    <td class="whitespace-nowrap py-5 pe-12">{{ useFormattedDate(transaction.date) }}</td>
  </tr>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types';
const { data } = useAuth()
const props = defineProps<{
  transaction: Transaction;
}>();
const record = props.transaction.balance_record.filter((record) => record.user == data.value?.username)[0]
const credit = computed(() => {

  let value = 0
  if (record?.type == 'credit') {
    if (record?.user == data.value?.username) {
      value = props.transaction.amount
    } else {
      value = props.transaction.process_additional_data.merchant_amount
    }
  }

  return value
})

const debit = computed(() => {

  let value = 0

  if (record?.type == 'debit') {
    if (record?.user == data.value?.username) {
      value = props.transaction.amount
    } else {
      value = props.transaction.process_additional_data.merchant_amount
    }
  }

  return value
})


const cardImages: { [key: string]: { src: string; class: string } } = {
  general: { src: '/images/payments/general.svg', class: 'w-6' },
  VISA: { src: '/images/payments/visa.svg', class: 'w-8' },
  MASTER: { src: '/images/payments/mastercard.webp', class: 'w-8' },
  MADA: { src: '/images/payments/mada.png', class: 'w-8' },
  STC_PAY: { src: '/images/payments/stc_pay.webp', class: 'w-8' }
};

</script>

<style scoped></style>
