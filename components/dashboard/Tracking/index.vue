<template>
  <div>
    <DashboardTablesTable :head-items="headItems" :body-items="list" :loading="loading" />
    <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />
  </div>
</template>

<script lang="ts" setup>
import { useDashboardSimpleStore } from "~/stores/dashboard/dashboardSimpleStore";

const props = defineProps<{ objectId: String | Number; contentType: String | Number }>();
const contentTypeDict = {
  order: 42,
};
const contentType_ = contentTypeDict[props.contentType];

const headItems = { user: "المستخدم", action_flag: "نوع الإجراء", action_time: "تاريخ الاجراء", change_message: "إجراء" };

const { list, pagination, endpoint, loading } = storeToRefs(useDashboardSimpleStore());
const { fetchAll } = useDashboardSimpleStore();

onMounted(async () => {
  endpoint.value = "/tracking/log-entry/";

  fetchAll({ object_id: props.objectId, content_type: contentType_ });
});
</script>

<style></style>
