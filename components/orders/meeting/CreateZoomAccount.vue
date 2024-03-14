<template>

    <div
        class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
        role="alert">
        <div class="mt-1.5 flex">
            <span class="me-3 flex-shrink-0">
                <!-- Heroicon name: outline/information-circle -->
                <InformationCircleIcon class="text-blue-500 w-6 h-6" />
            </span>

            <template v-if="!zoomAccount">
                 يرجى انشاء حساب زوم للبدأ في تلقي الطلبات الصوتية
            </template>
            <template v-else>

            

                <div v-if="!zoomAccount?.active">
                    تم إنشاء حساب Zoom الخاص بك يرجي تفعيله قبل البَدْء في استقبال الطلبات تقد البريد الإلكتروني الخاص بك
                    لتفعيله
                </div>

            </template>
        </div>
    </div>


    <PrimaryButton v-if="!zoomAccount" class="w-full" :loading="loading" @click="submit" >
        {{ sent ? 'تم ارسال رسالة التفعيل' : 'أنشئ حساب' }}
    </PrimaryButton>

</template>

<script setup lang="ts">

import { InformationCircleIcon } from '@heroicons/vue/24/outline';

const { zoomAccount } = storeToRefs(useAccountStore());

const { createZoomAccount } = useAccountStore()

const sent = ref(false)
const loading = ref(false)

async function submit(){

    loading.value = true 

    sent.value = await createZoomAccount();

    loading.value = false 
}

</script>

<style scoped></style>
