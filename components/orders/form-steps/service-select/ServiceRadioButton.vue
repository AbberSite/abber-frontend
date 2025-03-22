<template>
  <label @click="selected = service.id" v-if="minPrice != 0" class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus:outline-none" :class="[service.id == modelValue && 'border-gray-900 ring-1 ring-gray-900']">
    <div class="flex pt-1.5 w-full">
      <div class="flex-shrink-0">
        <img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="service?.seller?.image" height="44" width="44" alt="" />
      </div>
      <div class="space-y-3 w-full">
        <div class="flex justify-between">
          <div class="ms-3 text-sm font-medium">
            <div>
              {{ service?.seller?.first_name }}
            </div>
            <div class="mt-1.5 flex items-center pb-2">
              <svg v-for="i in Math.floor(service.rate) ?? 1" class="flex-shrink-0 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="18" width="18">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
              </svg>
              <svg v-for="i in Math.ceil(5 - service.rate)" class="flex-shrink-0 text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" height="18" width="18">
                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd"></path>
              </svg>
              <span class="ms-1.5 text-xs font-medium text-gray-600"> ({{ service.ordered_count }}) </span>
            </div>
          </div>
          <div v-if="!service?.work_hour?.is_available_now" class="text-yellow-500 text-center ml-[-15px]">
            <svg class="m-auto" xmlns="http://www.w3.org/2000/svg" fill="none" width="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>

            <span class="text-[13px]">غير متاح الان</span>
          </div>
        </div>
        <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
          {{ service.seller.about == null ? "لا يوجد وصف" : service?.seller?.about.slice(0, 100) + (service?.seller?.about.length > 100 ? "..." : "") }}
        </div>
        <div class="ms-3 space-x-2 text-sm font-medium leading-loose rtl:space-x-reverse">
          <span>سعر الخدمة يبدأ من:</span>
          <span>{{ minPrice }} ر.س. </span>
        </div>
        <div class="ms-3 space-x-2 text-sm rtl:space-x-reverse">
          <span>مدة الاستجابة:</span>
          <span>{{ $t(service?.work_hour?.respond_time) }}</span>
        </div>
      </div>
    </div>
    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" type="radio" v-model="selected" @input="emits('update:modelValue', selected)" name="type" :value="service.id" x-model="selectedOption" />
  </label>
</template>

<script setup lang="ts">
import type { Service } from "~/types";

const emits = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue?: number;
  service: Service;
  type: 1 | 0;
}>();

const selected = ref(props.modelValue);

watch(selected, (value) => emits("update:modelValue", value));

const minPrice = computed(() => {
  return props.service.service_methods[0].price;
});
</script>
