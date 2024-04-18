<template>
    <div class="flex items-center justify-center space-x-11 rtl:flex-row-reverse">
        <input
        ref="inputs" type="number" :class="`index_${index}`"
        class="form-control h-[50px] appearance-none text-center"
        :autofocus="index ===0"
        maxlength="1"
        v-model="digits[index]"
            v-for="_,index in 4" />
    </div>
</template>

<script setup lang="ts">
const inputs = ref<Array<HTMLInputElement>>([]);

const digits = ref<number[]>([])

const emit = defineEmits(["done", 'update:modelValue'])
watch(digits.value, () =>emit('update:modelValue', digits.value));
onMounted(() => {
    inputs.value.forEach((input, index) => {
        input.addEventListener('keyup', function (e: Event) {
            e.preventDefault();
            if (e.key === 'Backspace') {
                if (index != 0) {
                    // input.nextElementSibling.focus();
                    // input.nextElementSibling.value = '';
                    input.previousElementSibling.focus();

                }
                input.previousElementSibling.value = undefined;
                digits.value.splice(index, 1)
                digits.value.splice(index-1, 1)
                return;
            }
        });

        input.addEventListener('keyup', function (e: Event) {
            e.preventDefault();
            console.log(input.value);
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
            if(index == 3){
                emit('done');
            }
        });
    });
});
</script>

<style scoped></style>
