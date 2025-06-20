<template>
    <div class="flex items-center justify-center space-x-11 rtl:flex-row-reverse">
        <input  ref="inputs" :type="isApple ?'text': 'number'" pattern="\d*" 
            class="form-control h-[50px] appearance-none text-center rounded-full" :autofocus="index === 0" maxlength="1"
            v-model="digits[index]" v-for="_, index in 4" :disabled="props.disabled"/>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{disabled?: boolean; }>();

const inputs = ref<Array<HTMLInputElement>>([]);

const digits = ref<number[]>([])
const {isApple} = useDevice();
const emit = defineEmits(["done", 'update:modelValue'])
watch(digits.value, () => emit('update:modelValue', digits.value));
function convertArabicToEnglishNumbers(input: string): string {
  return input.replace(/[٠-٩]/g, (char) => String(char.charCodeAt(0) - 1632));
}

onMounted(() => {
  inputs.value.forEach((input, index) => {
      if (index == 0) {
          input.focus();
          input.select();
          input.click()
          const event = new KeyboardEvent('keypress', { key: '0' });
          input.dispatchEvent(event);
      }
      input.addEventListener('paste', function (event) {
          event.preventDefault();
          var clipboardData = event.clipboardData || window.clipboardData;
          const otp_from_clipboardData = convertArabicToEnglishNumbers(clipboardData.getData('text')); // Convert Arabic to English
          if (otp_from_clipboardData.length == 4) {
              for (let i = 0; i < 4; i++) {
                digits.value[i] = parseInt(otp_from_clipboardData.charAt(i));
              }
              inputs.value[3].focus();
              emit('done');
          }
          return;
      });

      input.addEventListener('keyup', function (e: KeyboardEvent) {
        e.preventDefault();

        // Ignore control keys like Control, Shift, Alt, etc.
        if (e.key.length > 1 && e.key !== 'Backspace') {
          return;
        }

        if (e.key === 'Backspace') {
          if (index != 0) {
            input.previousElementSibling?.focus();
          }
          digits.value[index] = undefined;
          return;
        }

        const rawValue = input.value;
        const convertedValue = convertArabicToEnglishNumbers(rawValue); // Convert Arabic to English
        input.value = convertedValue;

        if (convertedValue && convertedValue.length > 1) {
          input.value = convertedValue[0];
        }
        digits.value[index] = parseInt(input.value);

        if (index != 3 && input.value) {
          input.nextElementSibling?.focus();
        }
        if (index == 3 && input.value) {
          emit('done');
        }
      });

  });
});
</script>

<style scoped></style>
