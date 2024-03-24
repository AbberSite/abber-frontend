<template>
  <!-- <tr>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">#{{ transaction.id }}</td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">{{ transaction.amount }} ر.س.</td>
        <td class="whitespace-nowrap pe-12 font-medium">
            <span class="flex items-center space-x-1 rtl:space-x-reverse">
                <img :src="cardImages[transaction.method]?.src ?? cardImages['general'].src" :class="cardImages[transaction.method]?.class ?? cardImages['general'].class" alt="" srcset="">
                <span class="pt-2">**** 1898</span></span
            >
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            {{ transaction.type }}
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            {{ transaction.status == 'pending' ? 'قيد التنفيذ' : (transaction.status == 'transferred' ? ' نعم' : 'لا') }}
        </td>
        <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            {{ useFormattedDate(transaction.date) }}
        </td>
    </tr>
 -->

  <tr>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">#{{ transaction.id }}</td>
    <td class="whitespace-nowrap pe-12 font-medium">
      <span class="flex items-center space-x-1 rtl:space-x-reverse">
        <img :src="cardImages[transaction.method]?.src ?? cardImages['general'].src"
          :class="cardImages[transaction.method]?.class ?? cardImages['general'].class" alt="" srcset="">
        <span class="pt-2">**** 1898</span></span>
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">{{ transaction.type }}</td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
      {{ credit == 0 ? '-' : credit + ' ر.س. ' }}
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
      {{ debit == 0 ? '-' : debit + ' ر.س. ' }}
    </td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">{{ record?.balance }} ر.س.</td>
    <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">{{ useFormattedDate(transaction.date) }}</td>
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
  VISA: { src: '/images/payments/visa.webp', class: 'w-8' },
  MASTER: { src: '/images/payments/mastercard.webp', class: 'w-8' },
  MADA: { src: '/images/payments/mada.png', class: 'w-8' },
  STC_PAY: { src: '/images/payments/stc_pay.webp', class: 'w-8' }
};

</script>

<style scoped></style>
