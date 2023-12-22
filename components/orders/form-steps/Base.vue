<template>

    <form method="POST" @submit.prevent="next">

        <fieldset class="space-y-7">
            <transition
                enter-active-class="transition-all"
                leave-active-class="transition-all"
                enter-from-class="translate-x-4 opacity-0"
                leave-to-class="translate-x-4 opacity-0"
                
                mode="out-in"
                >
                <component v-model:email="email" v-model:password="password" :is="steps[activeStep]" />
            </transition>
            {{ email }}
            <div>
                <PrimaryButton class="w-full">متابعة</PrimaryButton>
                <!-- <button class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-sm font-semibold text-white hover:bg-gray-800" href="/profile"> <span class="mt-1.5">متابعة</span></button> -->
            </div>
        </fieldset>
        
    </form>

</template>

<script setup lang="ts">

    import Login from './Login.vue';
    import Test from './Test.vue';

    const show = ref(false);

    const activeStep = ref(0);

    const steps = [Login, Test];

    const email = ref("")
    const password = ref("")

    function next() {

        activeStep.value++;

    }

</script>

<style scoped>
</style>
