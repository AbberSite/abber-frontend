import type { PaginationResponse } from "~/types";

class dashTransactions {
  transactions = ref<[]>([]);
  loading = ref<boolean>(true);
  pagination = ref<PaginationResponse<any>>();
  filters = ref({
    success: null,
    type: null,
    search: "",
    ordering: "order_item_time_data__start_date",
    ignore: undefined,
  });
  filtersCount = computed(() => {
    return 0;
  });

  filtersPipline: Array<any>;

  static filtersWatch: undefined | any;
  constructor() {
    this.filtersPipline = [
      this.success,
      this.getTypeFilterQuery,
      this.search,
      this.ordering
    ];

    if (dashTransactions.filtersWatch) return;
    dashTransactions.filtersWatch = watch(
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
        console.log(params);
        // console.log({"store": params.value.status})
        const data = (await useDirectApi("/wallets/dashboard-transactions/", {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.transactions.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });

  
  search = () => {
    if (this.filters.value.search === "") return {};

    return { search: this.filters.value.search };
  };

  success = () => {
    if (this.filters.value.success === null) return {};

    return { success: this.filters.value.success };
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
    if (this.filters.value.type == null) return {};

    return{
      type: this.filters.value.type
    };
  };
}
export const useDashTransactionsStore = defineStore(
  "dashTransactions",
  () => new dashTransactions()
);
