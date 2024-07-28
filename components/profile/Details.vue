<template>
    <div class="grid w-full gap-x-8 gap-y-14 pt-10 sm:grid-cols-2 lg:grid-cols-3" x-show="activeTab === 1" x-cloak>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">الإسم الكامل</div>
            <div class="font-medium">
                {{ data.first_name }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">البريد الألكتروني</div>
            <div class="font-medium">
                {{ data.email }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">رقم الهاتف</div>
            <div class="text-sm font-medium xs:text-base text-right" dir="ltr"> 
                {{ data.phone ? data.phone.startsWith('++') ? data.phone.substring(1) : data.phone : '-' }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">رقم IBAN</div>
            <div class="font-medium">
                {{ IBAN ?? '-' }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">الجنس</div>
            <div class="font-medium">
                {{ genders[data?.profile?.gender] ?? '-' }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">تاريخ الميلاد</div>
            <div class="font-medium">
                {{ data?.profile?.birthday ?? '-' }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">الحالة الإجتماعة</div>
            <div class="font-medium">
                {{ martialStatus[data?.profile?.marital_status] ?? '-' }}
            </div>
        </div>
        <div class="w-full space-y-4">
            <div class="text-sm font-medium text-gray-500 xs:text-base">المهنة</div>
            <div class="font-medium">
                {{ data?.profile?.profession ?? '-' }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { data} = useAuth();



onMounted(async () => {
    // await getSession()
})


const IBAN = computed(() => {
    const chunks =  data.value?.profile?.bank_account?.match?.(/.{1,4}/g);
    let iban = ""

    if(!chunks) return null

    chunks.map((chunk : string, index : number) =>  iban += ' ' + chunk)

    return iban

})

const genders : any = {
    Male : 'ذكر', 
    Female : 'أنثى'
}

const martialStatus : any = {
    married : 'متزوج',
    single : 'اعزب',
    divorced : 'مطلق',
}

</script>

<style scoped></style>
