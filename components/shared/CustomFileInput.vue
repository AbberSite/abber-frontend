<template>
  <div>
    <label class="text-sm font-medium xs:text-base">{{ label }}</label>
    <div class="flex items-center gap-4">
      <label class="upload-label group cursor-pointer flex flex-col items-center justify-center w-40 h-24 border-2 border-dashed border-primary-400 rounded-lg hover:bg-primary-50 transition-all duration-300 relative">
        <svg class="w-10 h-10 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <span class="mt-2 text-sm text-primary-500 group-hover:text-primary-700 transition-colors">اختر ملف</span>
        <input type="file" class="hidden" @change="onFileChange" :accept="accept" />
      </label>
      <transition name="fade">
        <div v-if="fileName" class="file-info">
          <p class="text-sm text-gray-700 font-medium truncate">{{ fileName }}</p>
          <button @click="clearFile" class="text-red-500 hover:text-red-700 text-xs mt-1 transition-colors">إزالة</button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: [File, String],
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  accept: {
    type: String,
    default: '', // e.g., ".txt,.pdf" for specific file types
  },
});

const emit = defineEmits(['update:modelValue']);
const fileName = ref<string | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (newValue instanceof File) {
      fileName.value = newValue.name;
    } else if (typeof newValue === 'string') {
      // Extract the file name from the URL
      fileName.value = newValue.split('/').pop() || 'Unknown File';
    } else {
      fileName.value = null;
    }
  },
  { immediate: true }
);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    fileName.value = file.name;
    emit('update:modelValue', file);
  }
}

function clearFile() {
  fileName.value = null;
  emit('update:modelValue', null);
}
</script>

<style scoped>
.upload-label {
  box-shadow: 0 2px 8px 0 rgba(80, 120, 200, 0.07);
  transition: box-shadow 0.3s, border-color 0.3s;
}
.upload-label:hover {
  border-color: #2563eb;
  box-shadow: 0 4px 16px 0 rgba(80, 120, 200, 0.15);
}
.file-info {
  padding: 0.5rem 1rem;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.file-info:hover {
  transform: scale(1.02);
  opacity: 0.9;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
