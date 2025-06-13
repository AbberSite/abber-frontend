<template>
  <div class="relative" v-on-click-outside="closeDropdown">
    <button
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
    <transition
      enter-active-class="transition-transform duration-300 ease-out"
      leave-active-class="transition-transform duration-300 ease-in"
      enter-from-class="transform scale-95 opacity-0"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ul
        v-if="dropdownOpen"
        class="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg"
      >
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          class="px-4 py-2 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';
import { vOnClickOutside } from '@vueuse/components';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
const dropdownOpen = ref(false);

const selectedLabel = computed(() => {
  const selectedOption = props.options.find(
    (option) => option.value === props.modelValue
  );
  return selectedOption ? selectedOption.label : 'اختر';
});

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value;
}

function selectOption(option: { value: any; label: string }) {
  emit('update:modelValue', option.value);
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
}
</style>
