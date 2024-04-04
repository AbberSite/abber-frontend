<template>

  <label @click="selected = 0"
    class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm  focus:outline-none"
    :class="[0 == modelValue && 'border-gray-900 ring-1 ring-gray-900']">
    <div class="flex w-full pt-1.5">
      <div class="flex-shrink-0">
        <!-- Heroicon name: outline/clock -->
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24"
          stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z">
          </path>
        </svg>
      </div>
      <div class="w-full space-y-3">
        <div class="ms-3 pt-1 text-sm font-semibold">
          <div>تعبير مستعجل</div>
        </div>
        <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">سنختار لك معبرا متاح حاليا لتعبير حلمك.
        </div>
      </div>
    </div>
    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" id="abdullah" type="radio" v-model="selected"
      @input="emits('update:modelValue', selected)" name="type" :value="0" x-model="selectedOption" />
  </label>
</template>

<script lang="ts" setup>
const emits = defineEmits(['update:modelValue']);
const props = defineProps<{
  modelValue?: number;
}>();

const selected = ref(props.modelValue);

watch(selected, value => emits("update:modelValue", value))
</script>

<style>

</style>