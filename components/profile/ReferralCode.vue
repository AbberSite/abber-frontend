<template>
  <div class="mx-auto w-full max-w-sm pt-10 space-y-5">
    <!-- <svg viewBox="0 0 288 288" fill="none" aria-hidden="true" class="inset-0 h-full w-full overflow-visible" width="100" height="40"> <path fill-rule="evenodd" clip-rule="evenodd" d="M232.213 29.661a6.75 6.75 0 0 1 8.659 4.019 293.104 293.104 0 0 1 4.671 13.82 293.554 293.554 0 0 1 12.249 63.562c6.142 6.107 9.958 14.579 9.958 23.938 0 9.359-3.816 17.831-9.958 23.938a293.551 293.551 0 0 1-12.249 63.562 293.143 293.143 0 0 1-4.671 13.82 6.75 6.75 0 0 1-12.678-4.64c.937-2.56 1.838-5.137 2.702-7.731a279.258 279.258 0 0 0-88.553-26.124 207.662 207.662 0 0 0 8.709 22.888c4.285 9.53 1.151 21.268-8.338 26.747l-7.875 4.547c-9.831 5.675-22.847 2.225-27.825-8.542a256.906 256.906 0 0 1-16.74-48.337C60.857 190.897 38.25 165.588 38.25 135c0-33.551 27.199-60.75 60.75-60.75h9c8.258 0 16.431-.356 24.505-1.052 35.031-3.023 68.22-12.466 98.391-27.147a278.666 278.666 0 0 0-2.702-7.73 6.75 6.75 0 0 1 4.019-8.66Zm2.681 29.45a292.862 292.862 0 0 1-96.423 27.083c-3.74 15.652-5.721 31.994-5.721 48.806 0 16.812 1.981 33.154 5.721 48.806a292.884 292.884 0 0 1 96.423 27.083 280.39 280.39 0 0 0 9.636-55.608c.477-6.697.72-13.46.72-20.281 0-6.821-.243-13.584-.72-20.281a280.396 280.396 0 0 0-9.636-55.608ZM124.37 182.697A223.556 223.556 0 0 1 119.25 135c0-16.365 1.766-32.325 5.12-47.697a299.37 299.37 0 0 1-16.37.447h-9c-26.096 0-47.25 21.155-47.25 47.25S72.904 182.25 99 182.25h9c5.492 0 10.95.15 16.37.447Zm-20.039 13.053a243.387 243.387 0 0 0 14.937 42.049c1.434 3.103 5.418 4.481 8.821 2.516l7.875-4.547c3.054-1.763 4.429-5.84 2.775-9.519a221.156 221.156 0 0 1-10.907-29.811A285.523 285.523 0 0 0 108 195.75h-3.669Z" fill="#A78BFA" fill-opacity=".1" stroke="#8B5CF6" stroke-width="2" ></path> <g mask="url(#cc)"> <path opacity=".1" d="M-69 287.5h445" stroke="url(#e)" stroke-width="1.5"></path> <path opacity=".1" d="M-69 0h445" stroke="url(#f)" stroke-width="1.5"></path> <path opacity=".1" d="M.25 355V-90" stroke="url(#g)" stroke-width="1.5"></path> <path opacity=".1" d="M287.75 355V-90" stroke="url(#h)" stroke-width="1.5"></path> </g> <defs> <linearGradient id="e" x1="375.75" y1="296.754" x2="-69.25" y2="296.754" gradientUnits="userSpaceOnUse"> <stop stop-color="#0F172A" stop-opacity="0"></stop> <stop offset=".258" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset=".521" stop-color="#0F172A"></stop> <stop offset=".784" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset="1" stop-color="#0F172A" stop-opacity="0"></stop> </linearGradient> <linearGradient id="f" x1="375.75" y1="9.254" x2="-69.25" y2="9.254" gradientUnits="userSpaceOnUse"> <stop stop-color="#0F172A" stop-opacity="0"></stop> <stop offset=".258" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset=".521" stop-color="#0F172A"></stop> <stop offset=".784" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset="1" stop-color="#0F172A" stop-opacity="0"></stop> </linearGradient> <linearGradient id="g" x1="9.504" y1="-89.75" x2="9.504" y2="355.25" gradientUnits="userSpaceOnUse"> <stop stop-color="#0F172A" stop-opacity="0"></stop> <stop offset=".258" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset=".521" stop-color="#0F172A"></stop> <stop offset=".784" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset="1" stop-color="#0F172A" stop-opacity="0"></stop> </linearGradient> <linearGradient id="h" x1="297.004" y1="-89.75" x2="297.004" y2="355.25" gradientUnits="userSpaceOnUse"> <stop stop-color="#0F172A" stop-opacity="0"></stop> <stop offset=".258" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset=".521" stop-color="#0F172A"></stop> <stop offset=".784" stop-color="#0F172A" stop-opacity=".6"></stop> <stop offset="1" stop-color="#0F172A" stop-opacity="0"></stop> </linearGradient> <mask id="cc" style="mask-type: alpha;" maskUnits="userSpaceOnUse" x="-333" y="-242" width="956" height="927"><path fill="url(#b)" d="M-333-242h956v927h-956z"></path></mask> </defs> </svg> -->
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
