import type { PaginationResponse } from "~/types";

class dashOperations {
  list = ref<[]>([]);
  order = ref({});
  loading = ref<boolean>(true);
  pagination = ref<PaginationResponse<any>>();
  users = ref([]);
  filters = ref({
    date__gte: "",
    date__lte: "",
    type: "",
    search: "",
    ordering: "-date",
    ignore: undefined,
  });
  filtersCount = computed(() => {
    return 0;
  });

  filtersPipline: Array<any>;

  static filtersWatch: undefined | any;
  constructor() {
    this.filtersPipline = [
      this.getTypeFilterQuery,
      this.getDateFilter,
      this.search,
      this.ordering,
    ];

    if (dashOperations.filtersWatch) return;
    dashOperations.filtersWatch = watch(
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
          "/wallets/dashboard-wallet-operations/",
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

  getTypeFilterQuery = () => {
    return {
      type: this.filters.value.type,
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
  submitNewOperation = async (body: Object) => {
    try {
      const data = await useDirectApi("/wallets/dashboard-wallet-operations/", {
        method: "post",
        body: body,
        headers: {
          "X-Requested-With": process.client ? "XMLHttpRequest" : "",
        },
      });
      useNotification({ type: "success", content: "لقد تمت العملية بنجاح" });
      return data;
    } catch (e) {
      useNotification({
        type: "danger",
        content: "حدث خطأ ما، الرجاء اعادة المحاولة لاحقا",
      });
      console.error(e);
    };
  };
  getUsers = async ()=> {
    try {
      const data = await useDirectApi("/accounts/dashboard-users/", {params: {limit: 1000}});
      this.users.value = data.results;
    } catch (e) {
      
      console.error(e);
    };
  }
}
export const useDashOperationsStore = defineStore(
  "dashOperations",
  () => new dashOperations()
);
