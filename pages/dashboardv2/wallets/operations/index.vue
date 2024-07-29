<template>
  <DashboardTitle department="المالية" title="عمليات على الرصيد (الفروقات)"/>
  <div class="w-full pt-10">
    <div class="flex items-center justify-between">
      <DashboardInputsSearch placeholder="ابحث في العمليات علي الرصيد (الفروقات)" v-model="filters.search"
        @openFiltersMobileModal="openFiltersMobileModal = true" />
      <div class="relative">
        <button
          class="hidden h-[50px] items-center justify-center rounded-md border bg-white px-4 py-3 text-xs font-medium shadow-sm hover:bg-gray-50 sm:flex"
          type="button" @click="openFiltersDropdown = true" aria-expanded="false" aria-haspopup="true">
          <span class="flex items-center space-x-1 rtl:space-x-reverse">
            <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75">
              </path>
            </svg>
            <span>تصفية</span>
          </span>
          <span class="ms-1.5 rounded-full bg-gray-900 px-1.5 py-0.5 text-white">{{ filtersCount }}</span>
        </button>
        <ClientOnly>
          <transition enter-active-class="transition-all" leave-active-class="transition-all"
            enter-from-class="translate-y-4 opacity-0" leave-to-class="translate-y-4 opacity-0">
            <DashboardFiltersDropdown v-if="openFiltersDropdown"
              v-on-click-outside="() => (openFiltersDropdown = false)">
              <DashboardOperationsFilter />
            </DashboardFiltersDropdown>
          </transition>
        </ClientOnly>
      </div>
    </div>
  </div>
  <DashboardTablesTable :headItems="headItems" :bodyItems="list" :loading="loading" addButton>
  </DashboardTablesTable>

  <Pagination class="pt-4" :results="(pagination as PaginationResponse<any>)" @change="fetchAll" per-page="20" />
  <ClientOnly>
    <DashboardFiltersMobileModal :show="openFiltersMobileModal" @close="openFiltersMobileModal = false">
      <DashboardOperationsFilter />
    </DashboardFiltersMobileModal>
  </ClientOnly>

  <ClientOnly>
    <Modal :show="showAddModal" title="أضف عملية علي الرصيد" @close="showAddModal = false">
      <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">
        <SearchSelector :items="users" label="المستخدم" placeholder="إختر مستخدم" display-key="first_name"
          value-key="id" v-model="selectedUser" />
        <InputError :message="errors.username" />
        <div class="w-full space-y-3 mt-2">
          <label class="block text-sm font-medium xs:text-base">النوع</label>
          <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="type" required>
            <option value="" selected>إختر</option>
            <option value="credit" selected>دائن</option>
            <option value="debit" selected>مدين</option>
          </select>
          <InputError :message="errors.type" />

        </div>
        <TextInput :type="'number'" :placeholder="'0'" :label="'المبلغ'" :error="errors.amount" v-model="amount" />
        <div class="w-full space-y-3 mt-2">
          <label class="block text-sm font-medium xs:text-base">تفاصيل العملية</label>
          <textarea class="form-control block min-h-[150px]" rows="8" v-model="content" required>
          </textarea>
          <InputError :message="errors.content" />

        </div>
        <PrimaryButton class="w-full" :loading="loadingButton" @click="submit">متابعة</PrimaryButton>
      </fieldset>
    </Modal>
  </ClientOnly>


</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
const selectedUser = ref(null);
const { filters, list, loading, filtersCount, pagination, users } = storeToRefs(useDashboardOperationsStore());
const { defineField, errors, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      username: yup.number().required('حقل المستخدم مطلوب').min(1).default(0),
      type: yup.string().required("هذا الحقل مطلوب").default(''),
      amount: yup.number().required('هذا الحقل مطلوب').min(1, 'المبلغ يجب ان يكون اكبر من ١ ر.س'),
      content: yup.string().required('هذا الحقل مطلوب')
    })
  )
});
import { vOnClickOutside } from '@vueuse/components';
import { useDashboardOperationsStore } from '~/stores/dashboard/dashboardOperations';
const { fetchAll, submitNewOperation, getUsers } = useDashboardOperationsStore();
const { $listen } = useNuxtApp();
const [username] = defineField('username');
const [type] = defineField('type');
const [amount] = defineField('amount');
const [content] = defineField('content');
const showAddModal = ref(false);
const openFiltersMobileModal = ref(false);
const openFiltersDropdown = ref(false);
const loadingButton = ref(false);

provide('dateFilters', 'operations')

const headItems = {
  'user.first_name': 'المحفظة',
  amount: 'المبلغ',
  type: 'النوع',
  'operator.first_name': 'القائم بالعملية',
  date: 'التاريخ',
  content: 'تفاصيل العملية',
};

$listen('open_add_window', () => showAddModal.value = true);

const submit = async () => {
  username.value = selectedUser.value?.id as Number || 0;
  const { valid } = await validate();
  if (!valid) return;

  loadingButton.value = true;
  const data = await submitNewOperation({
    amount: amount.value,
    user: username.value,
    type: type.value,
    content: content.value,
  });

  loadingButton.value = false;

  if (data) {
    await fetchAll();
    showAddModal.value = false;
    amount.value = 0;
    username.value = 0;
    type.value = '';
    content.value = '';
  }
};

onMounted(async () => {
  await Promise.all([fetchAll(), getUsers()]);
});
</script>

<style module>
.style_every_dev {
  @apply flex flex-col gap-2 my-2;
}
</style>