<template>
  <div class="relative w-full" ref="dropdownRef" dir="rtl">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700 mb-1 text-right">
      {{ label }}
    </label>

    <!-- Input with selected item display -->
    <div class="relative">
      <input
        type="text"
        class="form-input h-[50px] w-full pl-10 pr-3 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 text-right"
        :placeholder="selectedItem ? '' : placeholder"
        v-model="searchQuery"
        @focus="showDropdown = true"
        @keydown.arrow-down="moveSelection(1)"
        @keydown.arrow-up="moveSelection(-1)"
        @keydown.enter="selectHighlightedItem"
        @keydown.esc="showDropdown = false"
        ref="inputRef"
        aria-haspopup="listbox"
        :aria-expanded="showDropdown"
        aria-controls="dropdown-options"
      />
      
      <!-- Selected item chip (when item is selected) -->
      <div v-if="selectedItem" class="absolute inset-y-0 right-2 flex items-center">
        <span class="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center">
          {{ getDisplayValue(selectedItem, displayKey) }}
          <button 
            type="button" 
            @click="clearSelection"
            class="mr-1 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="مسح الاختيار"
          >
            &times;
          </button>
        </span>
      </div>

      <!-- Dropdown indicator -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg 
          class="h-5 w-5 text-gray-400 transition-transform duration-200"
          :class="{ 'transform rotate-180': showDropdown }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <!-- Dropdown options -->
    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <ul
        v-show="showDropdown && filteredItems.length > 0"
        id="dropdown-options"
        class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none max-h-60 overflow-auto text-right"
        role="listbox"
      >
        <li
          v-for="(item, index) in filteredItems"
          :key="item[valueKey]"
          class="cursor-default select-none relative py-2 pr-3 pl-9 hover:bg-gray-100"
          :class="{ 'bg-gray-100': highlightedIndex === index }"
          @mouseenter="highlightedIndex = index"
          @mousedown.prevent="selectItem(item)"
          role="option"
          :aria-selected="highlightedIndex === index"
        >
          <div class="flex items-center justify-end">
            <span class="block truncate">
              {{ getDisplayValue(item, displayKey) }}
            </span>
          </div>
          <span 
            v-if="highlightedIndex === index"
            class="absolute inset-y-0 left-0 flex items-center pl-4 text-primary-600"
          >
            <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
            </svg>
          </span>
        </li>
      </ul>
    </transition>

    <!-- Empty state -->
    <div 
      v-show="showDropdown && filteredItems.length === 0"
      class="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md py-2 px-3 text-sm text-gray-500 text-right"
    >
      لا توجد نتائج مطابقة
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { onClickOutside } from '@vueuse/core';

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
    required: true
  },
  label: {
    type: String,
    default: 'اختر عنصر'
  },
  placeholder: {
    type: String,
    default: 'اكتب للبحث...'
  },
  displayKey: {
    type: String,
    default: 'name'
  },
  valueKey: {
    type: String,
    default: 'id'
  },
  modelValue: {
    type: [String, Number, Object],
    default: null
  }
});

const emit = defineEmits(['update:modelValue']);

const searchQuery = ref('');
const showDropdown = ref(false);
const selectedItem = ref(props.modelValue);
const highlightedIndex = ref(-1);
const inputRef = ref(null);
const dropdownRef = ref(null);

// Handle click outside
onClickOutside(dropdownRef, () => {
  showDropdown.value = false;
});

const getDisplayValue = (item, key) => {
  if (!item) return '';
  return key.includes('.') 
    ? key.split('.').reduce((o, p) => o?.[p], item) 
    : item[key];
};

const filteredItems = computed(() => {
  if (!searchQuery.value) return props.items;
  const query = searchQuery.value.toLowerCase();
  return props.items.filter(item => 
    String(getDisplayValue(item, props.displayKey)).toLowerCase().includes(query) || 
    String(item[props.valueKey]).toLowerCase().includes(query)
  );
});

const selectItem = (item) => {
  selectedItem.value = item;
  searchQuery.value = '';
  showDropdown.value = false;
  emit('update:modelValue', item);
};

const clearSelection = () => {
  selectedItem.value = null;
  searchQuery.value = '';
  emit('update:modelValue', null);
  nextTick(() => {
    inputRef.value?.focus();
  });
};

const moveSelection = (direction) => {
  if (!showDropdown.value) {
    showDropdown.value = true;
    return;
  }

  const itemsCount = filteredItems.value.length;
  if (itemsCount === 0) return;

  highlightedIndex.value = Math.max(
    0,
    Math.min(itemsCount - 1, highlightedIndex.value + direction)
  );

  // Scroll into view
  const dropdown = dropdownRef.value?.querySelector('ul');
  const item = dropdown?.children[highlightedIndex.value];
  item?.scrollIntoView({ block: 'nearest' });
};

const selectHighlightedItem = () => {
  if (highlightedIndex.value >= 0 && filteredItems.value[highlightedIndex.value]) {
    selectItem(filteredItems.value[highlightedIndex.value]);
  }
};

watch(() => props.modelValue, (newValue) => {
  selectedItem.value = newValue;
});

watch(searchQuery, () => {
  highlightedIndex.value = -1;
  if (searchQuery.value && !showDropdown.value) {
    showDropdown.value = true;
  }
});

// Focus management
onMounted(() => {
  if (selectedItem.value) {
    searchQuery.value = getDisplayValue(selectedItem.value, props.displayKey);
  }
});
</script>

<style scoped>
/* Custom scrollbar for dropdown */
ul::-webkit-scrollbar {
  width: 8px;
}

ul::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px 0 0 4px;
}

ul::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

ul::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* RTL specific adjustments */
[dir="rtl"] .form-input {
  padding-right: 0.75rem;
  padding-left: 2.5rem;
}

[dir="rtl"] ul {
  padding-right: 0;
  padding-left: 0;
}
</style>