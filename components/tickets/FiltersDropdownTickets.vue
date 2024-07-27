<template>
    <div
        class="absolute top-[calc(100%+15px)] flex w-[280px] justify-between rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0 z-50"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
        v-cloak
        >
        <div class="w-full">
            <h3 class="text-sm font-medium">حالة التذكرة</h3>
            <select class="form-control form-select h-[50px] appearance-none w-full" name="select" v-model="filters.status" required>
                      <option value="">الكل</option>
                      <option value="مفتوحة">مفتوحة</option>
                      <option value="مغلقة">مغلقة</option>
                      <option value="معلقة">معلقة</option>
            </select>
        </div>
        
    </div>
</template>

<script setup lang="ts">

const {filters} = storeToRefs(useTicketsStore());
</script>

<style scoped></style>
