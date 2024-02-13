<template>
    <div class="space-y-3 pt-4">
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                v-model="filters.status"
                value="new"
                id="new" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="new">جديد</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                value="in_progress"
                v-model="filters.status"
                name="checkbox"
                id="in_progress" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="in_progress">قيد التنفيذ</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                v-model="filters.status"
                type="checkbox"
                name="checkbox"
                value="cancelled"
                id="cancelled" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="cancelled">ملغاة</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.status"
                name="checkbox"
                value="awaiting_delivery"
                id="awaiting_delivery" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="awaiting_delivery">بإنتظار الإستلام</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                v-model="filters.status"
                value="complete"
                id="complete" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="complete">مكتمل</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.status"
                name="checkbox"
                value="waiting_for_cancellation"
                id="waiting_for_cancellation" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="waiting_for_cancellation">بإنتظار الإلغاء</label>
        </div>
    </div>
</template>

<script setup lang="ts">
const { filters } = storeToRefs(useOrdersStore());
</script>

<style scoped></style>
