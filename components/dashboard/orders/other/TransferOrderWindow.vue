<template>
  <Modal @close="$emit('close')" title="نقل الطلب">
    <!-- Change status order modal -->
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-5">
        <CustomSelect
          v-model="id_service"
          :options="expressors.map((ex) => ({ value: ex.id, label: ex.seller.first_name }))"
          label="المعبر"
          placeholder="اختر المعبر" />
        <div class="w-full">
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" v-model="deleteOldMessages" :checked="deleteOldMessages"/>
          <label class="mt-1.5 ps-3 text-sm">تحويل تفاصيل الحلم فقط</label>
        </div>
        
      </fieldset>
    </div>
    <ConfirmDialog v-if="showConfirmDialog" :show="showConfirmDialog" :title="`هل انت متاكد من نقل الطلب إلى ${getExpressor(id_service)}؟`" descritpion="هل انت متاكد من قرارك؟" @close="cancel()" @continue="submit()" />
  </Modal>
</template>

<script setup lang="ts">
import CustomSelect from "~/components/shared/CustomSelect.vue";
import { useDashboardOrdersStore } from "~/stores/dashboard/dashboardOrders";

const props = defineProps<{ order: {} }>();
const id_service = ref(props.order.service);
const deleteOldMessages = ref(true);

let showConfirmDialog = ref(false);
const { getOrder } = useDashboardOrdersStore();
const emit = defineEmits(["close"]);
let expressors = ref([]);
onBeforeMount(async () => {
  const dataExpress = await useDirectApi(`/services/services/?active=true&admin_active=true&ordering=rate`);
  expressors.value = dataExpress.results;
});

watch(id_service, async (value) => {
  if (value != props.order?.service) showConfirmDialog.value = true;
});

async function submit() {
  showConfirmDialog.value = false;
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/transfer_order/`, { method: "POST", body: { service: id_service.value,delete_old_messages:deleteOldMessages.value } });
  await getOrder(props.order?.id);
  useNotification({ type: "success", content: "لقد تم نقل الطلب إلى معبر جديد بنجاح!" });
  emit("close");
}

async function cancel() {
  showConfirmDialog.value = false;
  id_service.value = props.order?.service;
}

function getExpressor(s: string) {
  let name = "";
  expressors.value.forEach((ex) => {
    if (ex.id == s) {
      name = ex.seller.first_name;
    }
  });
  return name;
}
</script>
