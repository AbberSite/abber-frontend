<template>
  <input ref="checkbox" @click="update" type="checkbox" class="appearance-none rounded border relative" :class="{ 'text-red-500 checked false': check == false && check !== null }" />
</template>

<script lang="ts" setup>
const emit = defineEmits(["update:modelValue"]);
const check = ref(null);
const checkbox = ref(null);

const update = () => {
  console.log("---", check.value);

  if (check.value === false) {
    check.value = null;
  } else {
    check.value = !check.value;
    checkbox.value.checked = true;
  }
  console.log(check.value);
  emit("update:modelValue", check.value);
};
</script>

<style>
.false::after {
  content: "x";
  position: absolute;
  top: 50%;
  width: 11px;
  height: 11px;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background-color: rgb(239, 68, 68);
  line-height: 0.5;
  text-align: center;
}
</style>
