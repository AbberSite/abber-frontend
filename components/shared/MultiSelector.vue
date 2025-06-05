<template>
  <div class="relative w-full space-y-3" v-on-click-outside="closeDropdown">
    <div>
      <label class="text-sm font-medium xs:text-base">{{ label }}:</label>
    </div>
    <button
      type="button"
      class="form-control min-h-[50px] w-full border rounded-lg px-3 py-2 text-left bg-white flex items-center justify-between  transition"
      @click="toggleDropdown"
    >
      <div class="flex flex-wrap gap-1 items-center min-h-[1.5rem]">
        <template v-if="selectedLabels.length">
          <span
            v-for="(label, i) in selectedLabels"
            :key="i"
            class="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-xs flex items-center gap-1"
          >
            {{ label }}
            <span
              class="cursor-pointer ml-1 text-blue-500 hover:text-blue-700"
              @click.stop="removeOption(selectedValues[i])"
              aria-label="Remove"
            >×</span>
          </span>
        </template>
        <span v-else class="text-gray-400">{{ placeholder }}</span>
      </div>
      <svg class="w-4 h-4 ml-2 text-gray-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>
    <div
      v-if="open"
      class="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto animate-fade-in"
    >
      <div
        v-for="option in options"
        :key="option.value"
        class="px-3 py-2 hover:bg-blue-50 flex items-center cursor-pointer transition "
        @click.stop="toggleOption(option.value)"
      >
        <input
          type="checkbox"
          :id="option.value"
          :value="option.value"
          :checked="internalValue.includes(option.value)"
          class="accent-primary"
          @change.stop="toggleOption(option.value)"
          tabindex="-1"
        />
        <label :for="option.value" class="cursor-pointer select-none w-full px-2">{{ option.text }}</label>
      </div>
      <div v-if="selectedLabels.length || options.length" class="px-3 py-2 border-t bg-gray-50 flex justify-between">
        <button
          v-if="options.length && internalValue.length !== options.length"
          class="text-xs text-blue-500 bg-transparent rounded px-2 py-1 transition hover:bg-blue-100 hover:text-blue-700"
          @click.stop="selectAll"
        >تحديد الكل</button>
        <span></span>
        <button
          v-if="selectedLabels.length"
          class="text-xs text-red-500 bg-transparent rounded px-2 py-1 transition hover:bg-red-100 hover:text-red-700"
          @click.stop="clearAll"
        >مسح الكل</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps<{
  modelValue?: string[] | number[];
  options: { value: string | number; text: string }[];
  placeholder?: string;
  label?: string;
}>();
const emits = defineEmits(['update:modelValue']);

const open = ref(false);
const internalValue = ref<Array<string | number>>(props.modelValue ? [...props.modelValue] : []);

watch(
  () => props.modelValue,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(internalValue.value)) {
      internalValue.value = val ? [...val] : [];
    }
  }
);

watch(
  internalValue,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(props.modelValue)) {
      // console.log('Updating modelValue - internalValue:', val);
      emits('update:modelValue', [...val]);
    }
  }, { deep: true }
);

const selectedLabels = computed(() =>
  Array.isArray(props.options)
    ? props.options.filter(opt => internalValue.value.includes(opt.value)).map(opt => opt.text)
    : []
);

const selectedValues = computed(() =>
  Array.isArray(props.options)
    ? props.options.filter(opt => internalValue.value.includes(opt.value)).map(opt => opt.value)
    : []
);

function toggleDropdown() {
  open.value = !open.value;
}

function toggleOption(value: string | number) {
  const idx = internalValue.value.indexOf(value);
  if (idx === -1) {
    internalValue.value.push(value);
  } else {
    internalValue.value.splice(idx, 1);
  }
}

function removeOption(value: string | number) {
  const idx = internalValue.value.indexOf(value);
  if (idx !== -1) {
    internalValue.value.splice(idx, 1);
  }
}

function clearAll() {
  internalValue.value = [];
}

function selectAll() {
  internalValue.value = props.options.map(opt => opt.value);
}

function closeDropdown() {
  open.value = false;
}
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.15s;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px);}
  to { opacity: 1; transform: translateY(0);}
}
</style>
