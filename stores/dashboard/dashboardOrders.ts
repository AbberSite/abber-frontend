import { BaseStore } from "./baseStore";

class dashboardOrders extends BaseStore {
  constructor(){
    super(
      {
        type: {voice: false, text: false},
        status: ['in_progress'],
        ordering: 'order_item_time_data__start_date',
        app_source: '',
        payment_method: '', 
      },
      [
        ()=> this.getTypeFilterQuery(),
        ()=> this.getStatusFilterQuery(),
        ()=> this.getDateFilter(),
        ()=> this.search(),
        () => this.ordering(),
        () => this.quality(),
        () => this.getAppSourceFilterQuery(),
        () => this.getPaymentMethodFilterQuery(), 
      ],
      "/orders/dashboard-orders/"
    )
  }
  order = ref({});
  filtersCount = computed(() => {
    return (
      this.filters.value.status.length +
      Number(this.filters.value.type.voice) +
      +Number(this.filters.value.type.text) +
      (this.filters.value.app_source !== '' ? 1 : 0)
    );
  });

  
  getStatusFilterQuery = () => {
    if (!this || this.filters.value.status.length === 0) return {};

    if (this.filters.value.status.length === 1) {
      return {
        status: this.filters.value.status[0],
      };
    }

    let status = "";

    this.filters.value.status.map((_status: string, index: number) => {
      if (index == 0) {
        status += _status;
        return;
      }

      status += "," + _status;
    });

    return {
      status__in: status,
    };
  };


  quality = () => {
    if (!this) return {};
    
    return {
      well_provided: this.filters.value.quality,
    };
  };

  
  getTypeFilterQuery = () => {
    if (!this) return {};

    if (
      (this.filters.value.type.text && this.filters.value.type.voice) ||
      (!this.filters.value.type.text && !this.filters.value.type.voice)
    ) {
      return {};
    }

    if (this.filters.value.type.text) {
      return {
        type: "text_communication",
      };
    }

    return {
      type: "video_communication",
    };
  };

  getAppSourceFilterQuery = () => {
    if (!this || this.filters.value.app_source === '') return {};
    return {
      app_source: this.filters.value.app_source,
    };
  };

  getPaymentMethodFilterQuery = () => {
    if (!this || !this.filters.value.payment_method) return {};
    return {
      payment_method: this.filters.value.payment_method,
    };
  };

  getOrder = async (id: string) => {
    this.loading.value = true;
    this.order.value = await useDirectApi(`/orders/dashboard-orders/${id}/`);
    this.loading.value = false;
    return this.order.value;
  };
}
export const useDashboardOrdersStore = defineStore(
  "DashboardOrders",
  () => new dashboardOrders()
);
