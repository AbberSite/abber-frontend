<script setup lang="ts">
import Table from "./Table.vue";
import type { PaginationResponse } from "~/types";
const { requests, loading, pagination } = storeToRefs(useWithdrawalRequestsStore());
const { fetchAll } = useWithdrawalRequestsStore();
onMounted(async () => {
  await fetchAll();
});
</script>

<template>
  <div class="w-full pt-4">
    <SkeletonsTable v-if="loading" />
    <Table v-else :requests="requests" />
    <Pagination class="pt-10" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="9" />
  </div>
</template>
