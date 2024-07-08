<template>
  <div class="relative -mt-2 pb-12">
    <p class="text-sm font-medium text-gray-800">المالية</p>
    <p class="text-lg font-semibold">طلبات السحب</p>
  </div>
  <div class="w-full pt-6">
    <div class="flex items-center justify-between">
      <DashboardInputsSearch placeholder="ابحث عن طلب سحب" v-model="filters.search"
        @openFiltersMobileModal="openFiltersMobileModal = true" />
      <div class="relative">
        <button
          class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-semibold shadow-sm hover:bg-gray-50 sm:flex"
          type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
          <span class="flex items-center space-x-1 rtl:space-x-reverse">
            <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75">
              </path>
            </svg>
            <span class="mt-1.5">تصفية</span>
          </span>
          <span class="ms-1.5 rounded-full bg-gray-900 px-[6.5px] pt-1 text-white">{{ filtersCount }}</span>
        </button>
        <ClientOnly>
          <transition enter-active-class="transition-all" leave-active-class="transition-all"
            enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
            <DashboardWithdrawalRequestsFiltersDropdown v-if="openFiltersDropdown"
              v-on-click-outside="() => (openFiltersDropdown = false)" />
          </transition>
        </ClientOnly>
      </div>
    </div>
  </div>
  <DashboardTablesTable :headItems="headItems" :bodyItems="list" :loading="loading" :actions="{ modify: true }">
  </DashboardTablesTable>

  <!-- <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" /> -->
  <ClientOnly>
    <DashboardWithdrawalRequestsFiltersMobileModal :show="openFiltersMobileModal"
      @close="openFiltersMobileModal = false" />
  </ClientOnly>

  <ClientOnly>
    <ModifyModal v-if="showModal" @close="showModal = false;">
      <div :class="$style.style_every_dev">
        <h1 class="font-semibold mb-2"> تغيير حالة الطلب :</h1>
        <select name="action" id="actions" class="form-control form-select h-[50px] appearance-none"
          v-model="dataSelection.status">
          <option :value="null">إختر</option>
          <option value="2">تم إرسال المستحقات</option>
          <option value="3">رفض الطلب</option>
        </select>
      </div>
      <div :class="$style.style_every_dev" v-if="dataSelection.status == '3'">
        <h1 class="font-semibold">سبب الرفض: </h1>
        <textarea class="form-control block max-h-[300px] min-h-[50px] py-4" name="textarea"
          v-model="dataSelection.refuse_reason"></textarea>
      </div>
      <div :class="$style.style_every_dev" v-if="dataSelection.status == '2'">
        <h1 class="font-semibold">الإيصال: </h1>
        <input class="form-control block max-h-[300px] min-h-[50px] py-4"
          @input="dataSelection.invoice = ($event as any).target.files[0]" type="file" />
      </div>
      <div :class="$style.style_every_dev" v-if="dataSelection.status">
        <PrimaryButton @click="submit" :loading="loadingButton">تأكيد</PrimaryButton>
      </div>
    </ModifyModal>
  </ClientOnly>

</template>
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { useDashWithdrawalRequestsStore } from '~/stores/dashboard/dashWithdrawalRequests';

const { filters, list, loading, filtersCount } = storeToRefs(useDashWithdrawalRequestsStore());
const { fetchAll } = useDashWithdrawalRequestsStore();
const { $listen } = useNuxtApp();

const showModal = ref(false);
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const loadingButton = ref(false);

let dataSelection = reactive({
  id: null,
  status: null,
  refuse_reason: null,
  invoice: null
});

const headItems = {
  id: 'رقم الطلب',
  user: 'العميل',
  withdrawal_amount: 'المبلغ القابل للسحب',
  amount: 'المبلغ',
  fee: 'رسوم السحب',
  net_amount: 'مبلغ التحويل',
  type: 'نوع الرصيد',
  status: 'حالة الطلب',
  date: 'تاريخ الطلب',
};

$listen('table-modify-object', (data) => {
  dataSelection.id = data.id;
  showModal.value = true;
});

const submit = async () => {

  loadingButton.value = true;
  const formdata = new FormData();
  formdata.append('status', dataSelection.status);
  formdata.append('paid', dataSelection.status === '2');
  formdata.append('refuse_reason', dataSelection.refuse_reason);
  if (dataSelection.invoice) {
    formdata.append('invoice', dataSelection.invoice as File);
  }
  try {
    await useDirectApi(`/wallets/dashboard-withdrawal-requests/${dataSelection.id}/`, {
      method: 'PUT',
      body: formdata
    });
    useNotification({ type: 'success', content: 'تم تحديث الطلب بنجاح.' });
  } catch (error) {
    useNotification({ type: 'danger', content: 'حدث خطأ ما' });
    console.error('Error updating request:', error);
  } finally {
    showModal.value = false;
    clearModal();
    await fetchAll();
  }
  loadingButton.value = false;
};

const clearModal = () => {
  dataSelection.status = null;
  dataSelection.refuse_reason = null;
  dataSelection.invoice = null;
};

onMounted(async () => {
  await fetchAll();
});
</script>

<style module>
.style_every_dev {
  @apply flex flex-col gap-2 my-2;
}
</style>