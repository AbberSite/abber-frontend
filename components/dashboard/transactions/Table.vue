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
            <p class="text-black">{{ item?.number_invoice }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item?.amount }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item.isChecked }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item.type }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <DashboardTransactionsTypePayment :type="item.typePayment"/>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ useArabicFormattedDate(item.date) }}</p>
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">
            <p class="text-black">{{ item.first_name }}</p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
