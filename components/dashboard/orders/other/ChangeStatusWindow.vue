<template>
    <Modal @close="$emit('close')" title="تغيير حالة الطلب">
        <!-- Change status order modal -->
        <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
            <fieldset class="space-y-7">
              <div class="w-full space-y-3" >
                <label class="block text-sm font-semibold xs:text-base" >الحالة</label>
                <select class="form-control form-select h-[50px] appearance-none" name="select" required v-model="status">
                  <option value="awaiting_delivery">بإنتظار الإستلام</option>
                  <option value="in_progress">قيد التقدم</option>
                  <option value="complete">مكتمل</option>
                </select>
              </div>
            </fieldset>
          </div>
    </Modal>
</template>


<script setup lang="ts">
import { useDashOrdersStore } from '~/stores/dashboard/dashOrders';

const props = defineProps<{order: {}}>();
const status = ref(props.order.status ?? '');
const {getOrder} = useDashOrdersStore()
watch(status, async(value)=> {
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/change_status/`, {method: 'POST', body: {status: value}});
  await getOrder(props.order?.id);
  useNotification({type: 'success', content: 'لقد تم تحديث حالة الطلب!'});
})
</script>