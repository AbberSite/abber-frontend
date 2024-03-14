<template>
    <div class="is-scroll overflow-y-auto px-6 py-8 pb-36 space-y-7">
        <div
            class="w-full overflow-hidden rounded-lg bg-white p-4 shadow-sm ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out sm:max-w-sm"
            role="alert">
            <div class="mt-1.5 flex">
                <span class="me-3 flex-shrink-0">
                    <!-- Heroicon name: outline/information-circle -->
                    <InformationCircleIcon class="text-blue-500 w-6 h-6" />
                </span>
                <div class="w-0 flex-1 text-sm font-medium leading-loose">
                    يرجى تفعيل البريد الإلكتروني الخاص بك لانشاء حساب زوم و تلقي الطلبات
                    الصوتية
                </div>
            </div>
        </div>

        <PrimaryButton :loading="loading" :disabled="sent" @click="verifyEmail" class="w-full">
            {{ sent ? 'تم ارسال رسالة التفعيل' : 'ارسال رسالة التفعيل' }}
        </PrimaryButton>
    </div>
</template>

<script setup lang="ts">

const { sendEmailVerification } = useAccountStore();
const sent = ref(false);
const loading = ref(false);
const { data } = useAuth();

async function verifyEmail() {
    loading.value = true;

    try {
        sent.value = (await sendEmailVerification(data.value.email)) as boolean;

        useNotification({ content: 'تم ارسال رسالة التفعيل', type: 'success' });
    } catch (error) {
        useNotification({ content: 'حدث خطأ عند ارسال رسالة التفعيل', type: 'danger' });
    } finally {
        loading.value = false;
    }
}



</script>

<style scoped>

</style>