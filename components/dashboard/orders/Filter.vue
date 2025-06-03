<template>

    <DashboardDateFilters
      v-model:modelValue="dateRange"
    />

    <div class="pt-4 sm:pt-0 flex space-x-6 sm:space-x-0 sm:justify-between">
        <div>
            <h3 class="text-sm font-medium">حالة الطلب</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        v-model="filters.status" value="new" id="new" />
                    <label class="mt-1.5 ps-3 text-sm" for="new">جديد</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        value="in_progress" v-model="filters.status" name="checkbox" id="in_progress" />
                    <label class="mt-1.5 ps-3 text-sm" for="in_progress">قيد التنفيذ</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" v-model="filters.status"
                        type="checkbox" name="checkbox" value="cancelled" id="cancelled" />
                    <label class="mt-1.5 ps-3 text-sm" for="cancelled">ملغاة</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.status" name="checkbox" value="awaiting_delivery" id="awaiting_delivery" />
                    <label class="mt-1.5 ps-3 text-sm" for="awaiting_delivery">بإنتظار الإستلام</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        v-model="filters.status" value="complete" id="complete" />
                    <label class="mt-1.5 ps-3 text-sm" for="complete">مكتمل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.status" name="checkbox" value="waiting_for_cancellation"
                        id="waiting_for_cancellation" />
                    <label class="mt-1.5 ps-3 text-sm" for="waiting_for_cancellation">بإنتظار
                        الإلغاء</label>
                </div>
            </div>
        </div>
        <div>
            <h3 class="text-sm font-medium">نوع الطلب</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input v-model="filters.type.voice" class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="checkbox" name="checkbox" id="voice" />
                    <label class="mt-1.5 ps-3 text-sm" for="voice">محادثة صوتية</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.type.text" name="checkbox" id="text" />
                    <label class="mt-1.5 ps-3 text-sm" for="text">محادثة نصية</label>
                </div>
            </div>
            <h3 class="text-sm font-medium mt-4">الجودة</h3>

            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <DashboardInputsTrueFalseNullCheckbox v-model="filters.quality" class="h-5 w-5 flex-shrink-0 " id="quality" />
                    <label class="mt-1.5 ps-3 text-sm" for="quality">تم التقديم بنجاح</label>
                </div>
                
            </div>
            <h3 class="text-sm font-medium mt-4">المنصة</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="" id="all" />
                    <label class="mt-1.5 ps-3 text-sm" for="all">الكل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="abber" id="abber" />
                    <label class="mt-1.5 ps-3 text-sm" for="abber">عبر</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="manam" id="manam" />
                    <label class="mt-1.5 ps-3 text-sm" for="manam">منام</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useDashboardOrdersStore } from '~/stores/dashboard/dashboardOrders';
const { filters } = storeToRefs(useDashboardOrdersStore());
const { fetchAll } = useDashboardOrdersStore();

const router = useRouter();

const dateRange = computed({
  get: () => [
    filters.value.date__gte ?? null,
    filters.value.date__lte ?? null
  ],
  set: (value) => {
    if (!value || value.length === 0) {
      filters.value.date__gte = null;
      filters.value.date__lte = null;
    } else {
      const [start, end] = value;
      filters.value.date__gte = start;
      filters.value.date__lte = end;
    }
  }
});

// Watch all filters and update query params + fetch data
watch(
  filters,
  (val) => {
    const query = {
      status: val.status && val.status.length ? val.status.join(',') : undefined,
      'type.voice': val.type.voice ? 'true' : undefined,
      'type.text': val.type.text ? 'true' : undefined,
      payment_method: val.payment_method || undefined,
      app_source: val.app_source || undefined,
      quality: val.quality !== undefined ? val.quality : undefined,
      date__gte: val.date__gte || undefined,
      date__lte: val.date__lte || undefined,
      // Add more as needed
    };
    router.replace({ query });
  },
  { deep: true }
);
</script>