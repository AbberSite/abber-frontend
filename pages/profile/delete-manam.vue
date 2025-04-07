<template>
    <main class="min-h-screen outline-none">
        <!-- Hero section -->
        <HeroBackground/>
        <!-- Forget password form section -->
        <section
            class="relative flex min-h-screen w-full flex-col items-center justify-center px-4 pb-14 xs:px-6"
            aria-labelledby="delete-profile-heading">
            <div class="rounded-md border border-gray-300 px-3 py-3 shadow-sm">
                <!-- Heroicon name: outline/trash -->
              <img src="https://manams.com/assets/images/logo.svg" class="w-17 lg:w-20" height="100%" width="100%" alt="شعار منام">
            </div>
            <h1 class="pt-6 text-lg font-medium xs:text-xl 2xl:text-2xl" id="delete-profile-heading">حذف حسابي بمنام</h1>
            <div class="pt-4 text-center text-sm text-gray-600 xs:text-base">
                <p>سيتم حذف حسابك ولن تتمكن من الوصول إلى المعلومات المتعلقة به.</p>
                <p>جميع بياناتك سيتم حذفها بشكل نهائي.</p>
            </div>
            <div class="mx-auto w-full max-w-sm pt-10">
                <a
                    class="flex h-[50px] items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-sm font-medium text-white hover:bg-red-500"
                    @click.prevent="dailog = true;"
                    href="/"
                >
                    <Loading v-if="loading" />

                    <span v-else>تأكيد الحذف</span></a
                >
                <div class="pt-4">
                    <NuxtLink
                        class="flex h-[50px] items-center justify-center rounded-md border bg-white px-8 py-3 text-sm font-medium shadow-sm hover:bg-gray-50"
                        :to="{ name: 'profile' }">
                        <span class="ms-3">إلغاء</span>
                    </NuxtLink>
                </div>
            </div>
        </section>
    </main>
    <ConfirmDialog title="هل انت متاكد من انك تريد حذف حسابك ؟" descritpion="هل انت متاكد من قرارك هذا ولايمكن التراجع عنه بعد الموافقة عليه" @continue="deleteAccount(); dailog = false;$emit('logout');" @close="dailog=false;" v-if="dailog"/>
</template>

<script setup lang="ts">

definePageMeta({
    title: 'منام - حذف حسابي',
      auth: false  

})
defineProps<{
    isOpen: boolean;
}>();

const emits = defineEmits(['close']);
const { data } = useAuth();

const loading = ref(false);
let dailog = ref(false);

async function deleteAccount() {
    if (loading.value) return;

    loading.value = true;

    // await useApi(`/api/accounts/delete`, {
    //     method: 'POST',
    //     body: {
    //         username: data.value.username
    //     }
    // });

    loading.value = false;

    emits('close');
    useNotification({ type: 'success', content: 'تم حذف الحساب بنجاح' });
    
    // await useLogout()
    await useRouter().push('/');
}
</script>
