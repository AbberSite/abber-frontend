import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";

class dashboardStatistics extends BaseStore {
  countries = ref<[]>([]);
  statistics_data = reactive<{ [key: string]: any }>({});

  userData = reactive<{ [key: string]: any }>({});
  updateLoading = ref(false);
  constructor() {
    super(
      {},
      [],
      "/dashboard/statistics/"
    );
  }

  fetchUserData = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(this.endpoint.value + id);
        Object.assign(this.userData, data);
        this.loading.value = false;
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  getStatistics = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;

        // Calculate the date range for the last 30 days
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const date_after = last30Days.toISOString().split("T")[0];
        const date_before = today.toISOString().split("T")[0];

        const data = await useDirectApi(
          `${this.endpoint.value}?date_after=${date_after}&date_before=${date_before}`,
          { method: "GET" }
        );

        Object.assign(this.statistics_data, data);
        this.loading.value = false;
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

        // Calculate the date range for the last 30 days
        const today = new Date();
        const last30Days = new Date();
        last30Days.setDate(today.getDate() - 30);

        const date_after = last30Days.toISOString().split("T")[0];
        const date_before = today.toISOString().split("T")[0];

        // Custom logic for fetchAll in dashboardStatistics
        const data = await useDirectApi(
          `${this.endpoint.value}?date_after=${date_after}&date_before=${date_before}`,
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
