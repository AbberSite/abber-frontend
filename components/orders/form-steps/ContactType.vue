<template>

  <Head>
    <title>عبر - طلب تعبير حلم - طريقة تعبير الحلم</title>
  </Head>
  <div method="POST">
    <fieldset class="space-y-5">
      <template v-if="loading">
        <SkeletonsContactType />
        <SkeletonsContactType />
      </template>
      <template v-else>
        <label @click.once="submit('text_communication')"
          class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
          :class="[selectedOption == 'text_communication' && 'border-gray-900 ring-1 ring-gray-900']">
          <div class="flex pt-1.5">
            <span class="flex-shrink-0">
              <ChatBubbleLeftEllipsisIcon class="w-6 h-6" />
            </span>
            <span class="flex flex-col space-y-3">
              <span class="ms-3 mt-1.5 text-sm font-medium">محادثة نصية</span>
              <span class="ms-3 text-[13px] leading-loose text-gray-700">سيتواصل المعبر معك نصيا عن طريق شات منصة
                عبر.</span>
            </span>
          </div>

          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" id="text-communication" type="radio"
            name="type" value="text_communication" />
        </label>
      </template>
    </fieldset>
    <div class="flex justify-center pt-8">
      <button class="text-blue-600 text-sm xs:text-base" @click="navigateTo('/')">
        <span aria-hidden="true">→</span> الرجوع للصفحة الرئيسية
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';
import useNotification from '~/composables/useNotification';
import type { OrderForm } from '~/types';

const { state, next } = useFormWizard<OrderForm>('order');

const selectedOption = ref(state.value.data?.type);
const { fetchAll, fetchVideoServices } = useServicesStore();

const { videoServicesPagination } = storeToRefs(useServicesStore());

const loading = ref(false);

if (process.server) {
  loading.value = true;
  await fetchAll();
  await fetchVideoServices();
  loading.value = false;
}


onMounted(async () => {
  loading.value = true;
  await fetchAll();
  await fetchVideoServices();
  loading.value = false;

  if (videoServicesPagination?.value?.count == 0) {
    useNotification({ content: 'الخدمة الصوتية متوقفة حاليا', type: 'warning', id: 445 }, true, 2000);
  }
});

const voiceCommunicationButtonClasses = computed(() => {
    if (useRuntimeConfig().public.production){
    return 'hidden';
  }
  if (videoServicesPagination?.value?.count == 0)
    return 'cursor-not-allowed bg-gray-100 text-black pointer-events-none';
  if (selectedOption.value == 'video_communication') return 'border-gray-900 ring-1 ring-gray-900';
});

function submit(value: 'text_communication' | 'video_communication') {
  selectedOption.value = value;

  next({
    nextStepId: selectedOption.value === 'video_communication' ? 'service' : 'dream-details',
    data: {
      type: selectedOption.value
    }
  });
}
</script>

<style scoped></style>
