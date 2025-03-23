<template>
  <div class="w-full">
    <h2 class="pt-16 font-medium xs:text-lg">إعداد ساعات العمل</h2>
    <form @submit="submit">
      <div class="grid w-full gap-x-8 space-y-7 pt-16 sm:grid-cols-1 sm:gap-y-14 sm:space-y-0 lg:grid-cols-2">
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base" for="respond_time">وقت الاستجابة المتوقع</label>
          <select class="form-control form-select h-[50px] appearance-none" name="select" v-model="workHours.respond_time" required>
            <option value="">اختر</option>
            <option value="less_than_half_hour">أقل من نصف ساعة</option>
            <option value="1_hour">ساعة واحدة</option>
            <option value="2_hour">ساعتان</option>
            <option value="3_hour">3 ساعات</option>
            <option value="4_hour">4 ساعات</option>
          </select>
        </div>
        <div class="w-full space-y-3">
          <label class="block text-sm font-medium xs:text-base" for="respond_time">أوقات العمل</label>
          <div v-for="index in splitsCount" class="grid w-full gap-x-8 sm:grid-cols-7 sm:gap-y-14 lg:grid-cols-7">
            <DatePicker v-model="workHours.splits[index - 1].start_time" placeholder="من" model-type="HH:mm:ss" format="hh:mm aa" :is24="false" time-picker select-text="اختيار" cancel-text="الغاء" class="col-span-3" required />
            <DatePicker v-model="workHours.splits[index - 1].end_time" placeholder="إلى" model-type="HH:mm:ss" format="hh:mm aa" :is24="false" time-picker select-text="اختيار" cancel-text="الغاء" class="col-span-3" required/>
            <button v-if="index == splitsCount" @click="deleteInput" class="rounded-full text-gray-700 hover:text-red-600 focus:outline-none" type="button" aria-label="إضافة">
              <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </button>
          </div>
          <button @click="insertInput" class="block mx-auto rounded-full bg-gray-900 px-2 py-2 text-white hover:bg-gray-800 focus:outline-none" type="button" aria-label="إضافة">
            <svg class="mx-auto" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
          </button>
          <InputError :message="error" />
        </div>
      </div>

      <div class="pt-8 sm:pt-14">
        <PrimaryButton :loading="loading" type="submit">
          <span>حفظ</span>
        </PrimaryButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import DatePicker from "@vuepic/vue-datepicker";

const loading = ref(false);
const error = ref(null);
const workHours = ref({
  respond_time: "",
  splits: [],
});
const splitsCount = ref(0);

const deletedSplits = ref([]);
const workHoursData = await useDirectApi(`/expressors/workhours/`);
if (workHoursData) {
  workHours.value = workHoursData.results[0];
  splitsCount.value = workHours.value.splits.length;
}

const insertInput = () => {
  splitsCount.value += 1;
  workHours.value.splits.push({});
      error.value = null;

};

const deleteInput = () => {
  splitsCount.value -= 1;
  const split = workHours.value.splits.pop();
  if (split.id) {
    deletedSplits.value.push(split.id);
  }
  console.log(deletedSplits.value);
};

const updateWorkHourSplits = async () => {
  await workHours.value.splits.forEach(async (split) => {
    if (split.id) {
      await useDirectApi(`/expressors/workhoursplits/${split.id}/`, {
        method: "PUT",
        body: JSON.stringify(split),
      });
    } else {
      await useDirectApi("/expressors/workhoursplits/", {
        method: "POST",
        body: JSON.stringify(split),
      });
    }
  });
};

const deleteSplits = async () => {
  await deletedSplits.value.forEach(async (id) => {
    await useDirectApi(`/expressors/workhoursplits/${id}/`, {
      method: "DELETE",
    });
  });
  deletedSplits.value = [];
};

const submit = async (e: Event) => {
  e.preventDefault();
  if (splitsCount.value === 0) {
    error.value = "يجب اضافة أوقات العمل";
    return;
  }

  loading.value = true;

  await updateWorkHourSplits();
  await deleteSplits();

  const response = await useDirectApi(`/expressors/workhours/${workHours.value.id}/`, {
    method: "PATCH",
    body: { respond_time: workHours.value.respond_time },
  });

  if (response) {
    workHours.value = response;
    splitsCount.value = workHours.value.splits.length;
  }
  loading.value = false;
};
</script>

<style scoped></style>
