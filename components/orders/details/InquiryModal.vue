<template>
  <Modal @close="$emit('close')" title="أستفسار للمعبر">
    <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">
              <div class="w-full space-y-3">
                <label class="block text-sm font-medium xs:text-base" for="textarea"></label>
                <textarea v-model="message" class="form-control block max-h-[300px] min-h-[200px] py-4"
                  name="textarea" id="textarea" rows="5" ></textarea>
                <InputError :message="errors.message"/>
              </div>
              <PrimaryButton @click="submit" :loading="loading" type="submit">
                <span>إرسال</span>
              </PrimaryButton>
            </fieldset>
  </Modal>
  
</template>

<script setup lang="ts">
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
