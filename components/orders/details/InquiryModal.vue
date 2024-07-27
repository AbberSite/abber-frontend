<template>
  <TransitionRoot as="template">
    <div class="fixed inset-0 z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" @click="$emit('close')"></div>
      </TransitionChild>

      <TransitionChild enter="transition ease-in-out duration-300 transform" enter-from="translate-x-full "
        enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0"
        leave-to="translate-x-full" as="template">
        <div class="fixed inset-0 z-40 bg-white sm:w-[340px]" v-cloak>
          <div class="flex h-full flex-col">
            <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
              <h2 class="text-lg font-semibold xs:text-xl">استفسار للمعبر</h2>
              <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="$emit('close')">
                <span class="sr-only">إغلاق القائمة</span>
                <!-- Heroicon name: outline/x-mark -->
                <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">
              <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="textarea"></label>
                <textarea v-model="message" class="form-control block max-h-[300px] min-h-[200px] py-4"
                  name="textarea" id="textarea" rows="5" ></textarea>
                <InputError :message="errors.message"/>
              </div>
              <PrimaryButton @click="submit" :loading="loading" type="submit">
                <span>إرسال</span>
              </PrimaryButton>
            </fieldset>
          </div>
        </div>
      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import * as yup from 'yup';
const id = useRoute().params.id;
const emit = defineEmits(['close']);
const {validate, errors, defineField} = useForm({
  validationSchema:toTypedSchema(
    yup.object({
      message: yup.string().required("هذا الحقل مطلوب").min(5, 'يجب ان يحتوي مالا يقل عن كلمتين')
    })
  )
})
const loading = ref(false);

const { order } = storeToRefs(useOrdersStore());
const [message] = defineField('message');
const inquiry = ref({
  message: '',
  order_id: id
});

async function submit() {
  if(!(await validate()).valid) return;
  loading.value = true;
  try {
    const data = await useDirectApi(`/orders/my-orders/${id}/inquiry/`, {
      method: 'POST',
      body: inquiry.value
    });

    emit('close');
    useNotification({ type: 'success', content: data.value?.detail ?? 'تم ارسال الاستفسار بنجاح.'});
  } catch (error: any) {
    emit('close');
    useNotification({ type: 'danger', content: 'خدث خطأ عند إرسال الاستفسار .' });
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped></style>
