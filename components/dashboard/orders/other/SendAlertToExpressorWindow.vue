<template>
    <Modal @close="$emit('close')" title="إرسال تنبيه للمعبر">
      <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
            <fieldset class="space-y-5">
              <div class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm" x-show="alert" role="alert">
                <div class="mt-1.5 flex">
                  <span class="me-3 flex-shrink-0">
                    <!-- Heroicon name: outline/exclamation-circle  -->
                    <svg class="text-yellow-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"></path>
                    </svg>
                  </span>
                  <div class="w-0 flex-1 text-sm font-medium leading-loose">انت علي وشك إرسال تنبيه للمعبر؟</div>
                </div>
              </div>
            </fieldset>
          </div>
          <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]">
            <PrimaryButton class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800" type="submit" @click="sendAlert()" :loading="loading"><span>إرسال الان</span></PrimaryButton>
          </div>
    </Modal>
</template>


<script setup lang="ts">
const emit = defineEmits(['close']);
const props = defineProps<{order: {}}>();
let loading = ref(false);
async function sendAlert() {
  loading.value = true;
  await useDirectApi(`/orders/dashboard-orders/${props.order?.id}/send_alert/`);
  loading.value = false;
  useNotification({type: 'success', content: 'لقد تم ارسال تنبيه للمعبر!'});
  emit('close');
}
</script>