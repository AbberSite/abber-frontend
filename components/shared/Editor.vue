<template>
  <div>
    <label v-if="label" class="block mb-1 font-medium">{{ label }} :</label>
  <ckeditor
    :editor="editor"
    :model-value="modelValue"
    @update:model-value="emits('update:modelValue', $event)"
    :config="{
      language: 'ar',
      translations: [coreTranslations]
    }" 
  />
  </div>
</template>

<script setup lang="ts">
const { $ckeditor } = useNuxtApp();
const props = defineProps<{
  modelValue: string,
  label?: string,
  placeholder?: string
}>();
const emits = defineEmits(['update:modelValue']);
const editor = $ckeditor.classicEditor;
import coreTranslations from 'ckeditor5/translations/ar.js';
</script>

<style scoped>
:deep(.ck-content) {
  padding: 0px 20px;
}
:deep(.ck-content) {
  @apply prose min-h-[250px] min-w-full;
}
</style>
