<template>
    <div>

        <transition
            enter-active-class="transition-all"
            leave-active-class="transition-all"
            enter-from-class="translate-x-5 opacity-0"
            leave-to-class="-translate-x-5 opacity-0"
            mode="out-in">
            <div :key="state.data?.authenticationMethod" :class="{'md:flex md:flex-col md:justify-center md:items-center ': state.data?.authenticationMethod == 'otp'}">
                <LazyAuthenticationLoginEmail v-if="state.data?.authenticationMethod == 'login'" isFormSteps isFormPackage/>
                <LazyAuthenticationLoginSMS v-else-if="state.data?.authenticationMethod == 'login-sms'" isFormSteps isFormPackage/>
                <LazyAuthenticationLoginWhatsapp v-else-if="state.data?.authenticationMethod == 'whatsapp'" isFormSteps isFormPackage/>
                <LazyAuthenticationOTP v-else-if="state.data?.authenticationMethod == 'otp'" isFormPackage/>
                <LazyAuthenticationRegister v-else-if="state.data?.authenticationMethod == 'register'" isFormSteps isFormPackage/>
            </div>
        </transition>
    </div>
    
</template>

<script setup lang="ts">
import type { packagesFormSteps } from '~/types';

const { state } = useFormWizard<packagesFormSteps>('packages');
</script>

<style scoped></style>
