<template>
    <div class="space-y-3 pt-4">
        <div class="flex items-center">
            <input
                v-model="filters.type.voice"

                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                name="checkbox"
                id="voice" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="voice">محادثة صوتية</label>
        </div>
        <div class="flex items-center">
            <input
                class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                type="checkbox"
                v-model="filters.type.text"
                name="checkbox"
                id="text" />
            <label class="mt-1.5 ps-3 text-sm font-medium" for="text">محادثة نصية</label>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDashTransactionsStore } from '~/stores/dashboard/dashTransactions';

const { filters } = storeToRefs(useDashTransactionsStore());
</script>

<style scoped></style>
