<template>
    <div class="w-full space-y-3">

        <label class="text-sm font-semibold xs:text-base" for="email">
            {{ label }}
        </label>

        <div class="relative">
            <slot name="prepend"></slot>
            <input
                v-model="value"
                class="form-control h-[50px] appearance-none"
                :class="[ error && 'form-invalid' ]"
                :type="type ?? 'text'"
                :name="name"
                :id="id"
                :placeholder="placeholder"
                autocomplete="email"
                 />
            <slot name="append"></slot>
        </div>

        <InputError :message="error" />

    </div>
</template>

<script setup lang="ts">


const props = defineProps<{

    modelValue? : any,
    error? : string,
    label? : string,
    type? : string, 
    name? : string
    placeholder? : string,
    id? : string,

}>()

const emits = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)

watch(value, _value => emits("update:modelValue", _value))

</script>

<style scoped>

</style>