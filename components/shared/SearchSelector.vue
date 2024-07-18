<template>
  <div class="relative">
    <div class="space-y-3 mt-2">
      <label class="block text-sm font-semibold xs:text-base">{{ label }}</label>
      <div class="relative">
        <input
          type="text"
          class="form-control form-input h-[50px] w-full pr-4"
          :placeholder="placeholder"
          v-model="searchQuery"
          @focus="showDropdown = true"
          @blur="hideDropdown"
        />
        <div
          class="absolute inset-y-0 left-2 flex items-center pr-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
      <div
        v-if="showDropdown"
        class="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg"
      >
        <ul class="max-h-60 py-1 overflow-auto text-base leading-6 shadow-xs focus:outline-none sm:text-sm sm:leading-5">
          <li
            v-for="(item, index) in filteredItems"
            :key="index"
            class="cursor-pointer select-none relative py-2 pl-3 pr-9"
            @mousedown.prevent="selectItem(item)"
          >
            <span class="font-normal block truncate">{{ item[displayKey] }}</span>
          </li>
        </ul>
      </div>
      <input type="hidden" :value="selectedItem?.id || ''" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineExpose, watch } from 'vue';

const props = defineProps({
  items: Array,
  label: String,
  placeholder: String,
  displayKey: {
    type: String,
    default: 'name',
  },
  valueKey: {
    type: String,
    default: 'id',
  },
  modelValue: {
    type: [String, Number, Object],
    default: null,
  }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const showDropdown = ref(false);
const selectedItem = ref(props.modelValue);

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items;
  return props.items.filter(item =>
    item[props.displayKey].toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    item[props.valueKey].toString().includes(searchQuery.value)
  );
});

const selectItem = (item) => {
  selectedItem.value = item;
  searchQuery.value = item[props.displayKey];
  showDropdown.value = false;
  emit('update:modelValue', item);
};

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200); // Delay to allow click event to register
};

watch(() => props.modelValue, (newValue) => {
  selectedItem.value = newValue;
});

defineExpose({ selectedItem });

const errors = ref({
  username: ''
});
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
