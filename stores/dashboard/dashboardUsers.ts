import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";
import axios from "axios";

class dashboardUsers extends BaseStore {
  countries = ref<[]>([]);
  userData = reactive<{ [key: string]: any }>({});
  userLogsList = ref<[]>([]);
  userActivityList = ref<[]>([]);
  userServicesVisited = ref<[]>([]);
  userServicesPaid = ref<[]>([]);
  updateLoading = ref(false);
  constructor() {
    super(
      {
        is_deleted: "",
        is_active: "",
        country: "",
        user_type: "",
        orders: "",
        email_verified: "",
        phone_verified: "",
        date__join_gte: "",
        date__join_lte: "",
        date__purchase_gte: "",
        date__purchase_lte: "",
      },
      [
        () => this.getIsDeletedFilterQuery(),
        () => this.getIsActiveFilterQuery(),
        () => this.getDateFilter(),
        () => this.search(),
        () => this.ordering(),
      ],
      "/accounts/dashboard-users/"
    );
  }
  getIsActiveFilterQuery = () => {
    return {
      is_active: this.filters.value.is_active,
    };
  };
  getIsDeletedFilterQuery = () => {
    return {
      is_deleted: this.filters.value.is_deleted,
    };
  };
  fetchCountries = async () => {
    await axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        this.countries.value = res.data;
        this.countries.value.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
      })
      .catch((err) => console.log(err));
  };

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

  updateActiveStatus = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.updateLoading.value = true;
        const data = await useDirectApi(
          this.endpoint.value + this.userData.id + "/active/",
          { method: "PUT", body: { active: this.userData.is_active } }
        );
        if (data)
          useNotification({
            type: "success",
            content: "لقد تم تحديث حالة النشاط بنجاح.",
          });
        else
          useNotification({
            type: "danger",
            content: "فشلت عملية تحديث حالة النشاط",
          });
        this.updateLoading.value = false;
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  getUserLogs = async (params?: any, update?: any, id?: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = (await useDirectApi("/tracking/history/?user=" + (id || this.userData.id), {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.userLogsList.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  getUserActivity = async (params?: any, update?: any, id?: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = (await useDirectApi(`/tracking/log-entry/?user=${(id || this.userData.id)}`, {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.userActivityList.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  getUserServicesVisited = async (params?: any, update?: any, id?: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = (await useDirectApi(`/accounts/dashboard-users/${(id || this.userData.id)}/user_activity/`, {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.userServicesVisited.value = data.visited_services ?? [];
        this.userServicesPaid.value = data.ordered_sellers ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };
}
export const useDashboardUsersStore = defineStore(
  "dashboardUsers",
  () => new dashboardUsers()
);
