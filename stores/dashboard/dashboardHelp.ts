import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";

class dashboardHelp extends BaseStore {
    // tickets = ref<[]>([]);
    constructor(){
        super({
            status: "",
            search: "",
            date__gte: "",
            date__lte: ""
        },
    [
        ()=> this.getStatus(),
        ()=> this.getDateFilter(),
        ()=> this.search()
    ], '/support/tickets/')
    }

    getStatus = () => {
    return {
      status: this.filters.value.status,
    };
  };

    override fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<any>> => new Promise(async (resolve, reject)=> {
        try {
            const data = (await useDirectApi('/support/tickets/', {params: {limit: 20, ...this.pipeFilters(), ...params}, headers: {"X-Requested-With": process.client ? "XMLHttpRequest" : ""}})) as PaginationResponse<any>;
            this.list.value = data.results ?? [];
            this.pagination.value = data;
            this.loading.value = false; 
            update?.();
            resolve(data);
        } catch (error: any){
            reject(error);
        };
    }) ;
}

export const useDashboardHelpStore = defineStore("DashboardHelp", ()=> new dashboardHelp());

