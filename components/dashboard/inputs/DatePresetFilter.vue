<template>
  <div class="flex flex-col sm:flex-row gap-4 items-start mb-4">
    <CustomSelect
      v-model="selectedPreset"
      :options="[
        { value: 'today', label: 'اليوم' },
        { value: 'week', label: 'اخر اسبوع' },
        { value: 'month', label: 'اخر ٣٠ يوم' },
        { value: 'custom', label: 'مخصص' }
      ]"
    />
    <DashboardDatePickerInput
      v-if="selectedPreset === 'custom'" no_label
      v-model:model-date="internalValue"
      range
    />
  </div>
</template>

<script setup lang="ts">
import CustomSelect from '~/components/shared/CustomSelect.vue';

const props = defineProps<{
  modelValue: [Array, String];
}>();
const emits = defineEmits(["update:modelValue"]);

const todayStr = () => new Date().toISOString().slice(0, 10);
const getRange = (days: number) => {
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - days);
  return [start.toISOString().slice(0, 10), todayStr()];
};

const internalValue = ref(props.modelValue ?? getRange(0));
const selectedPreset = ref('today');

// Helper to check if a range matches a preset
function detectPreset(val: any) {
  if (!Array.isArray(val) || val.length !== 2) return 'custom';
  const [start, end] = val;
  const today = todayStr();
// If start and end are the same day, or the range is exactly one day, return 'today'
const startDate = new Date(start);
const endDate = new Date(end);
const diffDays = Math.abs(
    (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
);
if (diffDays <= 1) return 'today';
if (start === getRange(6)[0] && end === today) return 'week';
if (start === getRange(29)[0] && end === today) return 'month';
  return 'custom';
}

// Sync preset when modelValue changes from parent
watch(
  () => props.modelValue,
  (val) => {
    internalValue.value = val;
    selectedPreset.value = detectPreset(val);
  },
  { immediate: true }
);

// Emit when preset changes
watch(selectedPreset, (val) => {
  if (val === 'today') {
    const range = [todayStr(), todayStr()];
    internalValue.value = range;
    emits("update:modelValue", range);
  } else if (val === 'week') {
    const range = getRange(6);
    internalValue.value = range;
    emits("update:modelValue", range);
  } else if (val === 'month') {
    const range = getRange(29);
    internalValue.value = range;
    emits("update:modelValue", range);
  }
  // For custom, do not emit here (emit on internalValue change)
});

// Emit when custom date changes
watch(internalValue, (val) => {
  if (selectedPreset.value === 'custom') {
    emits("update:modelValue", val);
  }
});
</script>
