import type { PaginationResponse, Ticket } from '~/types'
class TicketsStore {
    tickets = ref<Ticket[]>([]);
    pagination = ref<PaginationResponse<any>>();

    ticket = ref<Ticket | undefined>(undefined);

    filtersPipline: Array<any>;
    loading = ref(true);
    filters = ref({
        status: '',
        search: '',
        ordering: 'ticket_item_time_data__start_date',
        ignore: undefined
    });
    static filtersWatch: undefined | any;
    constructor() {
        this.filtersPipline = [this.getStatusFilterQuery, this.search, this.ordering];
        if (TicketsStore.filtersWatch) return;
        TicketsStore.filtersWatch = watch(this.filters,
            async (value) => {
                if (value.ignore === true) {
                    this.filters.value.ignore = undefined;
                    return;
                }
                if (!this) return;
                await this.fetchAll(this.filters.value);
                if (process.client) {
                    localStorage.setItem('abber:filters-tickets', JSON.stringify(this.filters.value));
                }
            },
            {
                deep: true
            });
    }

    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<Order>> =>
        new Promise(async (resolve, reject) => {
            try {
                // console.log({"store": params.value.status})
                const data = (await useApi('/api/tickets', {
                    params: params,
                    headers: {
                        'X-Requested-With': process.client ? 'XMLHttpRequest' : ''
                    }
                })) as PaginationResponse<Ticket>;
                this.tickets.value = data.results ?? [];
                this.pagination.value = data;
                update?.()
                resolve(data);
                this.loading.value = false;
            } catch (error: any) {
                reject(error)
            }
        })



    pipeFilters = () => {
        return this.filtersPipline.reduce((prev: any, curr: any) => {
            return Object.assign(prev, curr());
        }, {});
    };

    getStatusFilterQuery = ()=> {
        if(this.filters.value.status){
            return this.filters.value.status;
        }
    };

    search = () => {
        if(this.filters.value.search === '') return {};
        return {search: this.filters.value.search};
    };

    filtersCount = computed(()=> {
        return (
            this.filters.value.status == '' ? 0 : 1
        )
    });
    ordering = () => {
        return { ordering: this.filters.value.ordering };
    };
}

export const useTicketsStore = defineStore('tickets', () => new TicketsStore());