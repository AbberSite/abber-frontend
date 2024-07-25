<template>
  <DashboardTitle department="المالية" title="طلبات السحب" />
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
            <DashboardFiltersDropdown v-if="openFiltersDropdown"
              v-on-click-outside="() => (openFiltersDropdown = false)">
              <DashboardWithdrawalRequestsFilter />
            </DashboardFiltersDropdown>
          </transition>
        </ClientOnly>
      </div>
    </div>
  </div>
  <DashboardTablesTable :headItems="headItems" :bodyItems="list" :loading="loading" :actions="{ modify: true }">
  </DashboardTablesTable>

  <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />
  <ClientOnly>
    <DashboardFiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false">
      <DashboardWithdrawalRequestsFilter />
    </DashboardFiltersMobileModal>
  </ClientOnly>

  <ClientOnly>
    <ModifyModal v-if="showModal" @close="showModal = false;" title="الإجراءات">
      <div :class="$style.style_every_dev" v-if="!dataSelection.updated">
        <h1 class="font-semibold mb-2"> تغيير حالة الطلب :</h1>
        <select name="action" id="actions" class="form-control form-select h-[50px] appearance-none"
          v-model="dataSelection.status">
          <option :value="null">إختر</option>
          <option value="2">تم إرسال المستحقات</option>
          <option value="3">رفض الطلب</option>
        </select>
      </div>
      <div :class="$style.style_every_dev" v-if="dataSelection.status == '3' && !dataSelection.updated">
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

  <ClientOnly>
    <ModifyModal v-if="showImageModal" @close="showImageModal = false;" :title="'عرض الإيصال'">
      <div class="flex justify-center items-center">
        <template v-if="isPdf">
          <embed :src="img_url" height="300px" width="100%" />
        </template>
        <template v-else>
          <NuxtImg :src="img_url" alt="invoice" width="100%" />
        </template>
      </div>
    </ModifyModal>
  </ClientOnly>

</template>
<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';
import { useDashboardWithdrawalRequestsStore } from '~/stores/dashboard/dashboardWithdrawalRequests';

const { filters, list, loading, filtersCount, pagination } = storeToRefs(useDashboardWithdrawalRequestsStore());
const { fetchAll } = useDashboardWithdrawalRequestsStore();
const { $listen } = useNuxtApp();
provide('previewFiles', true);
provide('dateFilters', 'withdrawalRequests');
provide('otherCheckStatus', (data) => (!data?.invoice && (data?.status === '1' || data?.status === '2')) ||
  (data?.invoice && data?.status === '1'), true);
const showModal = ref(false);
let showImageModal = ref(false);
// let imageLoading = ref(true);
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const loadingButton = ref(false);
let isPdf = ref(false);
let img_url = ref(null);
let dataSelection = reactive({
  id: null,
  status: null,
  refuse_reason: null,
  invoice: null,
  updated: false
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
  invoice: 'الإيصال',
};

$listen('table-modify-object', (data: Object) => {
  dataSelection.id = data.id;

  const isUpdated = data.status === '2' || data.status === '3';
  dataSelection.updated = isUpdated;

  if (isUpdated) {
    dataSelection.status = data.status;
    dataSelection.refuse_reason = data.refuse_reason || null;
  } else {
    dataSelection.status = null;
    dataSelection.refuse_reason = null;
  }

  showModal.value = true;
});

$listen('table-preview-files', (data: { url: string }) => {
  const { url } = data;
  isPdf.value = url.endsWith('.pdf');
  if (url) {
    img_url.value = url;
    showImageModal.value = true;
  }
});


const submit = async () => {
  loadingButton.value = true;
  const formdata = new FormData();

  if (!dataSelection.updated) {
    formdata.append('status', dataSelection.status);
    formdata.append('paid', dataSelection.status === '2');
    formdata.append('refuse_reason', dataSelection.refuse_reason);
  }

  if (dataSelection.invoice) {
    const randomFileName = `invoice_${dataSelection.id}_${new Date().toISOString()}.${dataSelection.invoice.name.split('.').pop()}`;
    const blob = dataSelection.invoice.slice(0, dataSelection.invoice.size, dataSelection.invoice.type);
    const renamedInvoice = new File([blob], randomFileName, { type: dataSelection.invoice.type });
    formdata.append('invoice', renamedInvoice);
  }

  try {
    await useProxy(`/wallets/dashboard-withdrawal-requests/${dataSelection.id}/`, {
      method: dataSelection.updated ? "PATCH" : 'PUT',
      body: formdata
    });
    useNotification({ type: 'success', content: 'تم تحديث الطلب بنجاح.' });
  } catch (error) {
    useNotification({ type: 'danger', content: 'لقد حدث خطأ ما، يرجى إعادة المحاولة.' });
  } finally {
    showModal.value = false;
    clearModal();
    await fetchAll();
    loadingButton.value = false;
  }
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