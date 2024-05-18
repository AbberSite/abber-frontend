<template>
    <div class="w-full space-y-3">
        <form @submit.prevent="emitNext()" class="w-full space-y-3">

            <label class="block text-sm font-semibold xs:text-base" for="amount">المبلغ</label>
            <input
            class="form-control h-[50px] appearance-none"
            type="number"
            id="amount"
            v-model.number="state.data.amount"
            placeholder="إدخل المبلغ المراد شحنه"
            dir="rtl"
            required />
            <InputError :message="error" /> 
            <PrimaryButton type="submit" class="w-full my-2">التالي</PrimaryButton>
        </form>
    </div>
</template>

<script setup lang="ts">
const {  emitNext, bus, state , next} = useFormWizard<any>("deposit");


const error = ref("")
bus?.on((event : string) => {
    if(event != "next") return
    
    error.value = ""

    if(!state.value.data.amount || state.value.data.amount <= 0){
        error.value = "هذا الحقل مطلوب"
        return
    }

    next({
        nextStepId : 'payment'
    })

})

</script>

<style scoped>

</style>