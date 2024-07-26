<template>
    <div class="border rounded-md px-2" >
        <DashboardTablesTable :head-items="headItems" :body-items="bodyItems" style="padding-top: 0px !important;" />
    </div>
</template>

<script setup lang="ts">
defineProps<{headItems: Object; bodyItems: Object;}>()
</script>