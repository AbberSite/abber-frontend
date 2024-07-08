<template>
  <Head>
    <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
  </Head>

  <div>
    <div>
      <fieldset class="space-y-7">
        <div class="is-scroll max-h-[400px] overflow-y-auto p-1">
          <div class="flex justify-center gap-3">
            <button class="relative flex items-center rounded-md border border-transparent bg-gray-900 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800" type="button" @click="submit(true)"><span class="mt-1.5">نعم</span></button>
            <button class="relative ms-3 inline-flex items-center rounded-md border bg-white px-6 py-2 text-sm font-semibold shadow-sm hover:bg-gray-50" @click="submit(false)"><span class="mt-1.5">لا</span></button>
          </div>
        </div>
      </fieldset>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OrderForm } from "~/types";
const { state, next } = useFormWizard<OrderForm>("order");
const { status } = useAuth();

function submit(transferOrder: Boolean) {
  const data = state.value.data;
  data.transferOrder = transferOrder;

  if (status.value == "authenticated") {
    next({
      nextStepId: "payment",
      data: data,
    });
  } else {
    next({
      nextStepId: "authentication-method",
      data: data,
    });
  }
      return;

}
</script>

<style scoped></style>
