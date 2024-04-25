<template>
  <div class="is-scroll w-full overflow-x-auto" >
    <table class="w-full text-sm ltr:text-left rtl:text-right">
      <thead class="border-b border-t" >
        <tr>
          <NotificationTableHeaderCol content="الإشعار"/>
          <NotificationTableHeaderCol content="نوع الإشعار"/>
          <NotificationTableHeaderCol content="المستخدم"/>
          <NotificationTableHeaderCol content="التاريخ"/>
          <NotificationTableHeaderCol />
        </tr>
      </thead>
      <tbody class="divide-y">
        <Row v-for="notification of notifications" :key="notification?.date" :notification="notification"/>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import NotificationTableHeaderCol from '~/components/notifications/NotificationTableHeaderCol.vue';
import Row from '~/components/notifications/Row.vue';
import type {Notification} from '~/types';
defineProps<{notifications: Notification[]}>();
</script>

<style>

</style>