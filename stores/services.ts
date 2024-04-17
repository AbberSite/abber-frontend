import type { PaginationResponse, Service } from '~/types';

class ServicesStore {
  services: Ref<Service[]> = ref([]);
  videoServices: Ref<Service[]> = ref([]);

  servicesPagination: Ref<PaginationResponse<any> | undefined> = ref()
  videoServicesPagination: Ref<PaginationResponse<any> | undefined> = ref()

  // voiceCommunicationServices = computed(() =>
  //     this.orderedServices.value.filter(
  //         (service) => service.active && service.seller.is_online && this.hasVideoService(service)
  //     )
  // );

  textCommunicationServices = computed(() =>
    this.orderedServices.value
  );

    orderedServices = computed(() =>
        this.services?.value?.sort((a, b) => b.rate - a.rate)?.sort((a, b) => b.ordered_count - a.ordered_count)
    );

  fetchAll: () => Promise<PaginationResponse<Service>> = async () => {
    const data = await useProxy('/services/services/', {
      params: {
        active_text_communication: true,
        active: true,
        admin_active: true,
      }
    });
    this.servicesPagination.value = data;
    this.services.value = data.results;
    return data.value;
  };

  fetchVideoServices: () => Promise<PaginationResponse<Service>> = async () => {
    const data = await useProxy('/services/services/', {
      params: {
        active_video_communication: true,
        active: true,
        admin_active: true,
      }
    });

    this.videoServicesPagination.value = data;
    this.videoServices.value = data?.results;
    return data;
  };

  hasVideoService(service: Service): boolean {
    if (service.service_methods.length == 0) return false
    return !!service.service_methods.filter((method) => method.type == 'voice_communication');
  }

  hasTextService(service: Service): boolean {
    if (service.service_methods.length == 0) return false
    return !!service.service_methods.filter((method) => method.type == 'text_communication');
  }
}

export const useServicesStore = defineStore('services', () => new ServicesStore());
