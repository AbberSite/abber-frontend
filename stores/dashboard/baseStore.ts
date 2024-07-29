import type { PaginationResponse } from '~/types';

export class BaseStore {
  endpoint = ref<string>('');
  list = ref<[]>([]);
  loading = ref<boolean>(true);
  pagination = ref<PaginationResponse<any>>();
  filters: any;
  filtersCount = computed(() => 0);
  filtersPipeline: Array<any> = [];

  constructor(initialFilters: any = [], pipeline: Array<any> = [], endpoint: string = '') {
    this.filters = useCreateFilter(initialFilters);
    this.filtersPipeline = pipeline;
    this.endpoint.value = endpoint;

    watch(
      this.filters,
      async (value) => {
        if (value.ignore === true) {
          this.filters.value.ignore = undefined;
          return;
        }

        await this.fetchAll();

        if (process.client) {
          localStorage.setItem("abber:filters", JSON.stringify(this.filters.value));
        }
      },
      {
        deep: true,
      }
    );
  }

  fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<any>> => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = (await useDirectApi(this.endpoint.value, {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.list.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  }

  pipeFilters = () => {
    return this.filtersPipeline.reduce((prev: any, curr: any) => {
      return Object.assign(prev, curr());
    }, {});
  }

  search = () => {
    if (this.filters.value.search === "") return {};
    return { search: this.filters.value.search };
  };

  ordering = () => {
    return { ordering: this.filters.value.ordering };
  };

  getDateFilter = () => {
    if (!this.filters.value.date__gte || !this.filters.value.date__lte) return {};
    return {
      date__gte: this.filters.value.date__gte,
      date__lte: this.filters.value.date__lte,
    };
  };
}
