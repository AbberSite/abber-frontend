<template>
  <div class="is-scroll w-full overflow-x-auto pt-6">
    <SkeletonsTable v-if="loading" />
    <table v-else class="w-full text-sm ltr:text-left rtl:text-right">
      <slot>
        <DashboardTablesThead :headItems="actions ? { ...headItems, actions: 'إجراءات' } : headItems">
        </DashboardTablesThead>
        <tbody class="divide-y">
          <tr v-for="(row, rowIndex) in bodyItems" :key="rowIndex">
            <DashboardTablesRow v-for="(value, key, colIndex) in headItems" :key="colIndex"
              :content="getNestedValue(row, key)" :name="key" />
            <DashboardTablesRow v-if="actions">
              <DashboardTablesCellsActions :actions="actions" :data="row" />
            </DashboardTablesRow>
          </tr>
        </tbody>
      </slot>
    </table>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ headItems: {}; bodyItems: []; loading: Boolean; actions: Object }>();

function getNestedValue(obj: Record<string, any>, key: string): any {
  return key.split(".").reduce((o, k) => (o || {})[k], obj) ?? obj.id;
}
</script>

<style></style>
