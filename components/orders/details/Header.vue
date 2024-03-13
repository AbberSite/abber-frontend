<template>
  <div class="flex items-end justify-between pt-8 sm:w-full sm:pt-0">
    <h1 class="text-lg font-semibold xs:text-xl lg:text-2xl" id="order-details-heading">الطلب #{{ order?.id }}</h1>
    <!-- Options buttons on desktop devices -->
    <div class="hidden items-center space-x-3 rtl:space-x-reverse sm:flex">
      <a v-if="order?.status == 'new' || order?.status == 'in_progress' || (order?.status == 'awaiting_delivery' && isBuyer)"
        class="flex items-center justify-center space-x-1 rounded-md bg-gray-900 px-4 py-3 text-xs font-semibold text-white shadow-sm hover:bg-gray-800 rtl:space-x-reverse"
        @click.prevent="completeOrder" href="/profile/update">
        <template v-if="loading">
          <Loading />
        </template>
        <template v-else>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M4.098 19.902a3.75 3.75 0 0 0 5.304 0l6.401-6.402M6.75 21A3.75 3.75 0 0 1 3 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 0 0 3.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008Z">
            </path>
          </svg>
          <span class="mt-1.5" v-text="completeMessage"></span>
        </template>
      </a>
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
          <DetailsOptionsDropdown @show-review="showReviewModal = true" v-if="showDropdown"
            v-on-click-outside="() => (showDropdown = false)" :is-buyer="isBuyer" :is-seller='isSeller' />
        </transition>
      </div>
    </div>
  </div>

  <DetailsOrderOptionsModal :show="showMobileModal" @close="showMobileModal = false"
    @show-review="showReviewModal = true" />
  <DetailsMobileOptions v-if="showNavigation" @open-modal="showMobileModal = true" />

  <DetailsReviewModal :show="showReviewModal" @close="showReviewModal = false" />
</template>

<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

defineProps<{
  showNavigation?: boolean;
}>();

const { order } = storeToRefs(useOrdersStore());
const { updateOrderStatus } = useOrdersStore();
const { data: user } = useAuth()
const { bus } = useMeetingStore()

const loading = ref(false);

const showDropdown = ref(false);
const showMobileModal = ref(false);
const showReviewModal = ref(false);

const isSeller = user.value.username === order.value?.seller?.username
const isBuyer = user.value.username === order.value?.buyer?.username

const completeMessage = isSeller ? 'تسليم الطلب' : isBuyer ? 'إستلام الطلب' : ''
bus.on(event => event === 'leave' ? showReviewModal.value = true : false)

async function completeOrder() {
  loading.value = true;
  await updateOrderStatus(order.value?.id, isBuyer ? 'complete' : 'awaiting_delivery');

  useNotification({ content: `تم ${completeMessage}`, type: 'success' });
  loading.value = false;
}
</script>

<style scoped></style>
