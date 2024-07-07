import type { PaginationResponse } from "~/types";

class dashWithdrawalRequests {
  list = ref<[]>([]);
  order = ref({});
  loading = ref<boolean>(true);
  pagination = ref<PaginationResponse<any>>();
  filters = ref({
    date__gte: "",
    date__lte: "",
    status: "1",
    search: "",
    ordering: "-date",
    ignore: undefined,
  });
  filtersCount = computed(() => {
    return this.filters.value.status.length;
  });

  filtersPipline: Array<any>;

  static filtersWatch: undefined | any;
  constructor() {
    this.filtersPipline = [
      this.getStatusFilterQuery,
      this.getDateFilter,
      this.search,
      this.ordering,
    ];

    if (dashWithdrawalRequests.filtersWatch) return;
    dashWithdrawalRequests.filtersWatch = watch(
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
        const data = (await useDirectApi(
          "/wallets/dashboard-withdrawal-requests/",
          {
            params: {
              limit: 20,
              ...this.pipeFilters(),
              ...params,
            },
            headers: {
              "X-Requested-With": process.client ? "XMLHttpRequest" : "",
            },
          }
        )) as PaginationResponse<any>;
        this.list.value = data.results ?? [];
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

  getDateFilter = () => {
    if (!this.filters.value.date__gte || !this.filters.value.date__lte)
      return {};
    return {
      date__gte: this.filters.value.date__gte,
      date__lte: this.filters.value.date__lte,
    };
  };
}
export const useDashWithdrawalRequestsStore = defineStore(
  "dashWithdrawalRequests",
  () => new dashWithdrawalRequests()
);
