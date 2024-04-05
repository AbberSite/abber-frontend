<template>
    <div>

        <transition
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-x-5 opacity-0"
            leave-to-class="-translate-x-5 opacity-0"
            mode="out-in">
            <div :key="state.data?.authenticationMethod">
                <FormStepsLogin v-if="state.data?.authenticationMethod == 'login'" />
                <FormStepsSms v-else-if="state.data?.authenticationMethod == 'login-sms'" />
                <FormStepsGuest v-else-if="state.data?.authenticationMethod == 'guest'" />
                <FormStepsOtp v-else-if="state.data?.authenticationMethod == 'otp'" />
                <FormStepsRegister v-else-if="state.data?.authenticationMethod == 'register'" />
            </div>
        </transition>
    </div>
    
</template>

<script setup lang="ts">
const { state } = useFormWizard<OrderForm>('order');
</script>

<style scoped></style>
