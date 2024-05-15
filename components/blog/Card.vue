<template>
  <NuxtLink v-if="slug" :to="{ name: 'blog-post-slug', params: { slug: props?.slug  } }" class="cursor-pointer" >
    <div >
      <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="image" :alt="imageAlt"  />
    </div>

    <div class="flex w-full flex-col space-y-4 pt-8 text-right">

      <div class="flex items-center justify-between text-gray-700">
        <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900"
          href="#">
          {{ type }}
        </a>
        <span class="text-[13px]">
        {{ duration }} دقائق قراءة
        </span>
      </div>

      <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
        <div >
          {{ title }}
        </div>
      </h3>

      <p class="text-justify text-sm text-gray-800 xs:text-base">
        {{ resume }}
      </p>

      <div class="text-sm font-semibold xs:text-base">
        <div >إقرأ المزيد <span aria-hidden="true">←</span></div>
      </div>

    </div>
  </NuxtLink>
</template>

<script setup lang="ts">

const props = defineProps<{
  type: string,
  title: string,
  duration: number,
  resume: string,
  image: string
  imageAlt: string,
  slug: string
}>()

</script>

<style scoped></style>