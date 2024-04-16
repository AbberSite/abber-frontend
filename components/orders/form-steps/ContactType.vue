<template>

  <Head>
    <title>عبر - طلب تعبير حلم - طريقة تعبير الحلم</title>
  </Head>
  <div method="POST">
    <fieldset class="space-y-7">
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
              <span class="ms-3 mt-1.5 text-sm font-semibold">محادثة نصية</span>
              <span class="ms-3 text-[13px] leading-loose text-gray-700">سيتواصل المعبر معك نصيا عن طريق شات منصة
                عبر.</span>
            </span>
          </div>

          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" id="text-communication" type="radio"
            name="type" value="text_communication" />
        </label>
        <label @click.once="submit('video_communication')"
          class="flex cursor-pointer justify-between rounded-md border px-4 py-4 shadow-sm focus-within:border-gray-900 focus-within:ring-1 focus-within:ring-gray-900 focus:outline-none"
          :class="voiceCommunicationButtonClasses">
          <div class="flex pt-1.5">
            <span class="flex-shrink-0">
              <MicrophoneIcon class="w-6 h-6" />
            </span>
            <span class="flex flex-col space-y-3">
              <span class="ms-3 mt-1.5 text-sm font-semibold">محادثة صوتية</span>
              <span class="ms-3 text-[13px] leading-loose text-gray-700">سيتواصل المعبر معك صوتيا عن طريق تطبيق
                Zoom.</span>
            </span>
          </div>
          <input class="h-5 w-5 flex-shrink-0 appearance-none rounded-full" id="voice-communication" type="radio"
            name="type" value="video_communication" />
        </label>
      </template>

      <!-- <PrimaryButton :disabled="!selectedOption" class="w-full">
                <span class="mt-1.5">متابعة</span>
            </PrimaryButton> -->
    </fieldset>
  </div>
</template>

<script setup lang="ts">
import { ChatBubbleLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/vue/24/outline';
import useNotification from '~/composables/useNotification';
import type { OrderForm } from '~/types';

const { state, next } = useFormWizard<OrderForm>('order');

const selectedOption = ref(state.value.data?.type);
const { fetchAll, fetchVideoServices } = useServicesStore();

const { videoServices, videoServicesPagination } = storeToRefs(useServicesStore());

const loading = ref(false);

// if (process.server) {
//   loading.value = true;
//     await fetchAll();
//     await fetchVideoServices();
//     loading.value = false;
// }

console.log(process.server)

onMounted(async () => {
    // fetch services before selection step for optimazation

    // if (videoServicesPagination.value?.results?.length == 0) {
      loading.value = true;
        await fetchAll();
        await fetchVideoServices();
        loading.value = false;
    // }

    if (videoServicesPagination?.value?.count == 0) {
        useNotification({ content: 'الخدمة الصوتية متوقفة حاليا', type: 'warning', id : 445 }, true, 2000);
    }
});

const voiceCommunicationButtonClasses = computed(() => {
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
