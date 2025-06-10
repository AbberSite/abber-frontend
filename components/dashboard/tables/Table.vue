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
              <DashboardTablesCellsActions :actions="actions" :data="row" :property="property" />
            </DashboardTablesRow>
          </tr>
        </tbody>
      </slot>
    </table>
    <div v-if="addButton" class="fixed bottom-4 flex flex-col space-y-3 ltr:right-4 rtl:left-4 xs:bottom-6 ltr:xs:right-6 rtl:xs:left-6 lg:bottom-8 ltr:lg:right-8 rtl:lg:left-8">
        <button class="rounded-full bg-gray-900 px-4 py-4 text-white hover:bg-gray-800 focus:outline-none" type="button" @click="()=> $event('open_add_window')" aria-label="إضافة">
          <!-- Heroicon name: outline/plus -->
          <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
          </svg>
        </button>
      </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ headItems: {}; bodyItems: []; loading: Boolean; actions?: Object; addButton?: boolean; property: {type: String}}>();
const  {$event} = useNuxtApp();
function getNestedValue(obj: Record<string, any>, key: string): any {
  return key.split(".").reduce((o, k) => (o || {})[k], obj) ?? '-';
}
</script>

<style></style>
