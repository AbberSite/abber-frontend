<template>
  <span class="flex justify-center w-full space-x-3 space-x-reverse">
    <NuxtLink v-if="actions?.view" :to="actions.view.path + data?.id"><EyeIcon class="w-5 h-5" /></NuxtLink>
    <NuxtLink class="text-gray-900" v-if="actions?.details" :to="$route.path + data?.id"><Cog6ToothIcon class="w-5 h-5" /></NuxtLink>
    <button class="text-green-600 hover:text-green-700" v-if="actions?.modify && data?.status == '1'" @click="modify(data?.id)"><PencilSquareIcon class="w-5 h-5" /></button>
    <button class="text-red-600 hover:text-red-700" v-if="actions?.remove" @click="remove(data?.id)"><TrashIcon class="w-5 h-5" /></button>
    <button class="text-green-600 hover:text-green-700" v-if="actions?.accept" @click="accept(data?.id)"><CheckCircleIcon class="w-5 h-5" /></button>
    <button class="text-red-600 hover:text-red-700" v-if="actions?.reject" @click="reject(data?.id)"><XCircleIcon class="w-5 h-5" /></button>
  </span>
</template>

<script lang="ts" setup>
import { EyeIcon, XCircleIcon, CheckCircleIcon, TrashIcon, PencilSquareIcon, Cog6ToothIcon } from "@heroicons/vue/24/outline";
defineProps({
  data: Object,
  actions: Object,
});
const { $event } = useNuxtApp();

// Add a new public events to the event bus
const add = () => {
  $event("table-add-object");
}; // add item
const modify = (id: Number) => {
  $event("table-modify-object", { id: id });
}; // modify item
const remove = (id: Number) => {
  $event("table-remove-object", { id: id });
};
</script>

<style></style>
