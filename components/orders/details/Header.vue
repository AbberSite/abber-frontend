<template>
  <div class="flex items-end justify-between pt-4 sm:w-full sm:pt-0">
    <h1 class="text-lg font-semibold xs:text-xl lg:text-2xl" id="order-details-heading">الطلب #{{ order?.id }}</h1>
    
    <!-- Options buttons on desktop devices -->
    <div class="hidden items-center space-x-3 rtl:space-x-reverse sm:flex">
      <DetailsCompleteButton :order="order" :is-seller="isSeller" :is-buyer="isBuyer" @showIt="showConfirmComplete = true" />
      <slot></slot>

      <div class="relative">
        <button class="flex items-center justify-center rounded-md border bg-white px-4 py-3 shadow-sm hover:bg-gray-50"
          type="button" @click="showDropdown = true" aria-expanded="false" aria-haspopup="true">
          <span class="sr-only">فتح قائمة الإجراءات</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z">
            </path>
          </svg>
        </button>

        <transition enter-active-class="transition-all" leave-active-class="transition-all"
          enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
          <DetailsOptionsDropdown @show-review="showReviewModal = true" @inquiry="showInquiryModal = true"
            @cancel-order="showConfirmCompleteCancelOrder = true" v-if="showDropdown" v-on-click-outside="() => (showDropdown = false)"
            :order="order" :is-buyer="isBuyer" :is-seller="isSeller" />
        </transition>
      </div>
    </div>
  </div>

  <DetailsConfirmComplete :show="showConfirmComplete" :order="order" :is-seller="isSeller" :is-buyer="isBuyer" @rating="showConfirmComplete = false; showReviewModal = true;" @close="showConfirmComplete = false" :cancel-order="false" />
  <DetailsOrderOptionsModal :show="showMobileModal" @close="showMobileModal = false"
    @show-review="showReviewModal = true" @inquiry="showInquiryModal = true" @cancel-order="showConfirmCompleteCancelOrder = true"
    :order="order" :is-buyer="isBuyer" :is-seller="isSeller" />

  <DetailsMobileOptions v-if="showNavigation" @open-modal="showMobileModal = true">
    <DetailsCompleteButton class="h-[50px] w-full" :order="order" :is-seller="isSeller" :is-buyer="isBuyer" @showIt="showConfirmComplete = true"  />
  </DetailsMobileOptions>

  <DetailsReviewModal :show="showReviewModal" @close="showReviewModal = false" @rated_success="order.add_review = false" />

  <DetailsInquiryModal :show="showInquiryModal" @close="showInquiryModal = false" />
  <Tree class="block lg:hidden"/>
  <DetailsConfirmComplete :show="showConfirmCompleteCancelOrder" :order="order" :is-seller="isSeller" :is-buyer="isBuyer" :cancel-order="true" @cancelOrder="showConfirmCompleteCancelOrder = false; cancelOrder();" @close="showConfirmCompleteCancelOrder = false" />
  
</template>

<script setup lang="ts">
import { vOnClickOutside } from "@vueuse/components";
import Tree from '~/components/shared/Tree.vue';
defineProps<{
  showNavigation?: boolean;
}>();

const { order } = storeToRefs(useOrdersStore());
const { updateOrderStatus } = useOrdersStore();
const { data: user } = useAuth();
const { bus } = useMeetingStore();

const showDropdown = ref(false);
const showMobileModal = ref(false);
const showReviewModal = ref(false);
const showInquiryModal = ref(false);
const showConfirmComplete = ref(false);
const showConfirmCompleteCancelOrder = ref(false);
const isSeller = ref(false);
const isBuyer = ref(false);

const isBuyerOrSeller = () => {
  isSeller.value = user.value.username === order.value?.seller?.username;
  isBuyer.value = user.value.username === order.value?.buyer?.username;
};

await isBuyerOrSeller();
watch(order, (value) => {
  isBuyerOrSeller();
});
bus.on((event) => {
  event === "leave" && isBuyer.value ? (showReviewModal.value = true) : false;
});

async function cancelOrder() {
  await updateOrderStatus(order.value?.id, 'cancelled');
  useNotification({ content: isBuyer.value ? 'تم طلب إلغاء الطلب' : 'تم إلغاء الطلب', type: 'success' });
}

</script>

<style scoped></style>
