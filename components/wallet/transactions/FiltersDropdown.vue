<template>
    <div
        class="absolute top-[calc(100%+15px)] z-20 min-w-[280px] w-fit rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
        <fieldset class="space-y-7">
            <div class="space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="select">عملية ناجحة</label>
                <select
                    v-model="filters.success"
                    class="form-control form-select h-[50px] appearance-none"
                    name="select"
                    id="select"
                    required>
                    <option value="">الكل</option>
                    <option value="true">نعم</option>
                    <option value="false">لا</option>
                </select>
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="select">التأريخ</label>
                <select
                    class="form-control form-select h-[50px] appearance-none"
                    v-model="type"
                    name="select"
                    id="select"
                    required>
                    <option value="">الكل</option>
                    <option value="day">اخر يوم</option>
                    <option value="week">اخر إسبوع</option>
                    <option value="month">اخر شهر</option>
                    <option value="custom">تأريخ مخصص</option>
                </select>
            </div>

            <div v-if="type == 'custom'" class="space-y-3 flex flex-col items-center">
                <div v-if="!customRange?.[0] || !customRange?.[1]">أختر تاريخ البداية و النهاية</div>
                <DatePicker
                    range
                    placeholder="mm/dd/yyyy"
                    :max-date="new Date()"
                    prevent-min-max-navigation
                    v-model="customRange"
                    model-type="yyyy-MM-dd"
                    ref="datePicker"
                    id="date"
                    :inline="{ input: false }"
                    format="yyyy-MM-dd"
                    select-text="اختيار"
                    cancel-text="الغاء" />
            </div>
        </fieldset>
    </div>
</template>

<script setup lang="ts">
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const { filters } = storeToRefs(useTransactionsStore());

const type = ref<'' | 'day' | 'week' | 'month' | 'custom'>('');

const customRange = ref([]);
const emit = defineEmits(["close"])

watch(type, (value) => {
    const dates: any = {
        day: [
            formatDate(new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000).toString()),
            formatDate(new Date().toString())
        ],
        week: [
            formatDate(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000).toString()),
            formatDate(new Date().toString())
        ],
        month: [
            formatDate(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000).toString()),
            formatDate(new Date().toString())
        ]
    };

    if (value === 'custom') return;

    filters.value.date = dates[value];
    emit("close")
});

function formatDate(date?: string) {
    const today = new Date(date as string);
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

watch(customRange, (value) => {

    if(!value?.[0] || !value?.[1]) return

    filters.value.date = value;
    emit("close")

});
</script>

<style>
:root {
    /*General*/
    --dp-border-radius: 0.375rem; /*Configurable border-radius*/
    --dp-input-padding: 0.8rem 0.25rem; /*Padding in the input*/
    --dp-action-buttons-padding: 10px 10px; /*Adjust padding for the action buttons in action row*/
}

.dp__theme_light {
    --dp-primary-color: rgb(17 24 39);
}

.dp__input::placeholder {
    @apply !text-gray-600 !transition-none;
}
.dp__input:focus {
    border: 2px solid;
}
</style>
