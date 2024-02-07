<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
          <thead class="border-b border-t">
            <tr>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>الطلب</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>المعبر</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>الحالة</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>العميل</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>النوع</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between pb-2 pe-12 pt-3" type="button"><span>وسيلة الدفع</span></button>
              </th>
              <th class="whitespace-nowrap pb-1 pt-1 font-semibold" scope="col">
                <button class="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 pb-2 pt-3" type="button">
                  <span>التأريخ</span>
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" height="14" width="14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 7.5 7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"></path>
                  </svg>
                </button>
              </th>
              <th class="px-4 pb-1 pt-1" scope="col"></th>
            </tr>
          </thead>
          <tbody class="divide-y">
            <tr>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><a class="text-blue-600" href="#">#235325</a></td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعيمي</td>
              <td class="whitespace-nowrap pe-12">
                <span class="inline-flex items-center space-x-1 rounded-full bg-teal-100 px-3 pb-1 pt-1 text-xs font-medium text-teal-800 rtl:space-x-reverse">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
                  ><span class="pt-1">مكتمل</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">عبدالله النعيمي</td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">محادثة نصية</td>
              <td class="whitespace-nowrap pe-12 font-medium">
                <span class="flex items-center space-x-1 rtl:space-x-reverse">
                  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="18" height="18" viewBox="0 0 48 48">
                    <path fill="#ff9800" d="M32 10A14 14 0 1 0 32 38A14 14 0 1 0 32 10Z"></path>
                    <path fill="#d50000" d="M16 10A14 14 0 1 0 16 38A14 14 0 1 0 16 10Z"></path>
                    <path fill="#ff3d00" d="M18,24c0,4.755,2.376,8.95,6,11.48c3.624-2.53,6-6.725,6-11.48s-2.376-8.95-6-11.48 C20.376,15.05,18,19.245,18,24z"></path></svg
                  ><span class="pt-2">**** 1898</span></span
                >
              </td>
              <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium">06-02-2024</td>
              <td class="flex items-center justify-center px-4 pb-4 pt-5">
                <a href="#" title="عرض الطلب">
                  <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"></path></svg
                ></a>
              </td>
            </tr>

            <!-- <tr is="vue:order-row"></tr> -->

            <OrderRow v-for="order in orders" :key="order.id" :order="order"/>
            
          </tbody>
        </table>
      </div>
</template>

<script setup lang="ts">
import type { Order } from '~/types';

defineProps<{
  orders : Order[]
}>()

</script>

<style scoped>

</style>