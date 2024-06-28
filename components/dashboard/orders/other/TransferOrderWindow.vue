<template>
    <Modal @close="$emit('close')" title="نقل الطلب">
        <!-- Change status order modal -->
        <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
            <fieldset class="space-y-7">
              <div class="w-full space-y-3" >
                <label class="block text-sm font-semibold xs:text-base" >المعبر</label>
                <select class="form-control form-select h-[50px] appearance-none" name="select" required v-model="id_service">
                  <option v-for="(expressor, index) of expressors" :key="index" :value="expressor.id">{{ expressor.seller.first_name }}</option>
                </select>
              </div>
            </fieldset>
          </div>
    </Modal>
</template>


<script setup lang="ts">
import { useDashOrdersStore } from '~/stores/dashboard/dashOrders';

const props = defineProps<{order: {}}>();
const id_service = ref(props.order.service);
const {getOrder} = useDashOrdersStore()
let expressors = ref([]);
onBeforeMount(async()=> {
  const dataExpress = await useDirectApi(`/services/services/?active=true&admin_active=true&ordering=rate`);
  expressors.value = dataExpress.results;
})
watch(id_service, async(value)=> {
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/transfer_order/`, {method: 'POST', body: {service: value}});
  await getOrder(props.order?.id);
  useNotification({type: 'success', content: 'لقد تم نقل الطلب إلى معبر جديد بنجاح!'});
})
</script>


