<template>
    <div>

        <transition
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-x-5 opacity-0"
            leave-to-class="-translate-x-5 opacity-0"
            mode="out-in">
            <div :key="state.data?.authenticationMethod" :class="{'md:flex md:flex-col md:justify-center md:items-center ': state.data?.authenticationMethod == 'otp'}">
                <AuthenticationLoginEmail v-if="state.data?.authenticationMethod == 'login'" isFormSteps isFormPackage/>
                <AuthenticationLoginSMS v-else-if="state.data?.authenticationMethod == 'login-sms'" isFormSteps isFormPackage/>
                <AuthenticationLoginWhatsapp v-else-if="state.data?.authenticationMethod == 'whatsapp'" isFormSteps isFormPackage/>
                <AuthenticationOTP v-else-if="state.data?.authenticationMethod == 'otp'" isFormPackage/>
                <AuthenticationRegister v-else-if="state.data?.authenticationMethod == 'register'" isFormSteps isFormPackage/>
            </div>
        </transition>
    </div>
    
</template>

<script setup lang="ts">
import type { packagesFormSteps } from '~/types';

const { state } = useFormWizard<packagesFormSteps>('packages');
</script>

<style scoped></style>
