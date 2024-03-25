<template>
  <PrimaryButton @click="exportPDF" class="w-full" v-if="customRange?.[0] || customRange?.[1]" :loading="loading">
    تصدير
  </PrimaryButton>
</template>

<script lang="ts" setup>
const props = defineProps<{ customRange: Array<string> }>();
const emit = defineEmits(["close"])

const loading = ref(false);

const config = useRuntimeConfig().public;

const { rawToken } = useAuthState();

async function exportPDF() {

  loading.value = true
  const { data } = await useFetch(`${config.websiteBasePath}/wallets/statements/export/?action=download&date_from=${formatDate(props.customRange?.[0])}&date_to=${formatDate(props.customRange?.[1])}`, {
    headers: {
      authorization: `JWT ${rawToken.value}`
    }
  })

  const blob = new Blob([data.value], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  download(url, `${formatDate(props.customRange?.[1])}.pdf`)

  loading.value = false
  emit("close")

}

function download(dataurl: any, filename: string) {
  var a = document.createElement("a");
  a.href = dataurl;
  a.setAttribute("download", filename);
  a.click();
  return false;
}

function formatDate(date?: string) {
  const today = new Date(date as string);
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}

</script>

<style></style>