<template>
  <div class="fixed z-50 bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
    <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button" @click="isOpen = true" aria-label="إضافة">
      <!-- Heroicon name: outline/plus -->
      <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
      </svg>
    </button>
  </div>

  <ProfileServiceCreateNewCoupon :show="isOpen" @close="isOpen = false" @refresh-coupons="refreshCoupons()" />
  <div class="is-scroll w-full overflow-x-auto">
    <SkeletonsTable v-if="loading" />
    <p v-else-if="!coupons.length" class="text-center">لا يوجد لديك اي كوبون حاليا</p>
    <table v-else class="w-full text-sm ltr:text-left rtl:text-right">
      <thead class="border-b border-t">
        <tr>
          <OrdersTableHeaderCol content="الرمز" />
          <OrdersTableHeaderCol content="تاريخ بدء الكوبون" />
          <OrdersTableHeaderCol content="تاريخ انتهاء الكوبون" />
          <OrdersTableHeaderCol />
        </tr>
      </thead>
      <tbody class="divide-y">
        <tr v-for="coupon of coupons" :key="coupon.id">
          <td class="whitespace-nowrap pb-4 pe-12 pt-6">
            {{ coupon.code }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6">
            {{ useFormattedDate(coupon.start_date) }}
          </td>
          <td class="whitespace-nowrap pb-4 pe-12 pt-6">
            {{ useFormattedDate(coupon.end_date) }}
          </td>
          <td class="flex justify-center items-center pb-4 pe-4 pt-5">
            <button type="button" title="حذف" @click="deleteCoupon(coupon.id)">
              <!-- Heroicon name: outline/trash -->
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"></path>
              </svg>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { Coupon } from "~/types";
let coupons = ref<Coupon[]>([]);
let isOpen = ref(false);
let loading = ref(false);
onMounted(async () => {
  refreshCoupons();
});
async function refreshCoupons() {
  loading.value = true;
  coupons.value = await useApi("/api/coupons");
  loading.value = false;
}
async function deleteCoupon(id: number) {
  loading.value = true;
  await useDirectApi("/coupons/coupons/" + id, {
    method: "DELETE",
  }).then(() => {
    loading.value = false;
    useNotification({ type: "success", content: "لقد تم حذف الكوبون" });
    refreshCoupons();
  });
}
</script>
