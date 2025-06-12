<template>
  <div>
    <label class="block mb-2 font-semibold text-gray-700">{{ label }}</label>
    <div class="flex items-center gap-6">
      <transition name="fade">
        <img
          v-if="preview"
          :src="preview"
          :alt="label"
          class="w-20 h-20 rounded-full border-2 border-primary-500 shadow-lg object-cover"
        />
      </transition>
      <label class="upload-label group cursor-pointer flex flex-col items-center justify-center w-32 h-20 border-2 border-dashed border-primary-400 rounded-lg hover:bg-primary-50 transition-all duration-300 relative">
        <svg class="w-8 h-8 text-primary-400 group-hover:text-primary-600 transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/>
        </svg>
        <span class="mt-2 text-xs text-primary-500 group-hover:text-primary-700 transition-colors">اختر صورة</span>
        <input type="file" class="hidden" @change="onFileChange" />
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, File],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);
const preview = ref<string | null>(null);

watch(
  () => props.modelValue,
  (newValue) => {
    if (typeof newValue === 'string') {
      preview.value = newValue;
    } else if (newValue instanceof File) {
      const reader = new FileReader();
      reader.onload = (e) => {
        preview.value = e.target?.result as string;
      };
      reader.readAsDataURL(newValue);
    } else {
      preview.value = null;
    }
  },
  { immediate: true }
);

function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    emit('update:modelValue', file);
  }
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
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
