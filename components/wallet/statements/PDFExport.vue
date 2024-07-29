<template>
  <div
    class="absolute top-[calc(100%+15px)] z-20 min-w-[280px] w-fit rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
    <fieldset class="space-y-7">

      <div class="space-y-3 flex flex-col items-center">
        <div v-if="!customRange?.[0] || !customRange?.[1]" class="font-medium">أختر تاريخ البداية ثم النهاية</div>
        <DatePicker range placeholder="mm/dd/yyyy" :max-date="new Date()" prevent-min-max-navigation
          v-model="customRange" model-type="yyyy-MM-dd" ref="datePicker" id="date" :auto-apply="true"
          :inline="{ input: false }" format="yyyy-MM-dd" select-text="اختيار" cancel-text="الغاء" />
      </div>

      <WalletStatementsExportButton :custom-range="customRange" @close="emit('close')"/>
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits(["close"]);

const customRange = ref<Array<string>>([]);





</script>

<style scoped></style>
