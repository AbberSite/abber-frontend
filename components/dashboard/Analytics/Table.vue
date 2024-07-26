<template>
    <div class="border rounded-md px-2" >
        <DashboardTablesTable :head-items="headItems" :body-items="bodyItems" class="pt-0"/>
    </div>
</template>

<script setup lang="ts">
defineProps<{headItems: Object; bodyItems: Object;}>()
</script>