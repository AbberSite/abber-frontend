<template>
  <SkeletonsTable v-if="loading" />
  <div v-else class="is-scroll w-full overflow-x-auto pt-6">
    <table class="w-full text-sm ltr:text-left rtl:text-right">
      <slot>
        <DashboardTablesThead :headItems="headItems"></DashboardTablesThead>
        <tbody class="divide-y">
          <tr v-for="(row, rowIndex) in bodyItems" :key="rowIndex">
            <DashboardTablesRow v-for="(value,key, colIndex) in headItems" :key="colIndex" :content="row[key]" :name="key"/>
          </tr>
        </tbody>
      </slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ headItems: {}; bodyItems: [];loading:Boolean }>();
</script>

<style></style>
