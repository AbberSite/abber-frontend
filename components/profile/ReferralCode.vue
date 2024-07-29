<template>
  <div class="mx-auto w-full max-w-sm pt-10 space-y-5">
    <div disabled class="form-control h-[50px] appearance-none w-25 font-bold text-lg text-center tracking-[.8em] text-gray-700 select-none" v-text="referralCode" @click="copyReferralCode"></div>
    <PrimaryButton class="w-full" @click="copyReferralLink()">
      نسخ رابط الدعوة
    </PrimaryButton>
    <DashboardTablesTable>
      <DashboardTablesThead :headItems="headItems"></DashboardTablesThead>
      <tbody class="divide-y">
        <tr v-for="(referral, rowIndex) in referrals" :key="rowIndex">
          <DashboardTablesRow :content="referral?.user" name="user" />
          <DashboardTablesRow :content="referral?.order_count > 0" name="ordered" />
        </tr>
      </tbody>
    </DashboardTablesTable>
  </div>
</template>

<script lang="ts" setup>
import useDirectApi from "~/composables/useDirectApi";
import useNotification from "~/composables/useNotification";
const digits = ref<number[]>([]);
const referralCode = ref(null);
const referrals = ref([]);
const headItems = {
  user: "المستخدم",
  ordered: "تم الطلب",
};

onMounted(() => {
  if (!referralCode.value) {
    useDirectApi("/referrals/referral-code/").then((res) => {
      referralCode.value = res.code;
    });
  }
  useDirectApi("/referrals/referrals/").then((res) => {
    referrals.value = res;
  });
});

const copyReferralCode = computed(() => {
  navigator.clipboard.writeText(referralCode.value);
  useNotification({ type: "success", content: "تم نسخ الكود بنجاح" });
});

const copyReferralLink = () => {
  navigator.clipboard.writeText("https://app.abber.co/referrals/referral-signup/?referral=" + referralCode.value);
  useNotification({ type: "success", content: "تم نسخ رابط الدعوة بنجاح" });
};
</script>

<style></style>
