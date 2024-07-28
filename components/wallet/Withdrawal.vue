<template>
  <Modal @close="$emit('close')" title="سحب الرصيد">
    <form
      @submit="submit"
      class="is-scroll overflow-y-auto flex justify-between h-full flex-col gap-7 px-4 py-8 pb-36"
    >
      <fieldset class="space-y-7">
        <div
          class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
          x-show="alert"
          role="alert"
        >
          <div class="mt-1.5 flex">
            <span class="me-3 flex-shrink-0">
              <!-- Heroicon name: outline/information-circle -->
              <svg
                class="text-blue-500"
                height="24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                ></path>
              </svg>
            </span>
            <div class="w-0 flex-1 text-sm font-medium leading-loose">
              رصيدك القابل للسحب هو: {{ balance.withdrawal_balance }} ر.س
            </div>
          </div>
        </div>
        <label class="block w-full space-y-3">
          <label class="block text-sm font-medium" for="amount">المبلغ</label>
          <input
            dir="rtl"
            class="form-control h-[50px] appearance-none"
            type="number"
            pattern="\d*"
            id="amount"
            placeholder="إدخل المبلغ المراد سحبه"
            v-model.number="amount"
          />
          <InputError :message="errors.amount" class="mt-2" />
        </label>
        <ul class="space-y-4 rounded-md bg-gray-50 px-4 py-4">
          <li class="flex items-center justify-between text-sm">
            <span class="font-medium text-gray-500">المبلغ</span
            ><span class="font-medium">{{ amount || 0 }} ر.س</span>
          </li>
          <li class="flex items-center justify-between text-sm">
            <span class="font-medium text-gray-500">رسوم السحب</span
            ><span class="font-medium">{{ fee }} ر.س</span>
          </li>
          <li class="flex items-center justify-between text-sm">
            <span class="font-medium text-gray-500">المبلغ بعد الخصم</span
            ><span class="font-medium"
              >{{ Math.max(0, amount - fee) }} ر.س</span
            >
          </li>
        </ul>
      </fieldset>

      <PrimaryButton
        @click.prevent="submit()"
        class="flex h-[50px] w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 text-sm font-medium text-white hover:bg-gray-800"
        :loading="loading"
      >
        <span>متابعة</span>
      </PrimaryButton>
    </form>
  </Modal>
</template>

<script setup lang="ts">
const { balance } = storeToRefs(useWalletStore());

const selectedOption = ref<"part" | "all">("part");
const amount = ref<number | null>(null);
let loading = ref(false);
const emit = defineEmits(["close"]);
const errors = ref<{ amount?: string }>({});

const fee = ref(0);
const { settings } = storeToRefs(useSettingsStore());
const { getSettings } = useSettingsStore();
getSettings().then(() => {
  fee.value = settings.value.financial_settings.balance_withdrawal_tax;
});

async function submit() {
  errors.value = {};

  if (!amount.value || amount.value <= 0) {
    errors.value.amount = "هذا الحقل مطلوب";
    return;
  } else if (amount.value <= fee.value) {
    errors.value.amount = "يجب ان يكون المبلغ اكبر من رسوم السحب";
    return;
  }

  loading.value = true;
  try {
    const response = await useDirectApi("/wallets/balance-withdrawal/", {
      method: "POST",
      body: {
        part_or_all: selectedOption.value,
        amount: amount.value,
      },
    });
    loading.value = false;
    emit("close");
    useNotification({ type: "success", content: response.message });
  } catch (e) {
    loading.value = false;
    emit("close");
    useNotification({
      type: "danger",
      content: "هناك مشكلة، يجب عليك تعبئة بياناتك البنكية",
    });
  }
}
</script>

<style></style>
