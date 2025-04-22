<template>
  <img v-if="app_source == 'manam'" src="https://manams.com/assets/images/logo.svg" width="24px"/>
</template>

<script lang="ts" setup>
defineProps<{
  app_source: string;
}>();
</script>

<style>

</style>