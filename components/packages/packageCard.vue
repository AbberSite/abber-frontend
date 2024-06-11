<template>
  <article class="grid w-full overflow-hidden rounded-xl bg-gray-50 p-6" :class="{ 'border-[3px] border-gray-900': primary }">
    <div class="flex items-center justify-between">
      <h3 class="text-xl font-semibold 2xl:text-2xl" aria-describedby="planDescription" v-text="package.name"></h3>
      <span v-if="primary" class="rounded-full bg-gray-900 px-2 pb-0.5 pt-1 text-xs font-semibold text-white">الأكثر شيوعا</span>
    </div>
    <p class="mt-2 text-sm font-medium text-gray-800" id="planDescription" v-text="descriptionList[0]"></p>
    <div class="mt-8 flex items-center space-x-2 rtl:space-x-reverse">
      <span class="text-3xl font-bold">{{ package.price }}</span
      ><span class="font-medium">ر.س</span>
    </div>
    <h4 class="pt-10 font-semibold">المميزات</h4>
    <ul class="list-inside list-disc space-y-2 pt-4 text-sm font-medium marker:text-lg marker:text-gray-900 xs:text-[15px]">
      <li v-for="li in descriptionList" v-text="li"></li>
    </ul>

    <div class="pt-10">
      <div v-if="subscriptions.includes(package.id)">
        <button class="flex h-[50px] w-full items-center justify-center rounded-full border border-transparent bg-gray-100 px-8 py-3 text-sm font-semibold disabled:cursor-not-allowed" type="button" disabled="">تم الإشتراك</button>
        <div class="pt-8 text-center text-sm xs:text-[15px]">
          <a class="font-medium text-blue-600" href="/profile?tab=subscriptions"> عرض تفاصيل الإشتراك<span aria-hidden="true">←</span></a>
        </div>
      </div>
      <button v-else @click="$emit('buy', package.id)" class="flex h-[50px] w-full items-center justify-center rounded-full border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800" type="button">إشترك الان</button>
    </div>
  </article>
</template>

<script lang="ts" setup>
import type { OrdersPackage } from "~/types";

defineEmits(["buy"]);

const props = defineProps<{
  package: OrdersPackage;
  subscriptions: [];
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
