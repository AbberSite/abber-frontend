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
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-8">
            <h2 class="text-lg font-semibold xs:text-xl">كيف يمكننا مساعدتك</h2>
            <button class="-m-2.5 p-2.5 text-gray-700 hover:text-gray-900" type="button" @click="$emit('close')">
              <span class="sr-only">إغلاق القائمة</span>
              <!-- Heroicon name: outline/x-mark -->
              <svg height="26" width="26" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div class="is-scroll overflow-y-auto px-6 py-8 pb-36">
            <fieldset class="space-y-7">
              <div class="w-full space-y-3" v-if="cateForProblem.first_level.length != 0">
                <label class="block text-sm font-semibold xs:text-base">نوع المشكلة</label>
                <select class="form-control form-select h-[50px] appearance-none" name="select"
                  v-model="categoriesForProblem.first_level" @change="getSecondSelection()" required>
                  <option value="">أختر</option>
                  <option v-for="name of cateForProblem.first_level" :key="name.id" :value="name.id">{{ name.name }}
                  </option>
                </select>
              </div>
              <!-- Second level select fields -->
              <div v-show="categoriesForProblem.first_level != '' && cateForProblem.second_level.length != 0" v-cloak>
                <div class="w-full space-y-3">
                  <select class="form-control form-select h-[50px] appearance-none" name="select"
                    v-model="categoriesForProblem.second_level" @change="getThirdSelection()" required>
                    <option value="">أختر</option>
                    <option v-for="name of cateForProblem.second_level" :key="name.id" :value="name.id">{{ name.name }}
                    </option>
                  </select>
                </div>
              </div>
              <!-- Third level select fields -->
              <div v-if="categoriesForProblem.second_level != '' && cateForProblem.third_level.length != 0" v-cloak>
                <div class="w-full space-y-3">
                  <select class="form-control form-select h-[50px] appearance-none" name="select"
                    v-model="categoriesForProblem.third_level" @change="getForthSelection()" required>
                    <option value="">أختر</option>
                    <option v-for="name of cateForProblem.third_level" :key="name.id" :value="name.id">{{ name.name }}
                    </option>
                  </select>
                </div>
              </div>

              <!-- Four level select fields -->
              <div v-show="finished" x-cloak>
                <div
                  class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
                  x-show="alert" role="alert">
                  <div class="mt-1.5 flex">
                    <span class="me-3 flex-shrink-0">
                      <!-- Heroicon name: outline/information-circle -->
                      <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                        </path>
                      </svg>
                    </span>
                    <div class="w-0 flex-1 text-sm font-medium leading-loose">أدخل المشكلة بالتفصيل وسيتم الرد في اقرب
                      وقت</div>
                  </div>
                </div>
              </div>
              <div v-show="categoriesForProblem.first_level == 'jj'" x-cloak>
                <div
                  class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
                  x-show="alert" role="alert">
                  <div class="mt-1.5 flex">
                    <span class="me-3 flex-shrink-0">
                      <!-- Heroicon name: outline/information-circle -->
                      <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round"
                          d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z">
                        </path>
                      </svg>
                    </span>
                    <div class="w-0 flex-1 text-sm font-medium leading-loose">قم بوصف مشكلتك بالضبط مع ذكر رابط الصفحة
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
            <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]"
              v-show="finished" cloak>
              <button
                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="submit" @click="submit()"><span class="mt-1.5">محادثة الدعم</span></button>
            </div>
          </div>
        </div>

      </TransitionChild>
    </div>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import 'intl-tel-input/build/css/intlTelInput.css';

const emit = defineEmits(['close', 'show']);
const categoriesForProblem = reactive({
  first_level: '',
  second_level: '',
  third_level: '',
  forth_level: ''
});
const cateForProblem = reactive({
  first_level: [],
  second_level: [],
  third_level: [],
  forth_level: []
});
let finished = ref(false);
onMounted(async () => {
  const data = await useApi('/api/tickets/getProblems', { params: { nesting_level: 0 } });
  cateForProblem.first_level = data.results;
});


async function submit() {
  const data = await useProxy('/support/tickets/', {
    method: 'POST',
    body: { nesting_levels: { "0": categoriesForProblem.first_level.toString(), "1": categoriesForProblem.second_level.toString(), "2": categoriesForProblem.third_level.toString() } }
  });
  if (data) {
    useNotification({ type: 'success', content: 'لقد تم انشاء تذكرتك بنجاح!' });
    emit('close');
  }
};
async function getSecondSelection() {
  const data = await useApi('/api/tickets/getProblems', { params: { nesting_level: 1, parent__id: categoriesForProblem.first_level } });
  cateForProblem.second_level = data.results;
  if (finished.value)
    finished.value = false;

  categoriesForProblem.second_level = '';
  categoriesForProblem.third_level = '';
  categoriesForProblem.forth_level = '';
};

async function getThirdSelection() {
  const data = await useApi('/api/tickets/getProblems', { params: { nesting_level: 2, parent__id: categoriesForProblem.second_level } });
  if (!data.count) {
    finished.value = true;
  } else {
    cateForProblem.third_level = data.results;
    if (finished.value)
      finished.value = false;
  }

  categoriesForProblem.third_level = '';
  categoriesForProblem.forth_level = '';
}

async function getForthSelection() {
  const data = await useApi('/api/tickets/getProblems', { params: { nesting_level: 3, parent__id: categoriesForProblem.third_level } });
  if (!data.count) {
    finished.value = true;
  } else {
    cateForProblem.forth_level = data;
    finished.value = false
  }
  categoriesForProblem.forth_level = '';
}
</script>

<style>
.wpwl-group-cardNumber {
  @apply relative;
}

.wpwl-control-cardNumber,
.wpwl-control-mobilePhone {
  @apply form-control h-[50px] pl-12 w-full;
}

.wpwl-control-mobilePhone {
  @apply form-control h-[50px] block text-sm xs:text-base w-full;
  direction: rtl;
}

.wpwl-control-expiry {
  @apply form-control h-[50px] appearance-none w-full;
}

.wpwl-control-cvv {
  @apply form-control h-[50px] appearance-none;
}

.cvv-expiry-wrapper {
  @apply flex items-start justify-between gap-5 mb-2 w-full;
}

.wpwl-group {
  @apply w-full space-y-3;
}

.wpwl-wrapper {
  @apply w-full;
}

.wpwl-form {
  @apply space-y-7;
}

.wpwl-label-cvv,
.wpwl-label-expiry,
.wpwl-label-cardNumber,
.wpwl-label-mobilePhone {
  @apply block text-sm font-semibold xs:text-base w-full;
  direction: rtl;
}

.wpwl-group-cardHolder,
.wpwl-group-brand {
  @apply hidden;
}

.wpwl-button-pay {
  /* @apply flex */
  @apply hidden h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 focus:bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-black focus:border-gray-900 focus:outline-none focus:ring-offset-2 focus:ring-1 focus:ring-gray-900;
}

.wpwl-button-error {
  @apply !cursor-not-allowed !bg-gray-100 !text-black !border-none;
}

.activeIframe {
  @apply border-gray-900 text-base outline-none ring-1 ring-gray-900 placeholder:opacity-0;
}
</style>
