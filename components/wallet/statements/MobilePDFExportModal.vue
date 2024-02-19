<template>
    <TransitionRoot as="template">
        <div class="fixed inset-0 sm:hidden">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
            </TransitionChild>

            <TransitionChild
                enter="transition ease-in-out duration-300 transform"
                enter-from="translate-y-full "
                enter-to="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leave-from="translate-y-0"
                leave-to="translate-y-full"
                as="template">
                <div class="fixed bottom-0 z-40 w-full rounded-t-2xl border-t border-gray-100 bg-white px-6 py-6">
                    <button class="mx-auto block h-1 w-8 rounded-lg bg-gray-300" type="button" @click="$emit('close')"></button>
                    <fieldset class="space-y-7 p-4">
                      <div class="w-full space-y-3">
                          <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ من</label>
                          <input
                              class="form-control h-[50px] appearance-none"
                              type="date"
                              name="date"
                              id="date"
                              dir="rtl"
                              value=""
                              />
                      </div>
                      <div class="w-full space-y-3">
                          <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ إلى</label>
                          <input
                              class="form-control h-[50px] appearance-none"
                              type="date"
                              name="date"
                              id="date"
                              dir="rtl"
                              value=""
                              />
                      </div>
                  </fieldset>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const emit = defineEmits(["close"])

onMounted(() => {

})

function apply(){

    emit("close")

}
</script>

<style scoped></style>
