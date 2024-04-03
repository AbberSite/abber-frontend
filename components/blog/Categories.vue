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
      <NuxtLink
        class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold focus:outline-none rtl:space-x-reverse"
        :class="[selectedCategory === '' ? 'border-gray-900' : 'border-transparent']"
        @click.prevent="selectedCategory = ''" :to="{ name: 'blog' }">
        <span>الكل</span>
        <span class="rounded-full bg-gray-50 px-4 pb-1 pt-1.5 text-xs font-semibold">
          {{ posts.count }}
        </span>
      </NuxtLink>

      <template v-for="category in categories?.results">
        <a v-if="category?.posts_count != 0"
          class="flex items-center space-x-3 whitespace-nowrap border-b-2 px-2 py-4 font-semibold text-gray-500 hover:text-gray-900 focus:outline-none rtl:space-x-reverse"
          @click.prevent="selectedCategory = category?.id"
          :class="[selectedCategory === category?.id ? 'border-gray-900' : 'border-transparent']" href="#">
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

const { selectedCategory, categories, posts } = storeToRefs(usePostsStore());

const loading = ref(false);

async function fetchCategories() {
    loading.value = true;
    const { data: categoriesData } = await useFetch('/api/blog/categories');

    if (!categoriesData.value) return;
    categories.value = categoriesData.value;
    loading.value = false;
}

if (!process.client) {
    await fetchCategories();
}

onMounted(async () => {
    if (categories.value?.results?.length == 0) {
        await fetchCategories();
    }
});


</script>

<style scoped></style>
