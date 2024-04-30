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
        <Dialog as="div" class="relative z-50" >
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
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                شروط استلام الطلب
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500"  v-html="settings?.policy_settings?.order_terms" />
                            </div>

                            <div class="mt-4">
                                <PrimaryButton :loading="loading"
                                    class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                    @click="completeOrder()">
                                    إستلام الطلب وتقييمه
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
const emit = defineEmits(['rating'])
const loading = ref(false);

const { updateOrderStatus } = useOrdersStore();

async function completeOrder() {
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
  emit('rating');
  loading.value = false;
}
</script>