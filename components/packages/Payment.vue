<template>
  <div class="mx-auto w-full max-w-sm pt-10" id="payment">
    <LazyFormStepsPayment ordersPackage />
    <div class="flex justify-center mt-3">
      <button class="font-medium text-blue-600 text-sm xs:text-base" @click="previous('packages')">
        <span aria-hidden="true">→</span> الرجوع لقائمة الإشتراكات
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { previous } = useFormWizard<any>("packages");

</script>
<style></style>
