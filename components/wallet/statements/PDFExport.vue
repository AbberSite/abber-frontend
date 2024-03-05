<template>
    <div
        class="absolute top-[calc(100%+15px)] z-20 min-w-[280px] w-fit rounded-md bg-white px-4 py-6 shadow-lg ring-1 ring-black ring-opacity-5 ltr:right-0 rtl:left-0">
        <fieldset class="space-y-7">

            <div class="space-y-3 flex flex-col items-center">
                <div v-if="!customRange?.[0] || !customRange?.[1]" class="font-semibold">أختر تاريخ البداية ثم النهاية</div>
                <DatePicker
                    range
                    placeholder="mm/dd/yyyy"
                    :max-date="new Date()"
                    prevent-min-max-navigation
                    v-model="customRange"
                    model-type="yyyy-MM-dd"
                    ref="datePicker"
                    id="date"
                    :auto-apply="true"
                    :inline="{ input: false }"
                    format="yyyy-MM-dd"
                    select-text="اختيار"
                    cancel-text="الغاء" />
            </div>

            <PrimaryButton @click="exportPDF" class="w-full" v-if="customRange?.[0] || customRange?.[1]" :loading="loading">
                 تصدير
            </PrimaryButton>

            <!-- <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ من</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="date"
                    name="date"
                    id="date"
                    dir="rtl"
                    value=""
                    />
            </div>
            <div class="w-full space-y-3">
                <label class="block text-sm font-semibold xs:text-base" for="date">التأريخ إلى</label>
                <input
                    class="form-control h-[50px] appearance-none"
                    type="date"
                    name="date"
                    id="date"
                    dir="rtl"
                    value=""
                    />
            </div> -->
        </fieldset>
    </div>
</template>

<script setup lang="ts">
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits(["close"])

const customRange = ref<Array<string>>([]);
const loading = ref(false)


async function exportPDF(){



    loading.value = true
    const data = await useApi(`/api/wallet/export?date_from=${formatDate(customRange.value?.[0])}&date_to=${formatDate(customRange.value?.[1])}`)

    const blob = new Blob([data])


    const url = URL.createObjectURL(blob);

    download(url , 'test.pdf')
    loading.value = false
    emit("close")

}


function download(dataurl : any, filename  : string) {
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

<style scoped></style>
