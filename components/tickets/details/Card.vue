<template>
  <div :class="boxStyle">
    <div :class="rowStyle">
      <div :class="rowTitleStyle">المستخدم</div>
      <NuxtLink class="font-medium text-blue-500" :to="`/accounts/dashboard/user-update/${ticket?.user.id}/#tab0`" v-text="ticket.user.first_name"/>
    </div>
    <div :class="rowStyle">
      <div :class="rowTitleStyle">حالة التذكرة</div>
      <TicketStatus :status="ticket?.status" />
    </div>
    <div :class="rowStyle">
      <div :class="rowTitleStyle">تاريخ فتح التذكرة</div>
      <div class="font-medium">
        {{ useFormattedDate(ticket?.date) }}
      </div>
    </div>
    <div :class="rowStyle">
      <div :class="rowTitleStyle">طلب العميل</div>
      <div class="font-medium" v-text="ticket.title"></div>
    </div>
    <div :class="rowStyle" v-if="ticket?.status == 'مفتوحة'">
      <div :class="rowTitleStyle">إغلاق التذكرة</div>
      <div class="font-medium cursor-pointer" @click="showCloseTicketDialog = true">
        <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="20" width="20">
          <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </div>
    </div>
    <ConfirmDialog v-if="showCloseTicketDialog" title="إغلاق التذكرة" descritpion="هل انت متأكد من انك تريد اغلاق التذكرة؟" @continue="closeTicket" @close="showCloseTicketDialog = false" />
  </div>
</template>
<script setup lang="ts">
import TicketStatus from "../TicketStatus.vue";
const { ticket } = storeToRefs(useTicketsStore());
let showCloseTicketDialog = ref<boolean>(false);
const props = defineProps<{ device: String }>();
const isMobile = computed(() => props.device === "mobile");
const boxStyle = computed(() => (isMobile.value ? "grid w-full gap-x-8 gap-y-14 pb-36 pt-16 sm:grid-cols-2 lg:hidden lg:grid-cols-3 px-1" : "px-6 pt-6"));
const rowStyle = computed(() => (isMobile.value ? "w-full space-y-4" : "flex items-center justify-between py-4"));
const rowTitleStyle = computed(() => (isMobile.value ? "text-sm font-medium text-gray-500 xs:text-base" : "font-medium text-gray-500"));

const closeTicket = async () => {
  useApi(`/api/tickets/${ticket.value.id}/close/`, {
    method: "DELETE",
  }).then((res) => {
    showCloseTicketDialog.value= false;
    ticket.value = res;
    useNotification({ type: "success", content: "لقد تم إغلاق التذكرة" });
  });
};
</script>

<style scoped></style>
