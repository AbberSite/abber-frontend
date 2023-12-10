<template>
    <article>
        <a href="#">
          <img class="lazyload aspect-[3/2] w-full rounded-xl bg-gray-50" :src="image" alt="صورة المقالة" />
        </a>

        <div class="flex w-full flex-col space-y-4 pt-8 text-right">

          <div class="flex items-center justify-between text-gray-700">
            <a class="rounded-full bg-gray-50 px-4 pb-1.5 pt-2 text-[13px] font-semibold hover:bg-gray-100 hover:text-gray-900" href="#"> 
                {{ type }}
            </a>
            <span class="text-[13px]">
                {{ duration }}
            </span>
          </div>

          <h3 class="pt-2 font-semibold leading-[1.75] xs:text-lg xs:leading-[1.75]">
            <a href="#">
                {{ title }}
            </a>
          </h3>

          <p class="text-justify text-sm text-gray-800 xs:text-base">
            {{ resume }}
          </p>

          <div class="text-sm font-semibold xs:text-base">
            <a href="#">إقرأ المزيد ←</a>
          </div>

        </div>
      </article>
</template>

<script setup lang="ts">

defineProps<{
    type : String,
    title : String, 
    duration : String, 
    resume : String,
    image : String
}>()

</script>

<style scoped>

</style>