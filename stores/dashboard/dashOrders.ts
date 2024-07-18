
import { BaseStore } from "./baseStore";

class dashOrders extends BaseStore {
  constructor(){
    super(
      {type: {voice: false, text: false}, status: ['in_progress'], ordering: 'order_item_time_data__start_date'},
      [()=> this.getTypeFilterQuery(),
      ()=> this.getStatusFilterQuery(),
      ()=> this.getDateFilter(),
      ()=> this.search(),
      ()=> this.ordering()],
      "/orders/dashboard-orders/"
    )
  }
  order = ref({});
  filtersCount = computed(() => {
    return (
      this.filters.value.status.length +
      Number(this.filters.value.type.voice) +
      +Number(this.filters.value.type.text)
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

  getOrder = async (id: string) => {
    this.loading.value = true;
    this.order.value = await useDirectApi(`/orders/dashboard-orders/${id}/`);
    this.loading.value = false;
    return this.order.value;
  };
}
export const useDashOrdersStore = defineStore(
  "dashOrders",
  () => new dashOrders()
);
