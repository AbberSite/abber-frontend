<template>
  <span class="flex justify-center w-full space-x-3 space-x-reverse">
    <NuxtLink v-if="actions?.view" :to="actions.view.path + data[property]"><EyeIcon class="w-5 h-5" /></NuxtLink>
    <NuxtLink class="text-gray-900" v-if="actions?.details" :to="($route.path +'/'+ data[property]).replace('//','/')"><Cog6ToothIcon class="w-5 h-5" /></NuxtLink>
    <button class="text-green-600 hover:text-green-700" v-if="actions?.modify && otherCheckStatus(data)" @click="modify(data)"><PencilSquareIcon class="w-5 h-5" /></button>
    <button class="text-red-600 hover:text-red-700" v-if="actions?.remove && otherCheckStatus(data)" @click="remove(data?.id)"><TrashIcon class="w-5 h-5" /></button>
  </span>
</template>

<script lang="ts" setup>
import { EyeIcon, TrashIcon, PencilSquareIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
defineProps({
  data: Object,
  actions: Object,
});
const { $event } = useNuxtApp();
const property = inject('pathProperty') || 'id';
const add = () => {
  $event("table-add-object");
}; 
const modify = (data: Object) => {
  $event("table-modify-object", data);
};
const remove = (id: Number) => {
  $event("table-remove-object", { id: id });
};
const otherCheckStatusFunc = inject('otherCheckStatus') as Function || function(){return true;};
const otherCheckStatus = (data)=> otherCheckStatusFunc(data) as boolean ;
</script>

<style></style>
