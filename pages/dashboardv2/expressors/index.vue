<template>
  <DashboardTitle department="الحسابات" title="المعبرون"/>
  <div class="w-full pt-8">
      <DashboardInputsSearch placeholder="ابحث عن معبر" v-model="filters.search" />
      <DashboardTablesTable
        :head-items="{
          first_name: 'معبر',
          email: 'البريد الالكتروني',
          email_verified: '',
          phone: 'الجوال',
          phone_verified: ''
        }"
        :body-items="list"
        :loading="loading" :actions="{details:true,view:{path:'/expressors/'}}"  property="username"
      />
  </div>
</template>

<script setup lang="ts">
import { useDashboardUsersStore } from '~/stores/dashboard/dashboardUsers';
const { $listen } = useNuxtApp();
const { list, loading, filters } = storeToRefs(useDashboardUsersStore());
let showModifyModal = ref(false);
$listen("table-modify-object", (data: object) => {
  showModifyModal.value = true;
});
onMounted(() => {
  filters.value.user_type__name = "معبر";
});
</script>
