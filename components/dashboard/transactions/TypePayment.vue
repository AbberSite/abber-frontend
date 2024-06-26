<template>
    <img v-if="type == 'VISA'" src="/images/payments/section/visa-icon.png" class="w-7" alt="">
    <img v-else-if="type == 'MASTER'" src="/images/payments/section/mastercard.svg" class="w-7" alt="">
    <img v-else-if="type == 'MADA'" src="/images/payments/section/mada.png" class="w-7" alt="">
    <img v-else-if="type == 'APPLEPAY'" src="/images/payments/applepay.svg" class="w-7" alt="">
    <svg v-else-if="type == 'BALANCE'" class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
        <path fill-rule="evenodd"
            d="M12 14a3 3 0 0 1 3-3h4a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-4a3 3 0 0 1-3-3Zm3-1a1 1 0 1 0 0 2h4v-2h-4Z"
            clip-rule="evenodd" />
        <path fill-rule="evenodd"
            d="M12.293 3.293a1 1 0 0 1 1.414 0L16.414 6h-2.828l-1.293-1.293a1 1 0 0 1 0-1.414ZM12.414 6 9.707 3.293a1 1 0 0 0-1.414 0L5.586 6h6.828ZM4.586 7l-.056.055A2 2 0 0 0 3 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-4a5 5 0 0 1 0-10h4a2 2 0 0 0-1.53-1.945L17.414 7H4.586Z"
            clip-rule="evenodd" />
    </svg>
    <!-- <svg v-else  class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> -->
</template>

<script setup lang="ts">
defineProps<{
    type?: string;
}>();
</script>

<style scoped></style>