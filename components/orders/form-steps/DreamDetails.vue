<template>
    <form method="POST" @submit.prevent="$emit('next', {})">


        <div>

            this is the second step
        </div>
        
        <PrimaryButton class="w-full">
            <span class="mt-1.5">متابعة</span>
        </PrimaryButton>
      </form>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>