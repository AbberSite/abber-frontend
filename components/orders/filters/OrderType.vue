<template>
    <div class="space-y-3 pt-4">
        <div class="flex items-center">
            <input
                v-model="filters.type.voice"

                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">محادثة صوتية</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.type.text"
                name="checkbox"
                id="checkbox" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="checkbox">محادثة نصية</label>
        </div>
    </div>
</template>

<script setup lang="ts">
const voice = ref(false);
const text = ref(false);

const { fetchAll } = useOrdersStore();

const { filters } = storeToRefs(useOrdersStore());


watch(() => filters.value.type.text, async (value) => {
    await fetchAll({
        type: filters.value.type.text && !filters.value.type.voice ? 'text_communication' : (filters.value.type.voice && !filters.value.type.text ? 'video_communication' : undefined)
    });
});

watch(() => filters.value.type.voice, async (value) => {
    await fetchAll({
        type: filters.value.type.voice && !filters.value.type.text ? 'video_communication' : (filters.value.type.text && !filters.value.type.voice ? 'text_communication' : undefined)
    });
});
</script>

<style scoped></style>
