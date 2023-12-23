<template>
    <div
        class="is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-16 text-sm rtl:space-x-reverse xs:text-base pb-3">
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
        <a
            v-for="category in categories?.results"
            class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold text-gray-500 hover:text-gray-900 focus:outline-none rtl:space-x-reverse"
            @click.prevent="selectedCategory = category?.id"
            :class="[selectedCategory === category?.id ? 'border-gray-900' : 'border-transparent']"
            href="#">
            <span>
                {{ category?.name }}
            </span>
            <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
                {{ category?.id }}
            </span>
        </a>
    </div>
</template>

<script setup lang="ts">

    const emits = defineEmits(['update:modelValue']);

    const props = defineProps<{
        total: number;
        modelValue : string
    }>();

    const selectedCategory = ref(props.modelValue);

    watch(selectedCategory, value => emits('update:modelValue', value))

    const categories = ref<{ results?: Array<{ name: string; id: string }> }>({ results : [] });

    async function fetchCategories() {
        const { data: categoriesData } = await useFetch('/api/blog/categories');

        if(!categoriesData.value) {
            await fetchCategories()
        } 
        
        categories.value = categoriesData.value;
    }


    onMounted(async () => {
        await fetchCategories()
    }) 
</script>

<style scoped></style>
