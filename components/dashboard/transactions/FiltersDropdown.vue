<template>
  <div class="absolute top-[calc(100%+15px)] hidden sm:flex flex-col gap-2 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-cloak>
    <div class="space-y-3">
      <DashboardTransactionsDateFilters/>
    </div>
    <div class="flex justify-between mt-3">
      <div>
        <DashboardTransactionsFiltersTransactionSuccess />
      </div>
      <div>
        <h3 class="text-sm font-semibold">نوع العملية</h3>
        <DashboardTransactionsFiltersTransactionType />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
