import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";
import axios from "axios";

class dashboardUsers extends BaseStore {
  countries = ref<[]>([]);
  userData = reactive<{ [key: string]: any }>({});
  userWallet = reactive<{ [key: string]: any }>({});
  userTickets = ref<[]>([]);
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
      user_type__name: "",
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
      () => this.getCountryFilterQuery(),
      () => this.getUserTypeFilterQuery(),
      () => this.getOrdersFilterQuery(),
      () => this.getEmailVerifiedFilterQuery(),
      () => this.getPhoneVerifiedFilterQuery(),
      () => this.getDateJoinFilterQuery(),
      () => this.getDatePurchaseFilterQuery(),
      () => this.search(),
      () => this.ordering(),
      ],
      "/accounts/dashboard-users/"
    );
  }
  getIsActiveFilterQuery = () => {
    return this.filters.value.is_active !== "" && this.filters.value.is_active !== undefined
      ? { is_active: this.filters.value.is_active }
      : {};
  };
  getIsDeletedFilterQuery = () => {
    return this.filters.value.is_deleted !== "" && this.filters.value.is_deleted !== undefined
      ? { is_deleted: this.filters.value.is_deleted }
      : {};
  };
  getCountryFilterQuery = () => {
    return this.filters.value.country ? { country: this.filters.value.country } : {};
  };

  getUserTypeFilterQuery = () => {
    return this.filters.value.user_type__name ? { user_type__name: this.filters.value.user_type__name } : {};
  };

  getOrdersFilterQuery = () => {
    return this.filters.value.orders ? { orders: this.filters.value.orders } : {};
  };

  getEmailVerifiedFilterQuery = () => {
    return this.filters.value.email_verified !== "" && this.filters.value.email_verified !== undefined
      ? { email_verified: this.filters.value.email_verified }
      : {};
  };

  getPhoneVerifiedFilterQuery = () => {
    return this.filters.value.phone_verified !== "" && this.filters.value.phone_verified !== undefined
      ? { phone_verified: this.filters.value.phone_verified }
      : {};
  };

  getDateJoinFilterQuery = () => {
    const { date__join_gte, date__join_lte } = this.filters.value;
    let query: any = {};
    if (date__join_gte) query.date__join_gte = date__join_gte;
    if (date__join_lte) query.date__join_lte = date__join_lte;
    return query;
  };

  getDatePurchaseFilterQuery = () => {
    const { date__purchase_gte, date__purchase_lte } = this.filters.value;
    let query: any = {};
    if (date__purchase_gte) query.date__purchase_gte = date__purchase_gte;
    if (date__purchase_lte) query.date__purchase_lte = date__purchase_lte;
    return query;
  };
  fetchCountries = async () => {
    await axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        this.countries.value = res.data
          .map((country: any) => ({ name: country.name.common }))
          .sort((a, b) => a.name.localeCompare(b.name));
      })
      .catch((err) => console.log(err));
  };

  fetchUserData = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(this.endpoint.value + id);
        Object.assign(this.userData, data);
        await this.getUserWallet();
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

  updateUserData = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.updateLoading.value = true;
        const data = await useDirectApi(
          this.endpoint.value + this.userData.id + "/",
          { method: "PUT", body: this.userData }
        );
        if (data)
          useNotification({
            type: "success",
            content: "تم تحديث بيانات المستخدم بنجاح.",
          });
        else
          useNotification({
            type: "danger",
            content: "فشلت عملية تحديث بيانات المستخدم.",
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

  getUserWallet = async (id?: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const userId = id || this.userData.id;
        const data = await useDirectApi(`/wallets/dashboard-wallets/?user__id=${userId}`);
        Object.assign(this.userWallet, data.results[0]);
        this.loading.value = false;
        resolve(data);
      } catch (error: any) {
        this.loading.value = false;
        reject(error);
      }
    });
  };

  getUserTickets = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi("/support/tickets/", {
          params: {
            limit: 500,
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        });
        this.userTickets.value = (data.results || [])
          .filter((ticket: any) => String(ticket.user?.id) === String(this.userData.id))
          .map((ticket: any) => ({
            ...ticket,
            ticket_status: ticket.status,
          }));
        this.loading.value = false;
        resolve(this.userTickets.value);
      } catch (error: any) {
        this.loading.value = false;
        reject(error);
      }
    });
  };
}
export const useDashboardUsersStore = defineStore(
  "dashboardUsers",
  () => new dashboardUsers()
);
