import type { PaginationResponse, Service } from '~/types';

class ServicesStore {
    services: Ref<Service[]> = ref([]);

    voiceCommunicationServices = computed(() =>
        this.orderedServices.value.filter(
            (service) => service.active && service.seller.is_online && this.hasVideoService(service)
        )
    );

    textCommunicationServices = computed(() =>
        this.orderedServices.value.filter((service) => service.active && this.hasTextService(service))
    );

    orderedServices = computed(() =>
        this.services?.value?.sort((a, b) => b.rate - a.rate)?.sort((a, b) => b.ordered_count - a.ordered_count)
    );

    fetchAll: () => Promise<PaginationResponse<Service>> = async () => {
        const { data } = await useFetch('/api/expressors');

        this.services.value = data.value?.results;
        return data.value;
    };

    hasVideoService(service: Service): boolean {
        if(service.service_methods.length == 0) return false
        return !!service.service_methods.filter((method) => method.type == 'voice_communication');
    }

    hasTextService(service: Service): boolean {
        if(service.service_methods.length == 0) return false
        return !!service.service_methods.filter((method) => method.type == 'text_communication');
    }
}

export const useServicesStore = defineStore('services', () => new ServicesStore());
