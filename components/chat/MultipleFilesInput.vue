<template>
    <div>
        <div>
         
            <button class="text-gray-600 hover:text-gray-900" type="button" @click="openChooser">
                <svg
                    class="flex-shrink-0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round">
                    <path
                        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
                </svg>
            </button>
            <!-- Button Group -->
                <input type="file" name="files" @input="sync" ref="input" class="hidden" />

            <!-- <v-file-input accept="image/*" label="ادخل صور الصنف" ></v-file-input> -->
        </div>

        <div class="flex items-center justify-center ">
            <div
                class="flex gap-5 flex-wrap rounded p-3 justify-center"
                v-if="modelValue?.length != 0 || show"
                dir="rtl">
                <slot name="images" />

                <template v-for="(file, i) in modelValue">
                    <div class="relative">
                        <span class="cursor-pointer absolute right-0 top-0" @click="removeImage(i)">X</span>
                        <img class="lazyload w-20 h-20 rounded-md border " src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="file.preview" alt="" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Previewfile extends File {
    preview?: string;
}

const props = defineProps({
    modelValue: Array<Previewfile>,
    show: Boolean
});

const input = ref<HTMLInputElement|null>(null);

function openChooser() {
    input.value?.click();
}

const emit = defineEmits(['update:modelValue']);

const error = ref('');

function sync(event: Event) {
    const target: HTMLInputElement = event.target as HTMLInputElement;
    const temp = props.modelValue;
    const file: Previewfile = target?.files?.[0] as Previewfile;

    if (!file) return;

    error.value = '';

    if (!isImage(file)) {
        error.value = 'يحب أن يكون الملف صورة';

        return;
    }
    file.preview = URL.createObjectURL(file);
    props?.modelValue?.push?.(file);

    emit('update:modelValue', props.modelValue);
}

function removeImage(index: number) {

    props?.modelValue?.splice(index, 1);
    emit('update:modelValue', props.modelValue);
}

function isImage(file: File) {
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/jpg', 'image/svg'];

    return acceptedImageTypes.includes(file.type);
}
</script>

<style scoped></style>
