<template>
  <div>
    <label v-if="label" class="block mb-1 font-medium">{{ label }}</label>
    <div class="mb-2 flex flex-wrap gap-1">
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('bold')"><b>B</b></button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('italic')"><i>I</i></button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('underline')"><u>U</u></button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('strikeThrough')"><s>S</s></button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('insertUnorderedList')">• List</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('insertOrderedList')">1. List</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('formatBlock', '<h1>')">H1</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('formatBlock', '<h2>')">H2</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('formatBlock', '<h3>')">H3</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('formatBlock', '<p>')">P</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('justifyLeft')">Left</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('justifyCenter')">Center</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('justifyRight')">Right</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('justifyFull')">Justify</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('outdent')">Outdent</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('indent')">Indent</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="insertLink">Link</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('unlink')">Unlink</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="insertImage">Image</button>
      <button type="button" class="px-2 py-1 border rounded text-xs" @click="exec('removeFormat')">Clear</button>
    </div>
    <div
      ref="editor"
      class="w-full border rounded p-2 min-h-[200px] bg-white"
      contenteditable="true"
      :placeholder="placeholder"
      @input="onInput"
      @blur="onInput"
      style="outline:none"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps<{
  modelValue: string,
  label?: string,
  placeholder?: string
}>();
const emits = defineEmits(['update:modelValue']);

const editor = ref<HTMLElement | null>(null);

onMounted(() => {
  if (editor.value) {
    editor.value.innerHTML = props.modelValue || '';
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (editor.value && editor.value.innerHTML !== val) {
      editor.value.innerHTML = val || '';
    }
  }
);

function onInput() {
  if (editor.value) {
    emits('update:modelValue', editor.value.innerHTML);
  }
}

function exec(command: string, value?: string) {
  document.execCommand(command, false, value);
  onInput();
}

function insertLink() {
  const url = prompt('أدخل الرابط:');
  if (url) exec('createLink', url);
}

function insertImage() {
  const url = prompt('أدخل رابط الصورة:');
  if (url) exec('insertImage', url);
}
</script>
