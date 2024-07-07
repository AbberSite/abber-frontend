<template>
    <div class="absolute top-[calc(100%+15px)] hidden sm:flex flex-col gap-2 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-cloak>

        <DashboardDateFilters withdrawal-requests />

        <div class="flex justify-between">
            <div>
                <h3 class="text-sm font-semibold">حالة الطلب</h3>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        name="paymentStatus" v-model="filters.status" id="all" :value="null" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">الكل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        name="paymentStatus" v-model="filters.status" id="paid" :value="'1'" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="paid">قيد المراجعة</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        name="paymentStatus" v-model="filters.status" id="text" :value="'2'" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="text">تم</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        name="paymentStatus" v-model="filters.status" id="text" :value="'3'" />
                    <label class="mt-1.5 ps-3 text-sm font-medium" for="text">مرفوض</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useDashWithdrawalRequestsStore } from '~/stores/dashboard/dashWithdrawalRequests'; 
const {filters} = storeToRefs(useDashWithdrawalRequestsStore());


</script>

<style scoped>
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
