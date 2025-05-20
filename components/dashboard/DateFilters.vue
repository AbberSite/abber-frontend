<template>
  <DashboardDatePickerInput
    class="my-0"
    :label="title"
    v-model:model-date="internalValue"
    range
  />
</template>
<script setup lang="ts">
const props = defineProps({
  title: { type: String, default: 'حسب التاريخ' },
  modelValue: { type: Array, default: undefined },
  dateGteKey: { type: String, default: 'date__gte' },
  dateLteKey: { type: String, default: 'date__lte' }
});
const emits = defineEmits(['update:modelValue']);

const internalValue = ref<Array<string | undefined>>([]);

onMounted(() => {
  if (props.modelValue !== undefined) {
    internalValue.value = props.modelValue;
  }
});

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      internalValue.value = val;
    }
  }
);

watch(
  internalValue,
  (val) => {
    emits('update:modelValue', val);
  }
);

// Helper to map the date range to an object with custom keys
function getDateFilterObject() {
  return {
    [props.dateGteKey]: internalValue.value[0] || '',
    [props.dateLteKey]: internalValue.value[1] || ''
  };
}

// Optionally, export this helper for parent usage
defineExpose({ getDateFilterObject });
</script>