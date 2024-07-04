<template>
    <div class="absolute top-[calc(100%+15px)] hidden sm:flex flex-col gap-2 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-cloak>

        <DashboardOrdersDateFilters/>
        
        <div class="flex justify-between">
            <div>
                <h3 class="text-sm font-semibold">حالة الطلب</h3>
                <DashboardOrdersFiltersOrderStatus />
            </div>
            <div>
                <h3 class="text-sm font-semibold">نوع الطلب</h3>
                <DashboardOrdersFiltersOrderType />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useDashOrdersStore } from '~/stores/dashboard/dashOrders';



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
