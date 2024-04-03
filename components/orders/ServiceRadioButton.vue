<template>
    <label
    @click="selected = service.id"
        class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm  focus:outline-none"
        :class="[service.id == modelValue && 'border-gray-900 ring-1 ring-gray-900']"
        >
        <div class="flex pt-1.5">
            <div class="flex-shrink-0">
                <NuxtImg
                    class="lazyload h-11 w-11 rounded-full bg-gray-100"
                    :src="service?.seller?.image"
                    height="44"
                    width="44"
                    alt="" />
            </div>
            <div class="space-y-3">
                <div class="ms-3 pt-1 text-sm font-semibold">
                    <div>
                        {{ service?.seller?.first_name }}
                    </div>
                    <div class="mt-1.5 flex items-center pb-2 ">
                        <svg
                        v-for="i in Math.floor(service.rate) ?? 1"
                        class="flex-shrink-0 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        height="18"
                        width="18">
                        <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"></path>
                    </svg>
                    <svg
                        v-for="i in  Math.ceil(5 - service.rate)"
                        class="flex-shrink-0 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        height="18"
                        width="18">
                        <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"></path>
                    </svg>
                        <span class="ms-1.5 mt-1.5 text-xs font-medium text-gray-800">
                            ({{ service.ordered_count }})
                        </span>
                    </div>
                </div>
                <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                    {{ service?.seller?.about }}
                </div>
            </div>
        </div>
        <input
            class="h-5 w-5 flex-shrink-0 appearance-none rounded-full"
            id="abdullah"
            type="radio"
            v-model="selected"
            @input="emits('update:modelValue', selected)"
            name="type"
            :value="service.id"
            x-model="selectedOption" />
    </label>
</template>

<script setup lang="ts">
import type { Service } from '~/types';

const emits = defineEmits(['update:modelValue']);
const props = defineProps<{
    modelValue?: number;
    service: Service;
}>();

const selected = ref(props.modelValue);

watch(selected, value => emits("update:modelValue", value))
</script>
