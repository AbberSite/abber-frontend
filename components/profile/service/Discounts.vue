<template>
    <div class="w-full">
        <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-2 sm:gap-y-14 sm:space-y-0 lg:grid-cols-3">
          <div class="w-full space-y-3" >
            <label class="block text-sm font-semibold xs:text-base" for="type">نوع الخصم</label>
            <select class="form-control form-select h-[50px] appearance-none" name="select" id="type" required>
              <option>نسبة مئوية</option>
              <option>مبلغ ثابت</option>
            </select>
          </div>
          <div class="w-full space-y-3" >
            <label class="block text-sm font-semibold xs:text-base" for="start-date">تأريخ بدأ الخصم</label>
            <input class="form-control h-[50px] appearance-none" type="date" name="date" id="start-date" dir="rtl" value="" required />
          </div>
          <div class="w-full space-y-3" >
            <label class="block text-sm font-semibold xs:text-base" for="end-date">تأريخ إنتهاء الخصم</label>
            <input class="form-control h-[50px] appearance-none" type="date" name="date" id="end-date" dir="rtl" value="" required />
          </div>
        </div>
        <div class="w-full max-w-sm space-y-7 pt-8">
          <div class="flex items-center">
            <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="text" x-model="checkedBox" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="text">خصم المحادثة النصية</label>
          </div>
          <template x-if="checkedBox">
            <div class="w-full space-y-3" >
              <label class="block text-sm font-semibold xs:text-base" for="amount">مبلغ الخصم</label>
              <input class="form-control h-[50px] appearance-none" type="number" name="number" id="amount" placeholder="ادخل مبلغ الخصم بالريال السعودي" dir="rtl" value="" required />
              <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: 1 ر.س.</div>
            </div>
          </template>
          <div class="flex items-center">
            <input class="h-6 w-6 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox" id="video" x-model="checkedBox" />
            <label class="mt-1.5 ps-3 text-sm font-semibold xs:text-base" for="video">خصم المحادثة الصوتية</label>
          </div>
          <template x-if="checkedBox">
            <div class="w-full space-y-3" >
              <label class="block text-sm font-semibold xs:text-base" for="video-amount">مبلغ الخصم</label>
              <input class="form-control h-[50px] appearance-none" type="number" name="number" id="video-amount" placeholder="ادخل مبلغ الخصم بالريال السعودي" dir="rtl" value="" required />
              <div class="text-[13px] leading-loose text-gray-500">السعر بعد الخصم: 1 ر.س.</div>
            </div>
          </template>
        </div>
        <div class="pt-8 sm:pt-14">
          <button class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800" type="submit"><span class="mt-1.5">حفظ</span></button>
        </div>
      </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>