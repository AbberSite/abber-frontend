<template>
    <div class="p-4 max-w-sm rounded border-gray-200 md:p-6">
        <SkeletonsBase class=" lazyload aspect-[3/2] w-full rounded-xl bg-gray-50" />
        <SkeletonsBase class="h-2.5 w-48 mb-4" />
        <SkeletonsBase class="h-2 mb-2.5" />
        <SkeletonsBase class="h-2 mb-2.5" />
        <SkeletonsBase class="h-2" />
        <div class="flex items-center mt-4 space-x-3">
          <SkeletonsBase type="circle" class="w-14 h-14 flex justify-center items-center text-gray-400"> Icon </SkeletonsBase>
          <div>
            <SkeletonsBase class="h-2.5 w-32 mb-2"></SkeletonsBase>
            <SkeletonsBase class="w-48 h-2" />
          </div>
        </div>
      </div>
      
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>