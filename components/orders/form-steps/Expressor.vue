<template>
    <div>
        Choose Expressor step

        <PrimaryButton @click="next" class="w-full">
            <span class="mt-1.5">متابعة</span>
        </PrimaryButton>
    </div>
</template>

<script setup lang="ts">


const { status } = useAuth()
const emits = defineEmits(['next'])

function next(){

    if(status.value == "authenticated"){

        emits("next", {
            nextStep: 5 ,
            returnStep: 3,
        })
        return
    }

    emits('next', {
        clearReturn : true,
    })
}
</script>

<style scoped>

</style>