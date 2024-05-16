import type { withdrawalRequest, PaginationResponse } from "~/types";

class withdrawalRequestsStore {
    requests = ref<withdrawalRequest[]>([]);
    pagination = ref<PaginationResponse<any>>();
    loading = ref<boolean>(true);
    filters = ref({
        ordering: 'date'
    });
    static filtersWatch: undefined | any;
    constructor() {
        if (withdrawalRequestsStore.filtersWatch) return;
        withdrawalRequestsStore.filtersWatch = watch(
            this.filters, async (value) => {
                if(!this) return;
                await this.fetchAll();
            }, 
            {
                deep: true
            }
        )
    };

    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<withdrawalRequest>> =>
        new Promise(async (resolve, reject) => {
            try {
                const data = (await useProxy('/wallets/balance-withdrawal/', {
                    params: {
                        limit: 9,
                        ...this.filters.value,
                        ...params
                    },
                    headers: {
                        'X-Requested-With': process.client ? 'XMLHttpRequest' : ''
                    }
                }
                )) as PaginationResponse<withdrawalRequest>;
                this.requests.value = data.results ?? [];
                this.pagination.value = data;
                update?.();
                resolve(data);
                this.loading.value = false;
            } catch (e: any) {
                reject(e);
            }
        });
    ordering = () => {
        return {ordering: this.filters.value.ordering}
    }
};

export const useWithdrawalRequestsStore = defineStore('withdrawalRequests', ()=> new withdrawalRequestsStore());