<template>
  <Modal @close="$emit('close')" title="تغيير حالة الطلب">
    <!-- Change status order modal -->
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-5">
        <div class="w-full space-y-3">
          <CustomSelect
            v-model="status"
            :options="[
              { value: 'awaiting_delivery', label: 'بإنتظار الإستلام' },
              { value: 'in_progress', label: 'قيد التقدم' },
              { value: 'complete', label: 'مكتمل' }
            ]"
            label="الحالة"
            placeholder="اختر الحالة"/>
        </div>
      </fieldset>
    </div>
    <ConfirmDialog v-if="showConfirmDialog" :show="showConfirmDialog"
      :title="`هل انت متاكد من تغييرك حالة الطلب إلى ${getStatus(status)}؟`" descritpion="هل انت متاكد من قرارك؟"
      @close="cancel()" @continue="submit();" />
  </Modal>
</template>


<script setup lang="ts">
import ConfirmDialog from '~/components/shared/ConfirmDialog.vue';
import CustomSelect from '~/components/shared/CustomSelect.vue';
import { useDashboardOrdersStore } from '~/stores/dashboard/dashboardOrders';
const props = defineProps<{ order: {} }>();
let showConfirmDialog = ref(false);
let status = ref(props.order.status ?? '');
const emit = defineEmits(['close'])
const { getOrder, loading } = useDashboardOrdersStore()
watch(status, async (value) => {
  if (props.order?.status != value)
    showConfirmDialog.value = true;
});

async function submit() {
  showConfirmDialog.value = false;
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/change_status/`, { method: 'POST', body: { status: status.value } });
  await getOrder(props.order?.id);
  useNotification({ type: 'success', content: 'لقد تم تحديث حالة الطلب!' });
  emit('close');
};

async function cancel() {
  showConfirmDialog.value = false;
  status.value = props.order?.status;
};
function getStatus(s: string) {
  if (s == 'complete') return 'مكتمل';
  else if (s == 'in_progress') return 'قيد التقدم';
  else return 'في إنتظار الاستلام';
}
</script>