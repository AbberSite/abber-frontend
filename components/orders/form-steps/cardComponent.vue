<template>
  <div class="relative flex justify-between rounded-md border bg-white shadow-sm">
    <label
      class="relative flex h-28 w-full min-w-[12rem] cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus:outline-none"
      :class="modelValue === idOfCard ? 'border-gray-900 ring-1 ring-gray-900' : ''">
      <template v-if="multi" >
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <!-- <img class="lazyload"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          data-src="/images/payments/section/mastercard.svg" height="26" width="26" alt="ماستركارد" />
          <img class="lazyload"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          data-src="/images/payments/section/visa.svg" height="26" width="26" alt="فيزا كارد" />
          <img class="lazyload"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          data-src="/images/payments/section/mada.png" height="40" width="40" alt="مدى" /> -->
        <div class="pt-1 text-sm font-semibold">{{ title }}</div>
      </div>
      <div class="absolute bottom-0 left-0 overflow-hidden rounded-md text-gray-200"><img
          class="lazyload -translate-x-1/4 translate-y-1/4 opacity-30" data-src="/images/payments/section/cards.png" 
          alt="ماستركارد" /></div>
      <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" type="radio" name="type"
        :checked="idOfCard == modelValue ? true : false" :value="idOfCard" @input="emits('update:modelValue', idOfCard)"
        @change="selectedOption = idOfCard" />
      </template>
      <template v-else >
        <div class="flex items-center space-x-2 rtl:space-x-reverse">
        <img class="lazyload"
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
          :data-src="logo" :height="height" :width="width" alt="ماستركارد" />
        <div class="pt-1 text-sm font-semibold">{{ title }}</div>
      </div>
      <div class="absolute bottom-0 left-0 overflow-hidden rounded-md text-gray-200"><img
          class="lazyload -translate-x-1/4 translate-y-1/4 opacity-30" :data-src="logo" height="64" width="64"
          alt="ماستركارد" /></div>
      <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" type="radio" name="type"
        :checked="idOfCard == modelValue ? true : false" :value="idOfCard" @input="emits('update:modelValue', idOfCard)"
        @change="selectedOption = idOfCard" />
      </template>
    </label>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
const props = defineProps<{
  title: string;
  logo?: string;
  idOfCard: string;
  modelValue?: string;
  width: string;
  height: string;
  multi?: boolean;
}>()

const selectedOption = ref();
</script>