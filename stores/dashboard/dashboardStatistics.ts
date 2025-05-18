import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";

class dashboardStatistics extends BaseStore {
  countries = ref<[]>([]);
  statistics_data = reactive<{ [key: string]: any }>({});
  services_data = reactive<{ [key: string]: any }>({});
  userData = reactive<{ [key: string]: any }>({});
  updateLoading = ref(false);
  constructor() {
    const getDate = () => {
      const today = new Date();
      const last30Days = new Date();
      last30Days.setDate(today.getDate() - 1);

      const date_after = last30Days.toISOString().split("T")[0];
      const date_before = today.toISOString().split("T")[0];

      return {
        date_after,
        date_before,
      };
    };
    const { date_after, date_before } = getDate();
    super(
      {
        date_after,
        date_before
      },
      [() => (this as any).getDateFilter()],
      "/dashboard/statistics/"
    );
  }

  override getDateFilter = () => {
    if (!this.filters.value.date_before || !this.filters.value.date_after) return {};
    return {
      date_after: this.filters.value.date_after,
      date_before: this.filters.value.date_before,
    };
  };

  // fetchUserData = async (id: number) => {
  //   return new Promise(async (resolve, reject) => {
  //     try {
  //       this.loading.value = true;
  //       const data = await useDirectApi(this.endpoint.value + id);
  //       Object.assign(this.userData, data);
  //       this.loading.value = false;
  //       resolve(data);
  //     } catch (error: any) {
  //       reject(error);
  //     }
  //   });
  // };
  
  getServices = async (params?: any, update?: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(
          `${this.endpoint.value}services/`,{
            params: {
              ...this.pipeFilters(),
              ...params,
            },
            headers: {
              "X-Requested-With": process.client ? "XMLHttpRequest" : "",
            },
          }
        );

        Object.assign(this.services_data, data.results);
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  override fetchAll = async (
    params?: any,
    update?: any
  ): Promise<PaginationResponse<any>> => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        // Custom logic for fetchAll in dashboardStatistics
        const data = await useDirectApi(
          `${this.endpoint.value}`,
          {
            params: {
              ...this.pipeFilters(),
              ...params,
            },
            headers: {
              "X-Requested-With": process.client ? "XMLHttpRequest" : "",
            },
          }
        );

        Object.assign(this.statistics_data, data);
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  
}
export const useDashboardStatisticsStore = defineStore(
  "dashboardStatistics",
  () => new dashboardStatistics()
);
