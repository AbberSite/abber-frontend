<template>
    <div>

        <transition
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-x-5 opacity-0"
            leave-to-class="-translate-x-5 opacity-0"
            mode="out-in">
            <div :key="state.data?.authenticationMethod">
                <LazyAuthenticationLoginEmail v-if="state.data?.authenticationMethod == 'login'" isFormSteps/>
                <LazyAuthenticationLoginSMS v-else-if="state.data?.authenticationMethod == 'login-sms'" isFormSteps />
                <LazyAuthenticationLoginWhatsapp v-else-if="state.data?.authenticationMethod == 'whatsapp'" isFormSteps/>
                <LazyAuthenticationOTP v-else-if="state.data?.authenticationMethod == 'otp'" />
                <LazyAuthenticationRegister v-else-if="state.data?.authenticationMethod == 'register'" isFormSteps/>
            </div>
        </transition>
    </div>
    
</template>

<script setup lang="ts">

const { state } = useFormWizard<OrderForm>('order');
</script>

<style scoped></style>
