<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
    </Head>

    <div>
        <div>

            <fieldset class="space-y-7">
                <div class="is-scroll max-h-[400px] space-y-7 overflow-y-auto p-1">
                    <template v-if="loading">
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                    </template>
                    <template v-else>
                        <template v-if="state.data?.type == 'text_communication'">
                            <ServiceRadioButton
                                v-for="service in textCommunicationServices"
                                v-model="selectedService"
                                @click.once="submit(service.id)"
                                :service="service" />
                        </template>

                        <template v-else>
                            <ServiceRadioButton
                                v-for="service in voiceCommunicationServices"
                                v-model="selectedService"
                                @click.once="submit(service.id)"
                                :service="service" />
                        </template>

                    </template>
                </div>
            </fieldset>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderForm, Service } from '~/types';

const { state, next } = useFormWizard<OrderForm>('order');

const { status } = useAuth();
const emits = defineEmits(['next']);

const loading = ref(false);

const selectedService = ref(state.value.data?.service_id);
const { fetchAll } = useServicesStore();

const { services, voiceCommunicationServices, textCommunicationServices } = storeToRefs(useServicesStore());

onMounted(async () => {

    if (services.value) return;

    // something went wrong fetching the services in the previous step fetch again
    loading.value = true;
    await fetchAll();
    loading.value = false;

});

function submit(service_id: number) {
    selectedService.value = service_id;


    if(status.value == 'loading') return 
    if (status.value == 'authenticated') {
        next({
            nextStepId: 'payment',
            data: {
                service_id: selectedService.value
            }
        });
        return;
    }

    next({ nextStepId: 'authentication-method', data: { service_id: selectedService.value } });
}

function hasVideoService(service: Service): boolean {
    return !!service.service_methods.filter((method) => method.type == 'voice_communication');
}

function hasTextService(service: Service): boolean {
    return !!service.service_methods.filter((method) => method.type == 'text_communication');
}
</script>

<style scoped></style>
