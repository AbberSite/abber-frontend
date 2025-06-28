<template>
  <div class="relative" v-on-click-outside="closeDropdown">
    <h3 v-if="label" class="text-sm font-medium xs:text-base my-2">{{ label }}:</h3>
    <button
      v-if="!props.multi"
      class="form-control w-full h-[50px] flex items-center justify-between px-4"
      @click="toggleDropdown"
      type="button"
    >
      <span>{{ selectedLabel }}</span>
      <svg
        class="w-5 h-5 text-gray-500 transition-transform duration-300"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        :class="{ 'rotate-180': dropdownOpen }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <MultiSelector
      v-if="props.multi"
      v-model="multiSelectedValues"
      :options="options.map(option => ({
        value: option.value,
        text: option.label || option.text || option.value
      }))" :dialog="props.dialog"
    />
    <transition
      v-if="!props.multi"
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="transform scale-95 opacity-0"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="dropdownOpen"
        :class="[props.dialog ? 'w-full' : 'absolute z-20 mt-2', 'w-full']"
        class="bg-white border border-gray-300 rounded-md shadow-lg max-h-[300px] overflow-y-auto overflow-x-hidden"
        :style="props.dialog ? 'max-width: none; min-width: 100%;' : ''"
      >
        <li
          v-if="defaultLabel"
          @click="selectDefaultOption"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap border-b border-gray-200 last:border-b-0"
        >
          {{ defaultLabel }}
        </li>
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-normal break-words border-b border-gray-200 last:border-b-0"
        >
          {{ option.label || option.text || option.value }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';
import MultiSelector from '~/components/shared/MultiSelector.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number, Array],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  defaultLabel: {
    type: String,
    default: null, // Default is null, shows only when provided
  },
  label: {
    type: String,
    default: '', // Label text, shows only when not empty
  },
  multi: {
    type: Boolean,
    default: false, // Enables multi-selection
  },
  dialog: {
    type: Boolean,
    default: false, // Changes dropdown behavior when true
  },
});

const emit = defineEmits(['update:modelValue']);
const dropdownOpen = ref(false);

// Initialize multiSelectedValues based on modelValue
const multiSelectedValues = ref(Array.isArray(props.modelValue) ? props.modelValue : []);

// Watch multiSelectedValues and emit updates to modelValue
watch(multiSelectedValues, (newValues) => {
  if (props.multi) {
    emit('update:modelValue', newValues);
  }
});

// Watch modelValue to keep multiSelectedValues in sync
watch(
  () => props.modelValue,
  (newValue) => {
    if (props.multi && Array.isArray(newValue)) {
      multiSelectedValues.value = newValue;
    }
  }
);

const selectedLabel = computed(() => {
  if (props.multi) {
    return multiSelectedValues.value.length > 0
      ? multiSelectedValues.value.join(', ')
      : props.defaultLabel || 'اختر';
  }
  const selectedOption = props.options.find(
    (option) => option.value === props.modelValue
  );
  return selectedOption ? selectedOption.label || selectedOption.text || selectedOption.value : props.defaultLabel || 'اختر';
});

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function selectOption(option: { value: any; label?: string; text?: string }) {
  if (props.multi) {
    // Toggle selection for multi-select
    const index = multiSelectedValues.value.indexOf(option.value);
    if (index === -1) {
      multiSelectedValues.value.push(option.value);
    } else {
      multiSelectedValues.value.splice(index, 1);
    }
  } else {
    emit('update:modelValue', option.value);
    dropdownOpen.value = false;
  }
}

function selectDefaultOption() {
  if (props.multi) {
    multiSelectedValues.value = [];
  } else {
    emit('update:modelValue', '');
  }
  dropdownOpen.value = false;
}

function closeDropdown() {
  dropdownOpen.value = false;
}
</script>

<style scoped>
.form-control {
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: #f9fafb;
  cursor: pointer;
}
.form-control:hover {
  border-color: #2563eb;
}
ul {
  min-width: max-content; /* Ensure dropdown width depends on content */
  max-height: 300px; /* Limit dropdown height */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Prevent horizontal scrolling */
}
</style>
