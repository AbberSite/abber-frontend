<template>
  <div class="bg-white flex flex-col min-h-screen outline-none">
    <DashboardMainDrawer />
    <div id="sections" class="content duration-300 ease-linear flex flex-col lg:pr-[6.1rem] transition-all w-full">
      <DashboardMainHeader />
      <div class="pt-3 px-5">
        <slot/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>
