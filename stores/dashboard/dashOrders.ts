import type { PaginationResponse } from "~/types";

class dashOrders {
  orders = ref<[]>([]);
  order = ref({})
  loading = ref<boolean>(true);
  pagination = ref<PaginationResponse<any>>();
  filters = ref({
    type: {
      voice: false,
      text: false,
    },
    status: ['in_progress'],
    search: "",
    ordering: "order_item_time_data__start_date",
    ignore: undefined,
  });
  filtersCount = computed(() => {
    return (
      this.filters.value.status.length +
      Number(this.filters.value.type.voice) +
      +Number(this.filters.value.type.text)
    );
  });

  filtersPipline: Array<any>;

  static filtersWatch: undefined | any;
  constructor() {
    this.filtersPipline = [
      this.getTypeFilterQuery,
      this.getStatusFilterQuery,
      this.search,
      this.ordering
    ];

    if (dashOrders.filtersWatch) return;
    dashOrders.filtersWatch = watch(
      this.filters,
      async (value) => {
        if (value.ignore === true) {
          this.filters.value.ignore = undefined;
          return;
        }

        // if(value.ignore) return

        if (!this) return;

        // this.loading.value = true;

        await this.fetchAll();

        // this.loading.value = false;

        if (process.client) {
          localStorage.setItem(
            "abber:filters",
            JSON.stringify(this.filters.value)
          );
        }
      },
      {
        deep: true,
      }
    );
  }
  fetchAll = async (
    params?: any,
    update?: any
  ): Promise<PaginationResponse<any>> =>
    new Promise(async (resolve, reject) => {
      try {
        // console.log({"store": params.value.status})
        const data = (await useDirectApi("/orders/dashboard-orders/", {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.orders.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
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

  search = () => {
    if (this.filters.value.search === "") return {};

    return { search: this.filters.value.search };
  };

  ordering = () => {
    return { ordering: this.filters.value.ordering };
  };

  pipeFilters = () => {
    return this.filtersPipline.reduce((prev: any, curr: any) => {
      return Object.assign(prev, curr());
    }, {});
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
