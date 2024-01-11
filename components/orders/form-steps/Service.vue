<template>
    <Head>
        <title>عبر - طلب تعبير حلم - إختيار المعبر</title>
    </Head>

    <div>
        <form method="POST" @submit.prevent="next">
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

import type { Service } from '~/types';

const props = defineProps<{
    type: string;
    selectedService : number,

}>();

const { status } = useAuth();
const emits = defineEmits(['next']);

const loading = ref(false)

const services = ref<Service[]>([]);

const selectedService = ref(props.selectedService);
const { fetchAll } = useServicesStore();

onMounted(async () => {

    loading.value = true
    const response = await fetchAll();

    services.value = response?.results
        ?.sort((a, b) => b.rate - a.rate)
        ?.sort((a, b) => b.ordered_count - a.ordered_count);

    if (props.type == 'voice_communication') {
        services.value = services.value.filter((service) => service.seller.is_online);
    }

    loading.value = false
});

function next() {
    if (status.value == 'authenticated') {
        emits('next', {
            nextStep: 5,
            service_id : selectedService.value
        });
        return;
    }

    emits('next');
}
</script>

<style scoped></style>
