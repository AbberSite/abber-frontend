<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10" dir="ltr">
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-black/25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900 text-right">
                                حذف الحساب
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500 text-right">هل أنت متأكد من حذف حسابك ؟</p>
                            </div>

                            <div class="mt-4 flex justify-end">
                                <button
                                    type="button"
                                    class="inline-flex justify-center text-right rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                                    @click="deleteAccount">
                                    <Loading v-if="loading" />
                                    <span v-else> نعم احذف حسابي </span>
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

<script setup lang="ts">
import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue';

defineProps<{
    isOpen: boolean;
}>();

const emits = defineEmits(['close']);
const { data } = useAuth();

const loading = ref(false);

const router = useRouter();
function closeModal() {
    emits('close');
}

async function deleteAccount() {
    if (loading.value) return;

    loading.value = true;

    await useApi(`/api/accounts/delete`, {
        method: 'POST',
        body: {
            username: data.value.username
        }
    });

    loading.value = false;

    emits('close');

    router.push('/accounts/login');
    useNotification({ type: 'success', content: 'تم حذف الحساب بنجاح' });
}
</script>
