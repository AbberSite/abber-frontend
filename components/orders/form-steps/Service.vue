<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
    </Head>

    <div>
        <form method="POST" @submit.prevent="submit">
            <fieldset class="space-y-7">
                <div class="is-scroll max-h-[400px] space-y-7 overflow-y-auto p-1">
                    <template v-if="loading">
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                        <SkeletonsServiceRadioButton />
                    </template>
                    <template v-else>
                        <ServiceRadioButton v-for="service in services" v-model="selectedService" :service="service" />
                    </template>
                </div>

                selected Service {{ selectedService }}

                <PrimaryButton :disabled="!selectedService" class="w-full">
                    <span class="mt-1.5">متابعة</span>
                </PrimaryButton>
            </fieldset>
        </form>
    </div>
</template>

<script setup lang="ts">
import type { OrderForm, Service } from '~/types';

const { state, next } = useFormWizard<OrderForm>('order');

const { status } = useAuth();
const emits = defineEmits(['next']);

const loading = ref(false);

const services = ref<Service[]>([]);

const selectedService = ref(state.value.data?.service_id);
const { fetchAll } = useServicesStore();

onMounted(async () => {
    loading.value = true;
    const response = await fetchAll();

    services.value = response?.results
        ?.sort((a, b) => b.rate - a.rate)
        ?.sort((a, b) => b.ordered_count - a.ordered_count);

    if (state.value.data?.type === 'voice_communication') {
        services.value = services.value.filter(
            (service) => service.active && service.seller.is_online && hasVideoService(service)
        );
    } else {
        services.value = services.value.filter((service) => service.active && hasTextService(service));
    }

    loading.value = false;
});

function submit() {
    if (status.value == 'authenticated') {
        next({
            nextStepId: 'payment',
            data: {
                service_id: selectedService.value
            }
        });
        return;
    }

    next({nextStepId : 'authentication-method' ,data: { service_id: selectedService.value } });
}

function hasVideoService(service: Service): boolean {
    return !!service.service_methods.filter((method) => method.type == 'voice_communication');
}

function hasTextService(service: Service): boolean {
    return !!service.service_methods.filter((method) => method.type == 'text_communication');
}

</script>

<style scoped></style>
