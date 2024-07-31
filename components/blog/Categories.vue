<template>
  <Tabs :tabs="tabsComputed" v-model="selectedCategory" class="pt-10" />
  <div v-if="loading"
    class="blog is-scroll flex w-full items-center space-x-6 overflow-x-auto border-b border-gray-100 pt-10 text-sm rtl:space-x-reverse xs:text-base">
      <SkeletonsCategorie />
      <SkeletonsCategorie />
      <SkeletonsCategorie />
      <SkeletonsCategorie />
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue']);

const { selectedCategory, categories } = storeToRefs(usePostsStore());

const loading = ref(false);

async function fetchCategories() {
    loading.value = true;
    const { data: categoriesData } = await useFetch('/api/blog/categories');

    if (!categoriesData.value) return;
    let count = 0;
    categoriesData.value.results?.forEach((c) => count += c.posts_count)
    categories.value = {count: count, results: categoriesData.value.results};
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

const tabsComputed = computed(()=> {
  let arr = reactive([
    {name: 'الكل', value: '', count: categories.value.count, showCounter:true},
  ]);
  for(const category of categories.value.results){
    arr.push({
      name: category.name, 
      value: category.id,
      count: category.posts_count,
      showCounter: true,
      dontShowIt: !category.posts_count
    });
  }
  return arr;
})

</script>

<style scoped></style>
