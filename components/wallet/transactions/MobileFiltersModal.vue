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
                    <div class="pb-4 pt-8">
                      <div class="mb-10 flex items-center justify-between space-x-3 rtl:space-x-reverse">
                        <h3 class="mt-1.5 text-lg font-medium">فلترة</h3>
                        <a class="flex items-center rounded-md bg-gray-900 px-4 py-3 text-xs font-medium text-white shadow-sm hover:bg-gray-800" href="#" @click.prevent="apply">تطبيق</a>
                      </div>
                      <div class="is-scroll max-h-[400px] space-y-7 overflow-y-auto">
                        <div class="w-full space-y-3">
                          <label class="block text-sm font-medium xs:text-base" for="select">عملية ناجحة</label>
                          <select v-model="status" class="form-control form-select h-[50px] appearance-none" name="select" id="select" required>
                            <option value="">الكل</option>
                            <option value="true">نعم</option>
                            <option value="false">لا</option>
                          </select>
                        </div>
                        <div class="w-full space-y-3">
                          <label class="block text-sm font-medium xs:text-base" for="select">التأريخ</label>
                          <select class="form-control form-select h-[50px] appearance-none" name="select" id="select" required>
                            <option>الكل</option>
                            <option>اخر يوم</option>
                            <option>اخر إسبوع</option>
                            <option>اخر شهر</option>
                            <option>تأريخ مخصص</option>
                          </select>
                        </div>
                      </div>
                    </div>
                </div>
            </TransitionChild>
        </div>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';

const emit = defineEmits(["close"])

const status = ref<"" | "true" | "false">('')

const { filters } = storeToRefs(useTransactionsStore())

onMounted(() => {
    status.value = filters.value.success ?? ''
})

function apply(){

    filters.value.success =  status.value
    emit("close")

}
</script>

<style scoped></style>
