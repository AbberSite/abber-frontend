<template>
            <div v-if="!loading" class="flex items-center justify-between">
                <DashboardTitle department="الطلبات" :title="`الطلب #${order.id}`"/>
                <div class="hidden items-center space-x-3 pb-12 rtl:space-x-reverse sm:flex">
                    <button
                        class="relative flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
                        type="button" @click="showChangeStatusWindow = true;">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99">
                            </path>
                        </svg>
                        <span class="mt-1.5">تغيير حالة الطلب</span>
                    </button>
                    <div class="relative">
                        <button
                            class="flex items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50"
                            type="button" @click="showDropdown= !showDropdown" aria-expanded="false"
                            aria-haspopup="true">
                            <span class="sr-only">فتح قائمة الإجراءات</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z">
                                </path>
                            </svg>
                        </button>
                        <DashboardOrdersOtherDropdown v-if="showDropdown" @close="showDropdown = false;" @TransferOrder="showTransferOrderWindow = true;" @SendMessage="showSendMessageWindow = true;" @sendAlert="showSendAlertWindow = true;" @cancelOrder="showCancelOrderWindow = true;"/>
                    </div>
                </div>
            </div>
            <!-- details order -->
            <DashboardOrdersOtherDetails /> 
        <!-- buttons for mobile -->
        <div class="fixed bottom-0 z-20 flex w-full items-center space-x-3 border-t border-gray-100 bg-white px-4 py-6 rtl:space-x-reverse xs:px-6 sm:hidden">
        <button class="flex h-[50px] w-full items-center justify-center space-x-2 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse" type="button" @click="showChangeStatusWindow = true">
          <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path>
          </svg>
          <span class="mt-1.5">تغيير حالة الطلب</span>
        </button>
        <button class="flex h-[50px] w-[25%] items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50" type="button" @click="showMenuMobile = true;" aria-expanded="false" aria-haspopup="true">
          <span class="sr-only">فتح قائمة الإجراءات</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"></path>
          </svg>
        </button>
      </div>
    <ClientOnly v-if="order?.status">
        <DashboardOrdersOtherChangeStatusWindow :show="showChangeStatusWindow" @close="showChangeStatusWindow = false"
            :order="order" />
        <DashboardOrdersOtherTransferOrderWindow :show="showTransferOrderWindow" @close="showTransferOrderWindow = false;" :order="order"/>
        <DashboardOrdersOtherSendMessageWindow :show="showSendMessageWindow" @close="showSendMessageWindow = false;" :order="order"/>
        <DashboardOrdersOtherSendAlertToExpressorWindow :show="showSendAlertWindow" @close="showSendAlertWindow = false;" :order="order"/>
        <DashboardOrdersOtherCancelOrderWindow :show="showCancelOrderWindow" @close="showCancelOrderWindow = false;" :order="order"/>
        <DashboardOrdersOtherMenuMobile :show="showMenuMobile" @close="showMenuMobile = false;" @TransferOrder="showTransferOrderWindow = true;" @SendMessage="showSendMessageWindow = true;" @sendAlert="showSendAlertWindow = true;" @cancelOrder="showCancelOrderWindow = true;"/>
    </ClientOnly>
</template>

<script setup lang="ts">
import { useDashboardOrdersStore } from '~/stores/dashboard/DashboardOrders';

const { getOrder } = useDashboardOrdersStore();
const { order, loading } = storeToRefs(useDashboardOrdersStore())
const route = useRoute();
const showChangeStatusWindow = ref(false);
const showDropdown = ref(false);
const showTransferOrderWindow = ref(false);
const showSendMessageWindow = ref(false);
const showSendAlertWindow = ref(false);
const showCancelOrderWindow = ref(false);
const showMenuMobile = ref(false);
onMounted(async () => {
    await getOrder(route.params?.id)
})

</script>