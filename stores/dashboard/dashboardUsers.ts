import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";
import { useApiCache } from "~/composables/useApiCache";
import axios from "axios";
import { useRoute } from 'vue-router';

class dashboardUsers extends BaseStore {
  expressors = ref<[]>([]);
  edit = ref(false);
  countries = ref<[]>([]);
  userData = reactive<{ [key: string]: any }>({});
  userWallet = reactive<{ [key: string]: any }>({});
  expressorData = reactive<{ [key: string]: any }>({});
  userTickets = ref<[]>([]);
  userLogsList = ref<[]>([]);
  userActivityList = ref<[]>([]);
  userServicesVisited = ref<[]>([]);
  userServicesPaid = ref<[]>([]);
  updateLoading = ref(false);
  logs = ref<[]>([]);
  content_types = ref<[]>([]);
  logs_filters = reactive({
    action_flag: "",
    object_id: "",
    content_type: "",
  });
  fullTickets = ref<[]>([]);
  constructor() {
    super(
      {
      is_deleted: "",
      is_active: "",
      country: "",
      user_type__name: "",
      orders_count: "",
      verified_email: "",
      verified_phone: "",
      date_joined__gte: "",
      date_joined__lte: "",
      order_date_after: "",
      order_date_before: "",
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
    return this.filters.value.orders_count ? { orders_count: this.filters.value.orders_count } : {};
  };

  getEmailVerifiedFilterQuery = () => {
    return this.filters.value.verified_email !== "" && this.filters.value.verified_email !== undefined
      ? { verified_email: this.filters.value.verified_email }
      : {};
  };

  getPhoneVerifiedFilterQuery = () => {
    return this.filters.value.verified_phone !== "" && this.filters.value.verified_phone !== undefined
      ? { verified_phone: this.filters.value.verified_phone }
      : {};
  };

  getDateJoinFilterQuery = () => {
    const { date_joined__gte, date_joined__lte } = this.filters.value;
    let query: any = {};
    if (date_joined__gte) query.date_joined__gte = date_joined__gte;
    if (date_joined__lte) query.date_joined__lte = date_joined__lte;
    return query;
  };

  getDatePurchaseFilterQuery = () => {
    const { order_date_after, order_date_before } = this.filters.value;
    let query: any = {};
    if (order_date_after) query.order_date_after = order_date_after;
    if (order_date_before) query.order_date_before = order_date_before;
    return query;
  };
  fetchCountries = async () => {
    let cachedCountries = null;
    try {
      cachedCountries = await useApiCache('https://restcountries.com/v3.1/all?fields=name,cca2', {
        ttl: 86400000, // 24 hours
        tags: ['countries'],
        key: 'countries:restcountries'
      });
    } catch (e) {
      // log or ignore, will fallback below
      console.warn('useApiCache error:', e);
    }
    if (cachedCountries) {
      this.countries.value = cachedCountries.map((country: any) => ({ name: country.name.common, code: country.cca2 })).sort((a, b) => a.name.localeCompare(b.name));
      return;
    }
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

  updateUserData = async (payload) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.updateLoading.value = true;
        const data = await useProxy(
          this.endpoint.value + this.userData.id + "/",
          { method: "PUT", body: payload }
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
        let userId = id;
        if (!userId) {
          if (this.userData.id) {
            userId = this.userData.id;
          } else if (process.client) {
            const route = useRoute();
            userId = route.params.id || route.query.id;
          }
        }
        const data = (await useDirectApi("/tracking/history/?user=" + userId, {
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
        let userId = id;
        if (!userId) {
          if (this.userData.id) {
            userId = this.userData.id;
          } else if (process.client) {
            const route = useRoute();
            userId = route.params.id || route.query.id;
          }
        }
        const data = (await useDirectApi(`/tracking/log-entry/?user=${userId}`, {
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
        if (this.fullTickets.value.length ===0){
          const {count} = await useDirectApi("/support/tickets/", {params: {limit: 1}});
          const {results} = await useDirectApi("/support/tickets/", {params: {limit: count}});
          if (Array.isArray(results)) {
            this.fullTickets.value = results;
          }
          else {
            console.error("API response is not an array:", results);
            this.fullTickets.value = [];
          }
        }
        this.userTickets.value = (this.fullTickets.value || [])
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

  /**
   * Fetch all users with user_type__name = 'معبر'
   */
  getExpressors = async (params?: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(this.endpoint.value, {
          params: {
            ...this.pipeFilters(),
            user_type__name: 'معبر',
            ...params,
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        });
        this.expressors.value = data.results || [];
        this.loading.value = false;
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        reject(error);
      }
    });
  };
  getAllLogs = async (params?: any, update?: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = (await useDirectApi("/tracking/log-entry/", {
          params: {
            limit: 20,
            ...this.pipeFilters(),
            ...this.logs_filters,
            ...params
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        })) as PaginationResponse<any>;
        this.logs.value = data.results ?? [];
        this.pagination.value = data;
        this.loading.value = false;
        update?.();
        resolve(data);
      } catch (error: any) {
        reject(error);
      }
    });
  };
  getExpressor = async (username: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(`/expressors/expressor/account/${username}/`, {
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        });
        this.loading.value = false;
        Object.assign(this.expressorData, data);
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        reject(error);
      }
    });
  };
  updateExpressor = async (username: string, payload: Record<string, any>) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.updateLoading.value = true;
        const data = await useProxy(`/expressors/expressor/account/${username}/`, {
          method: "PUT",
          body: payload,
        });
        if (data) {
          useNotification({
            type: "success",
            content: "تم تحديث بيانات المعبر بنجاح.",
          });
          Object.assign(this.expressorData, data);
        } else {
          useNotification({
            type: "danger",
            content: "فشلت عملية تحديث بيانات المعبر.",
          });
        }
        this.updateLoading.value = false;
        resolve(data);
      } catch (error) {
        this.updateLoading.value = false;
        reject(error);
      }
    });
  };
  getThePaidServices = async (id?: number, type?: string='buyer') => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const userKey = type === 'seller' ? 'seller' : 'buyer';
        const data = await useDirectApi(`/orders/dashboard-orders/`, {
          params: {
            [userKey]: id || this.userData.id || this.expressorData.id,
            ordering: "order_item_time_data__start_date",
            limit: 5000
          },
          headers: {
            "X-Requested-With": process.client ? "XMLHttpRequest" : "",
          },
        });

        this.userServicesPaid.value = data.results || [];

        this.loading.value = false;
        resolve(this.userServicesPaid.value);
      } catch (error) {
        console.error("Error fetching paid services:", error);
        this.loading.value = false;
        reject(error);
      }
    });
  };
  getUserIdByUsername = async (username: string): Promise<number | null> => {
    try {
      // Use cached user search instead of fetching all users
      const userData = await useApiCache<any>(`/accounts/dashboard-users/search/`, {
        ttl: 300000, // 5 minutes cache
        tags: ['users', 'search'],
        key: `user:search:${username}`,
        params: { username }
      });
      
      return userData?.id || null;
    } catch (error) {
      console.error("Error fetching user ID by username:", error);
      
      // Fallback to original method if search endpoint doesn't exist
      try {
        const allUsers = await useApiCache<any>(this.endpoint.value, {
          ttl: 600000, // 10 minutes cache for all users
          tags: ['users', 'all'],
          key: 'users:all:lookup',
          params: { limit: 10000 } // Reduced from 100000
        });
        const user = allUsers.results.find((user: any) => user.username === username);
        return user ? user.id : null;
      } catch (fallbackError) {
        console.error("Fallback search also failed:", fallbackError);
        return null;
      }
    }
  };
}
export const useDashboardUsersStore = defineStore(
  "dashboardUsers",
  () => new dashboardUsers()
);
