<template>
  <div class="w-full space-y-3">
    <label class="text-sm font-medium xs:text-base" :for="id">
      {{ label }}
    </label>

    <div class="relative">
      <slot name="prepend"></slot>
      <template v-if="type == 'textarea'">
        <textarea
          class="form-control block min-h-[150px]"
          rows="8"
          v-model="value"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :disabled="disabled"
          :dir="dir"
        >
        </textarea>
      </template>
      <template v-else>
        <input
          v-model="value"
          class="form-control h-[50px] appearance-none disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-600"
          :class="[error && 'form-invalid']"
          :type="type ?? 'text'"
          :name="name"
          :id="id"
          :placeholder="placeholder"
          :disabled="disabled"
          :dir="dir"
        />
      </template>
      <slot name="append"></slot>
    </div>

    <InputError :message="error" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: any;
  error?: string;
  label?: string;
  type?: string;
  name?: string;
  placeholder?: string;
  id?: string;
  disabled?: boolean;
  dir?: string; // New prop for content direction
}>();

const emits = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(value, (_value) => emits("update:modelValue", _value));
watch(
  () => props.modelValue,
  (newVal) => {
    value.value = newVal;
  }
);

// Default direction is 'rtl' if not provided
const dir = computed(() => props.dir || "rtl");
</script>

<style scoped></style>
