import useDirectApi from '~/composables/useDirectApi';
import { useApiWithCache } from '~/composables/useApiCache';
import type { PaginationResponse, Service } from '~/types';

class ServicesStore {
  services: Ref<Service[]> = ref([]);
  videoServices: Ref<Service[]> = ref([]);

  servicesPagination: Ref<PaginationResponse<any> | undefined> = ref()
  videoServicesPagination: Ref<PaginationResponse<any> | undefined> = ref()


  textCommunicationServices = computed(() =>
    this.orderedServices.value
  );

    orderedServices = computed(() =>
        this.services?.value
    );

  fetchAll: () => Promise<PaginationResponse<Service>> = async () => {
    const data = await useApiWithCache<PaginationResponse<Service>>('/services/services/', {
      ttl: 600000, // 10 minutes cache
      tags: ['services', 'text-services'],
      key: 'services:text-communication',
      params: {
        active_text_communication: true,
        active: true,
        admin_active: true,
      }
    });
    this.servicesPagination.value = data;
    this.services.value = data.results;
    return data;
  };

  fetchVideoServices: () => Promise<PaginationResponse<Service>> = async () => {
    const data = await useApiWithCache<PaginationResponse<Service>>('/services/services/', {
      ttl: 600000, // 10 minutes cache
      tags: ['services', 'video-services'],
      key: 'services:video-communication',
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
