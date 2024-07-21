import type { PaginationResponse } from "~/types";

class dashHelp {
    tickets = ref<[]>([]);
    loading = ref<boolean>(true);
    pagination = ref<PaginationResponse<any>>();
    getAllTickets = async (params?: any, update?: any): Promise<PaginationResponse<any>> => new Promise(async (resolve, reject)=> {
        try {
            const data = (await useDirectApi("/support/tickets/", {params: {limit: 20, ...params}, headers: {"X-Requested-With": process.client ? "XMLHttpRequest" : ""}})) as PaginationResponse<any>;
            this.tickets.value = data.results ?? [];
            this.pagination.value = data;
            this.loading.value = false; 
            update?.();
            resolve(data);
        } catch (error: any){
            reject(error);
        };
    }) ;
}

export const useDashHelpStore = defineStore("dashHelp", ()=> new dashHelp());

