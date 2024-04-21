<template>
  <Modal title="كيف يمكننا مساعدتك" @close="emit('close')">
    <fieldset class="is-scroll space-y-7 overflow-y-auto px-6 py-8">

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
            
            <div class="fixed bottom-0 w-full border-t border-gray-100 bg-white px-6 py-6 sm:w-[340px]"
              v-show="finished" cloak>
              <button
                class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                type="submit" @click="submit()"><span class="mt-1.5">محادثة الدعم</span></button>
            </div>



      <!-- <div class="w-full space-y-3" v-for="(levelProblems, level) in sortedProblems" :key="level">
        <label class="block text-sm font-semibold xs:text-base" v-if="level === 0">نوع المشكلة</label>
        <select v-show="currentLevel >= level && (level == 0 || parent == key || requestBody[level - 1] == key)" v-for="(problems, key) in levelProblems" class="form-control form-select h-[50px] appearance-none" :name="requestBody[level]" @change="serProblems($event, level)" :key="key" required>
          <option :value="null">أختر</option>
          <option v-for="problem of problems" :key="problem.id" :value="problem.id" v-text="problem.name"></option>
        </select>
      </div>
      <div v-show="result" class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm" x-show="alert" role="alert">
        <div class="mt-1.5 flex">
          <span class="me-3 flex-shrink-0">
            <svg class="text-blue-500" height="24" width="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"></path>
            </svg>
          </span>
          <div class="w-0 flex-1 text-sm font-medium leading-loose" v-text="result"></div>
        </div>
      </div>
      <PrimaryButton v-show="result" class="w-full mt-1.5" @click="submit" :loading="loading" type="submit">
        <span class="mt-1.5">محادثة الدعم</span>
      </PrimaryButton> -->
    </fieldset>
  </Modal>
</template>

<script setup lang="ts">


const emit = defineEmits(['close', 'refreshTickets']);
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
  })
  if (data) {
    useNotification({ type: 'success', content: 'لقد تم انشاء تذكرتك بنجاح!' });
    emit('close');
    emit('refreshTickets');
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


// const problems = ref<Problem[]>([]);
// const currentLevel = ref(0);
// const parent = ref<number | null>(null);
// const result = ref<string | null>(null);
// const requestBody = ref({});
// const sortedProblems = ref<any[]>([]);

// const loading = ref(false);

// const emit = defineEmits(["close"]);

// async function sortProblems() {
//   let sortedArray: any[] = [];

//   problems.value.forEach((item, index) => {
//     const key = `${item.parent}`;
//     if (!sortedArray[item.nesting_level]) {
//       sortedArray[item.nesting_level] = {};
//     }
//     if (!sortedArray[item.nesting_level][key]) {
//       sortedArray[item.nesting_level][key] = [];
//     }
//     sortedArray[item.nesting_level][key].push(item);
//   });

//   sortedProblems.value = sortedArray;
// }

// function serProblems(event: Event, level: Number) {
//   let problem_id = Number(event.target.value);

//   requestBody.value[level] = problem_id; // set problems of client.

//   currentLevel.value = level + 1; // Move to the next level to view sub-problems from the current problem

//   // find curren problem with id
//   const problem = problems.value.find((item) => item.id === problem_id);

//   // remove old result and show result of new sub-problem if exist
//   result.value = null;
//   if (problem?.result) {
//     result.value = problem.result;
//   }

//   parent.value = problem_id; // set new problem as parent to the next
// }

// onMounted(async () => {
//   const data = await useApi("/api/tickets/getProblems", { params: { limit: 100 } });
//   problems.value = data.results;
//   await sortProblems(); // sort problems by levels.
// });

// async function submit() {
//   loading.value = true;
//   try {
//     await useProxy(`/support/tickets/`, {
//       method: "POST",
//       body: { nesting_levels: requestBody.value },
//     });

//     emit("close");
//     useNotification({ type: "success", content: "لقد تم انشاء تذكرتك بنجاح!" });
//   } catch (error) {
//     emit("close");
//     useNotification({ type: "danger", content: "حدث خطأ." });
//   } finally {
//     loading.value = false;
//   }
// }
</script>
