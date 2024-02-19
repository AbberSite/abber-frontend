<template>
    <div
        class="absolute top-[calc(100%+15px)] z-20 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
        <fieldset class="space-y-7">
            <div class="w-full space-y-3">
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
                    type="select"
                    name="select"
                    id="select"
                    required>
                    <option>الكل</option>
                    <option>اخر يوم</option>
                    <option>اخر إسبوع</option>
                    <option>اخر شهر</option>
                    <option>تأريخ مخصص</option>
                </select>
            </div>
        </fieldset>
    </div>
</template>

<script setup lang="ts">

const { filters } = storeToRefs(useTransactionsStore())

</script>

<style scoped></style>
