<template>
    <div
        class="absolute top-[calc(100%+15px)] z-20 w-[280px] rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
        <fieldset class="space-y-7">
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ من</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="date"
                    name="date"
                    id="date"
                    dir="rtl"
                    value=""
                    />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ إلى</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="date"
                    name="date"
                    id="date"
                    dir="rtl"
                    value=""
                    />
            </div>
        </fieldset>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
