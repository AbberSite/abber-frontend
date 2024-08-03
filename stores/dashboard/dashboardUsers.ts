import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";
import axios from "axios";

class dashboardUsers extends BaseStore {
  countries = ref<[]>([]);
  userData = reactive<{ [key: string]: any }>({});
  constructor() {
    super(
      {
        is_deleted: '',
        is_active: '',
        country: '',
        user_type: '',
        orders: '',
        email_verified: '',
        phone_verified: '',
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
  fetchCountries = async ()=> {
    await axios.get('https://restcountries.com/v3.1/all').then((res)=> {this.countries.value = res.data; this.countries.value.sort((a,b)=> a.name.common.localeCompare(b.name.common));}).catch((err)=> console.log(err));
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
  }
}
export const useDashboardUsersStore = defineStore(
  "dashboardUsers",
  () => new dashboardUsers()
);
