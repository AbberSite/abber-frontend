<template>
    <div class="flex items-center justify-center space-x-11 rtl:flex-row-reverse">
        <input  ref="inputs" :type="isApple ?'text': 'number'" pattern="\d*" 
            class="form-control h-[50px] appearance-none text-center" :autofocus="index === 0" maxlength="1"
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
            const otp_from_clipboardData = clipboardData.getData('text');
            if (otp_from_clipboardData.length == 4) {
                for (let i = 0; i < 4; i++) {
                    digits.value[i] = parseInt(otp_from_clipboardData.charAt(i));
                }
                inputs.value[3].focus();
                emit('done');
            }
            return;
        })
            input.addEventListener('keyup', function (e: Event) {
                e.preventDefault();
                if (e.key === 'Backspace') {
                    if (index != 0) {
                        input.previousElementSibling.focus();

                    }
                    input.previousElementSibling.value = undefined;
                    digits.value.splice(index, 1)
                    digits.value.splice(index - 1, 1)
                    return;
                }
            });

            input.addEventListener('keyup', function (e: Event) {
                e.preventDefault();
                if (input.value == '') {
                    input.value = '';
                    return;
                }
                if (input.value && input.value.length > 1) {
                    input.value = input.value[0];
                }
                if (index != 3) {
                    input.nextElementSibling.focus();
                }
                if (index == 3) {
                    emit('done');
                }
            });

    });
});
</script>

<style scoped></style>
