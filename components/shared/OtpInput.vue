<template>
    {{ digits }}
    <div class="flex gap-4 justify-center">
        <input
        ref="inputs"
        class="form-control h-[50px] appearance-none w-14 text-xl"
        autocomplete="email"
        v-model="digits[index]"
            v-for="_,index in 4" />
    </div>
</template>

<script setup lang="ts">
const inputs = ref<Array<HTMLInputElement>>([]);

const digits = ref<string>([])

const emit = defineEmits(["done", 'update:modelValue'])

onMounted(() => {
    console.log(inputs.value);

    inputs.value.forEach((input, index) => {
        input.addEventListener('keyup', function (e: Event) {
            e.preventDefault();
            if (e.key === 'Backspace') {
                if (index != inputs.value.length - 1) {
                    input.nextElementSibling.focus();
                    input.nextElementSibling.value = '';
                }

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
            if (index != 0) {
                input.previousElementSibling.focus();
            }
        });
    });
});
</script>

<style scoped></style>
