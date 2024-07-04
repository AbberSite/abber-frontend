<template>
    <div>
            <h3 class="text-sm font-semibold">حسب التاريخ</h3>
            <div class="flex flex-col items-center pt-2 gap-2 w-full">
                <DatePicker auto-apply range placeholder="النطاق الزمني" :max-date="new Date()" v-model="range_date"
                        model-type="yyyy-MM-dd" ref="datePicker" id="date" format="yyyy-MM-dd" :SkeletonsTableapply="true" :enable-time-picker="false" />
            </div>
        </div>
</template>
<script setup lang="ts">
let filters = ref(null);
// const { filters } = storeToRefs(useDashOrdersStore());
import { useDashOrdersStore } from '~/stores/dashboard/dashOrders';
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';
const props = defineProps<{transactions?: boolean; orders?: boolean; }>();
if(props.transactions){
    filters.value = useDashTransactionsStore().filters;
} else if (props.orders){
    filters.value = useDashOrdersStore().filters;
};
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import type { DatePickerInstance } from '@vuepic/vue-datepicker';
const datePicker = ref<DatePickerInstance>(null);
let range_date = ref([]);

onMounted(()=> {
    if(filters.value.date__gte && filters.value.date__lte){
        range_date.value[0] = filters.value.date__gte;
        range_date.value[1] = filters.value.date__lte;
    }
})
watch(range_date, (value)=> {
    filters.value.date__gte = value[0];
    filters.value.date__lte = value[1];
});
</script>