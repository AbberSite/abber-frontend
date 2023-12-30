<template>
    <div
        class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base">

        <template v-if="loading">
            <SkeletonsCategorie />
            <SkeletonsCategorie />
            <SkeletonsCategorie />
            <SkeletonsCategorie />
        </template>

        <template v-else>
            <a
                class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
                :class="[selectedCategory === '' ? 'border-gray-900' : 'border-transparent']"
                @click.prevent="selectedCategory = ''"
                href="/blog">
                <span>الكل</span>
                <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                    {{ total }}
                </span>
            </a>

            <template v-for="category in categories?.results">
                <a
                    v-if="category?.posts_count != 0"
                    class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold text-gray-500 hover:text-gray-900 focus:outline-none rtl:space-x-reverse"
                    @click.prevent="selectedCategory = category?.id"
                    :class="[selectedCategory === category?.id ? 'border-gray-900' : 'border-transparent']"
                    href="#">
                    <span>
                        {{ category?.name }}
                    </span>
                    <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                        {{ category?.posts_count }}
                    </span>
                </a>
            </template>

        </template>
        
    </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue']);

const props = defineProps<{
    total: number;
    modelValue: string;
}>();

const selectedCategory = ref(props.modelValue);
const loading = ref(false);

watch(selectedCategory, (value) => emits('update:modelValue', value));

const categories = ref<{ results?: Array<{ name: string; id: string; posts_count: number }> }>({ results: [] });

async function fetchCategories() {
    loading.value = true;
    const { data: categoriesData } = await useFetch('/api/blog/categories');

    if (!categoriesData.value) return;

    categories.value = categoriesData.value;
    loading.value = false;
}

onMounted(async () => {
    await fetchCategories();
    await fetchCategories();
});
</script>

<style scoped></style>
