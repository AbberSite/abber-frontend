<template>
  <article class="grid w-full overflow-hidden rounded-xl bg-gray-50 p-6" :class="{ 'border-[3px] border-gray-900': primary }">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-medium 2xl:text-2xl" aria-describedby="planDescription" v-text="package.name"></h3>
      <span v-if="primary" class="rounded-full bg-gray-900 px-2 pb-0.5 pt-1 text-xs font-medium text-white">الأكثر شيوعا</span>
    </div>
    <p class="mt-2 text-sm font-medium text-gray-600" id="planDescription" v-text="descriptionList[0]"></p>
    <div class="mt-8 flex items-center space-x-2 rtl:space-x-reverse">
      <span class="font-medium line-through" v-text="package.price_before_discount"></span>
      <span class="text-3xl font-bold" v-text="package.price"></span>
      <span class="font-medium">ر.س</span>
    </div>
    <div class="flex items-center space-x-3 pt-10 rtl:space-x-reverse">
      <div class="relative flex w-full justify-between rounded-md border bg-white px-4 py-4">
        <div>
          <p class="font-medium text-gray-500">الطلبات</p>
          <p class="space-x-1 pt-10 text-xl font-bold rtl:space-x-reverse"><span v-text="package.num_orders"></span><small>طلبات</small></p>
        </div>
        <div class="flex h-10 w-10 items-center justify-center rounded-md">
          <!-- Heroicon name: solid/ -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z"></path>
            <path fill-rule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 overflow-hidden rounded-md text-gray-200">
          <!-- Heroicon name: solid/ -->
          <svg class="-translate-x-1/4 translate-y-1/4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="64" width="64">
            <path d="M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257ZM12.738 17.625l6.474-6.474a1.875 1.875 0 0 0 0-2.651L15.5 4.787a1.875 1.875 0 0 0-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375Z"></path>
            <path fill-rule="evenodd" d="M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 1 1-9 0V4.125Zm4.5 14.25a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
      <div class="relative flex w-full justify-between rounded-md border bg-white px-4 py-4">
        <div>
          <p class="font-medium text-gray-500">الزمن</p>
          <p class="space-x-1 pt-10 text-xl font-bold rtl:space-x-reverse"><span v-text="package.duration"></span><small>أيام</small></p>
        </div>
        <div class="flex h-10 w-10 items-center justify-center rounded-md">
          <!-- Heroicon name: solid/ -->
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
            <path d=""></path>
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd"></path>
          </svg>
        </div>
        <div class="absolute bottom-0 left-0 overflow-hidden rounded-md text-gray-200">
          <!-- Heroicon name: solid/ -->
          <svg class="-translate-x-1/4 translate-y-1/4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" height="64" width="64">
            <path d=""></path>
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clip-rule="evenodd"></path>
          </svg>
        </div>
      </div>
    </div>

    <div class="pt-10">
      <div v-if="subscribed">
        <button class="flex h-[50px] w-full items-center justify-center rounded-full border border-transparent bg-gray-100 px-8 py-3 text-sm font-medium disabled:cursor-not-allowed" type="button" disabled="">تم الإشتراك</button>
        <div class="pt-8 text-center text-sm xs:text-[15px]">
          <a class="font-medium text-blue-600" href="/profile?tab=subscriptions"> عرض تفاصيل الإشتراك<span aria-hidden="true">←</span></a>
        </div>
      </div>
      <button v-else @click="$emit('buy', package.id)" class="flex h-[50px] w-full items-center justify-center rounded-full border border-transparent bg-gray-900 px-8 py-3 text-sm font-medium text-white hover:bg-gray-800" type="button">إشترك الان</button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { OrdersPackage } from "~/types";

defineEmits(["buy"]);

const props = defineProps<{
  package: OrdersPackage;
  subscribed: Boolean;
  primary: Boolean;
}>();

const descriptionList = computed(() => {
  return props.package.description
    .split("\n") // Split the text by newline characters to get each line
    .map((line) => line.trim()) // Remove leading and trailing whitespace
    .filter((line) => line.startsWith("-")) // Ensure the line starts with '-'
    .map((line) => line.slice(1).trim()); // Remove the '-' character and trim any remaining whitespace});
});
</script>

<style></style>
