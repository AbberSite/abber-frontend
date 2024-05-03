<template>
    <!-- <TransitionRoot as="template">
    <div class="fixed inset-0 sm:hidden z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
      </TransitionChild>

      <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full "
        enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0"
        leave-to="translate-y-full" as="template">
        <div
          class="is-scroll fixed bottom-0 z-40 max-h-[800px] w-full overflow-y-auto rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6 sm:hidden"
          v-cloak>
          <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button" @click="$emit('close')"></button>
          <nav class="pt-6">
            <h1 class="font-semibold text-lg border-b py-3">شروط استلام الطلب</h1>
            <div class="pt-3" v-html="settings?.policy_settings?.order_terms"/>
            <PrimaryButton class="w-full my-2 items-center" >إستلام الطلب وتقييمه</PrimaryButton>
          </nav>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot> -->


    <TransitionRoot appear :show="true" as="template">
        <Dialog as="div" class="relative z-50" @close="emit('close')" >
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95" >
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all">
                            <DialogTitle as="div" class="flex justify-between items-center" >
                              <h3 class="text-lg font-medium leading-6 text-gray-900">شروط استلام الطلب</h3>
                              <XMarkIcon class="w-6 h-6 cursor-pointer" @click="emit('close')"/>
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500"  v-html="settings?.policy_settings?.order_terms" />
                            </div>

                            <div class="mt-4 flex flex-col gap-2">
                                <PrimaryButton :loading="loading"
                                    class="w-full"
                                    @click="completeOrder()">
                                    إستلام الطلب وتقييمه
                                </PrimaryButton>
                                <PrimaryButton :loading="loadingWithoutReview"
                                    class="w-full text-black"
                                    @click="completeOrder(true)">
                                    تلقي الطلب والتقييم لاحقا
                                </PrimaryButton>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
// import { TransitionRoot, TransitionChild } from "@headlessui/vue";
import { XMarkIcon } from '@heroicons/vue/24/outline';
const { settings } = storeToRefs(useSettingsStore());
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,

} from '@headlessui/vue';
const props = defineProps<{
  order: Order;
  isSeller: boolean;
  isBuyer: boolean;
}>();
const emit = defineEmits(['rating', 'close'])
const loading = ref(false);
let loadingWithoutReview = ref(false)
const { updateOrderStatus } = useOrdersStore();

async function completeOrder(noReview?: boolean) {
  if(noReview)
    loadingWithoutReview.value = true;
  else
    loading.value = true;
  
  const statusMessage = () => {
    if (props.isBuyer) {
      return { status: "complete", message: "تم إستلام الطلب" };
    } else {
      if (props.order?.status === "awaiting_delivery") {
        return { status: "re_open", message: "تم إعادة فتح الطلب" };
      } else {
        return { status: "awaiting_delivery", message: "تم تسليم الطلب" };
      }
    }
  };

  await updateOrderStatus(props.order?.id, statusMessage().status);
  useNotification({ content: statusMessage().message, type: "success" });
  if(!noReview){
    emit('rating');
    loading.value = false;
  } else {
    loadingWithoutReview.value = false;
    emit('close');
  }
}
</script>