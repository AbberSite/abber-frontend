<template>
  <Modal @close="$emit('close')" title="إرسال رسالة">
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
      <fieldset class="space-y-5">
        <CustomSelect
          v-model="sender"
          :options="[
            { value: 'buyer', label: 'العميل' },
            { value: 'seller', label: 'المعبر' }
          ]"
          label="المرسل"
          placeholder="اختر المرسل" />
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base" >الرسالة</label>
          <textarea class="form-control block max-h-[300px] min-h-[200px] py-4" name="textarea"
            rows="5" required v-model="message"></textarea>
        </div>
      </fieldset>
    </div>
    <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
      <PrimaryButton
        class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800"
        type="submit" @click="submit()" :loading="loading"><span>إرسال</span></PrimaryButton>
    </div>
  </Modal>
</template>


<script setup lang="ts">
import { useDashboardOrdersStore } from '~/stores/dashboard/dashboardOrders';
const showConfirmDialog = ref(false); 
const emit = defineEmits(['close']);
const props = defineProps<{ order: {} }>();
const sender = ref('buyer');
const message = ref('');
const { getOrder } = useDashboardOrdersStore()
let loading = ref(false);
async function submit() {
  loading.value = true;
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/send_message/`, { method: 'POST', body: { sender: sender.value, message: message.value } });
  await getOrder(props.order?.id);
  message.value = '';
  useNotification({ type: 'success', content: 'لقد تم إرسال الرسالة بنجاح!' });
  emit('close');
  loading.value = false;
}
</script>
