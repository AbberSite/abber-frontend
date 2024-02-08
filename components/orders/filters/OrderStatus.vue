<template>
    <div class="space-y-3 pt-4">
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                v-model="filters.status"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">جديد</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                value="in_progress"
                v-model="filters.status"
                name="checkbox"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">قد التقدم</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                v-model="filters.status"
                type="checkbox"
                name="checkbox"
                value="canceled"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">ملغاة</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.status"
                name="checkbox"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">بإنتظار الإستلام</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                v-model="filters.status"
                value="complete"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">مكتمل</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.status"
                name="checkbox"
                value="waiting_for_cancellation"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">بإنتظار الإلغاء</label>
        </div>
    </div>
</template>

<script setup lang="ts">
const { fetchAll } = useOrdersStore();

const { filters } = storeToRefs(useOrdersStore());

watch(
    () => filters.value.status,
    async (value) => {
        await fetchAll({
            status: value
        });
    },
    {
        deep: true
    }
);
</script>

<style scoped></style>
