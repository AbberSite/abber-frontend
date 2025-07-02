<template>
    <DashboardTitle department="الدعم التقني" title="اعدادات مركز المساعدة"/>
    <DashboardTablesTable :head-items="{ name: 'المشكلة', parent:'الأب' }" :body-items="problemsWithParent" :actions="{ modify: true, remove: true }" :loading="loading" addButton />
    <ClientOnly>
        <ModifyModal @close="showModal = false" v-if="showModal" :title="title" >
            <div class="flex flex-col gap-2 mt-2" >
                <CustomSelect class="w-full" label="الأب" :options="parentOptions" v-model="problem_data.parent" />
                <TextInput label="اسم المشكلة" v-model="problem_data.name" />
                <TextInput label="الحل" type="textarea" v-model="problem_data.result"/>
                <CustomSelect class="w-full" label="دور المستخدم" :options="[ { value: 4, text: 'عميل' }, { value: 3, text: 'معبر' },{ value: 1, text: 'إدارة' }]" multi dialog v-model="problem_data.role" />
                <PrimaryButton class="w-full my-2" :loading="updateLoading" @click="createSubmit">متابعة</PrimaryButton>
            </div>
        </ModifyModal>
        <ConfirmDialog 
            v-if="showConfirmDialog" 
            @close="showConfirmDialog = false" 
            @confirm="deleteProblem(problem_data.id)" 
            title="حذف المشكلة" 
            description="هل أنت متأكد من حذف هذه المشكلة؟" @continue="deleteProblem(problem_data.id)"
        />
    </ClientOnly>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CustomSelect from '~/components/shared/CustomSelect.vue';
import { useDashboardHelpStore } from '~/stores/dashboard/dashboardHelp';
const { fetchProblems, createProblem, deleteProblem } = useDashboardHelpStore();
const { problems, loading, problem_data, updateLoading } = storeToRefs(useDashboardHelpStore());
let showModal = ref(false);
let showConfirmDialog = ref(false);
let title = ref('');
const { $listen } = useNuxtApp();
// Helper to build a map of id to problem
const problemMap = computed(() => {
  const map = {};
  problems.value.forEach(p => {
    map[p.id] = p;
  });
  return map;
});

// Recursive function to get the full path for a problem (for select options)
function getProblemPath(problem, map) {
  if (!problem) return '';
  if (!problem.parent || !map[problem.parent]) return problem.name;
  return getProblemPath(map[problem.parent], map) + ' -> ' + problem.name;
}

// Computed options for parent select (exclude self as parent)
const parentOptions = computed(() => {
  const map = problemMap.value;
  return problems.value.map(p => ({
    value: p.id,
    text: getProblemPath(p, map)
  }));
});

// Recursive function to get the full path for a problem's parent
function getParentPath(problem, map) {
  if (!problem || !problem.parent || !map[problem.parent]) return '';
  const parent = map[problem.parent];
  if (!parent) return '';
  // Recursively build the path
  const parentPath = getParentPath(parent, map);
  return parentPath ? parentPath + ' -> ' + parent.name : parent.name;
}

// Add parent (full path) to each problem for the table
const problemsWithParent = computed(() =>
  problems.value.map(p => ({
    ...p,
    parent: p.parent ? getParentPath(p, problemMap.value) : '-',
  }))
);

$listen('table-modify-object', (data) => {
  showModal.value = true;
  title.value = "تعديل المشكلة";
});
$listen('open_add_window', () => {
  showModal.value = true;
  title.value = "انشاء مشكلة جديدة";
});
$listen('table-remove-object', (data) => {
//   deleteProblem(data.id);
    problem_data.value.id = data.id;
});
onMounted(async () => {
  await fetchProblems();
});
function createSubmit() {
  updateLoading.value = true;
  createProblem()
    .then(() => {
      showModal.value = false;
    })
}
</script>