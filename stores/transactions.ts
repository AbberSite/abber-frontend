import type { PaginationResponse, Transaction } from "~/types";

class TransactionsStore {


    filtersPipline: Array<any>;
    
    filters = ref<{
        success : ''|'true'|'false',
        search? : string, 
        ignore? : boolean,
        ordering : string,
        date : Array<string>
    }>({
        success : '',  
        ignore: undefined,
        search : undefined,
        ordering: '-date', 
        date : []
    });


    filtersLoading  =ref(false) ;

    transactions = ref<Transaction[]>([])

    pagination = ref<PaginationResponse<any>>();

    static filtersWatch: undefined | any;


    filtersCount = computed(() => {
        return (
            Number(this.filters.value.success !== '') + Number(this.filters.value.date.length != 0)
        );
    });



    loading = ref(false)

    constructor() {
        this.filtersPipline = [this.typeFilter, this.ordering, this.search, this.range];

        if (TransactionsStore.filtersWatch) return;
        TransactionsStore.filtersWatch = watch(
            this.filters,
            async (value) => {
                if (value.ignore === true) {
                    this.filters.value.ignore = undefined;
                    return;
                }

                if (!this) return;
                this.filtersLoading.value = true
                await this.fetchAll();
                this.filtersLoading.value = false


                if (process.client) {
                    localStorage.setItem('abber:transactions-filters', JSON.stringify(this.filters.value));
                }
            },
            {
                deep: true
            }
        );
    }


    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<Transaction>> =>
    new Promise(async (resolve, reject) => {
        
        try {
            const data = (await useDirectApi('/wallets/transactions/', {
                params: {
                    limit: 9,
                    ...this.pipeFilters(),
                    ...params
                },
                headers: {
                    'X-Requested-With': process.client ? 'XMLHttpRequest' : ''
                }
            })) as PaginationResponse<Transaction>;

            this.transactions.value = data.results;

            this.pagination.value = data;

            update?.();
            resolve(data);

            this.loading.value = false;
        } catch (error: any) {
            reject(error);
        }

    });

    typeFilter = () => {
        if(this.filters.value.success === '') return {}

        return { success : this.filters.value.success}

    }

    search = () => {
        if (this.filters.value.search === '') return {};

        return { search: this.filters.value.search };
    };

    ordering = () => {
        return { ordering: this.filters.value.ordering };
    };

    range = () => {

        return { date__gte : this.filters.value.date[0], date__lte : this.filters.value.date[1]}
    }

    pipeFilters = () => {
        return this.filtersPipline.reduce((prev: any, curr: any) => {
            return Object.assign(prev, curr());
        }, {});
    };

}


export const useTransactionsStore = defineStore("transacations", () => new TransactionsStore())