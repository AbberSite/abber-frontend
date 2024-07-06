<template>
  <TransitionRoot appear :show="show" as="template">
    <Dialog as="div" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95" enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
            <DialogPanel class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-right align-middle shadow-xl transition-all" id="mytemp">
              <DialogTitle as="div" class="flex flex-col-reverse items-center">
                <ExclamationTriangleIcon class="w-8 h-8" />
                <h3 class="text-[16px] font-semibold leading-6 text-gray-900 py-1">نحتاج المعلومات الأساسية للإستمرار</h3>
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500 text-center">الرجاء تعبئة الحقول الفارغة</p>
              </div>

              <div class="mt-4 flex flex-col gap-2">
                <div class="w-full space-y-3">
                  <label class="block text-sm font-semibold xs:text-base" for="gender">الجنس</label>
                  <select v-model="gender" class="form-control form-select h-[50px] appearance-none" type="select" name="select" id="gender" required>
                    <option value="" selected hidden disabled>اختر</option>
                    <option value="Male">ذكر</option>
                    <option value="Female">أنثى</option>
                  </select>
                  <InputError :message="errors.birthday" />
                </div>
                <div class="w-full space-y-3 dream_time">
                  <label class="text-sm font-semibold xs:text-base" @click="datePicker?.openMenu()"> تاريخ الميلاد</label>

                  <DatePicker placeholder="mm/dd/yyyy" :max-date="new Date()" prevent-min-max-navigation v-model="birthday" model-type="yyyy-MM-dd" ref="datePicker" id="date" format="yyyy-MM-dd" auto-apply required />

                  <!-- <InputError :message="errors.dream_time" /> -->
                  <InputError :message="errors.birthday" />
                </div>
                <div class="w-full space-y-3">
                  <label class="block text-sm font-semibold xs:text-base" for="select">الحالة الإجتماعة</label>
                  <select class="form-control form-select h-[50px] appearance-none" type="select" v-model="marital_status" name="select" id="select" required>
                    <option value="" selected hidden disabled>اختر</option>
                    <option value="single">أعزب</option>
                    <option value="married">متزوج/ة</option>
                    <option value="divorced">منفصل/ة</option>
                    <option value="widowed">ارمل/ة</option>
                  </select>
                  <InputError :message="errors.marital_status" />
                </div>
                <div class="w-full space-y-3">
                  <label class="block text-sm font-semibold xs:text-base" for="text">المهنة</label>
                  <input v-model="profession" class="form-control h-[50px] appearance-none" type="text" name="text" id="text" placeholder="ادخل مهنتك" dir="rtl" required />
                  <InputError :message="errors.profession" />
                </div>
                <PrimaryButton @click="submitUpdate" :loading="loading" class="w-full mt-2">
                  المتابعة
                </PrimaryButton>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { ExclamationTriangleIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from "@headlessui/vue";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/yup";
import * as yup from "yup";
import DatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
const { data } = useAuth();
const datePicker = ref<DatePickerInstance>(null);
let loading = ref(false);

const { defineField, errors, validate } = useForm({
  validationSchema: toTypedSchema(
    yup.object({
      birthday: yup.date().required("هذا الحقل مطلوب"),

      gender: yup.string().default("").required("هذا الحقل مطلوب"),

      marital_status: yup.string().default("").required("هذا الحقل مطلوب"),

      profession: yup.string().required("هذا الحقل مطلوب"),
    })
  ),
});
const [gender] = defineField("gender", {});
const [birthday] = defineField("birthday");
const [marital_status] = defineField("marital_status");
const [profession] = defineField("profession");
const emit = defineEmits(["close"]);
const show = ref(true);

async function submitUpdate() {
  if (!(await validate()).valid) {
    let element = document.getElementById(Object.keys(errors.value)[0].toString());
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
    element?.focus();
    console.log(errors.value);
    return;
  }

  try {
    loading.value = true;
    await useDirectApi(`/accounts/account/${data.value.username}/`, {
      method: "PATCH",
      body: {
        profile: {
          gender: gender.value,
          birthday: birthday.value,
          marital_status: marital_status.value,
          profession: profession.value,
        },
      },
    });
    show.value = false;
    useNotification({ type: "success", content: "تم تحديث الحساب بنجاح" });
  } catch (e) {
    useNotification({ type: "error", content: "حدث خطأ" });
  }
  loading.value = false;
}
</script>

<style lang="css"></style>
