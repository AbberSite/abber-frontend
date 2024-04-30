<template>
    <TransitionRoot as="template">
    <div class="fixed inset-0 sm:hidden z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
      </TransitionChild>

      <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-y-full "
        enter-to="translate-y-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-y-0"
        leave-to="translate-y-full" as="template">
        <div
          class="is-scroll fixed bottom-0 z-40 max-h-[800px] w-full overflow-y-auto rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6 sm:hidden"
          v-cloak>
          <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button" @click="$emit('close')"></button>
          <nav class="pt-6">
            <h1 class="font-semibold text-lg border-b py-3">شروط استلام الطلب</h1>
            <div class="pt-3" v-html="settings?.policy_settings?.order_terms"/>
            <PrimaryButton class="w-full my-2 items-center" >إستلام الطلب وتقييمه</PrimaryButton>
          </nav>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from "@headlessui/vue";
const {settings} = storeToRefs(useSettingsStore());
</script>