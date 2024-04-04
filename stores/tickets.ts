import type { PaginationResponse, Ticket } from '~/types'
class TicketsStore {
    tickets = ref<Ticket[]>([]);
    pagination = ref<PaginationResponse<any>>();

    ticket = ref<Ticket | undefined>(undefined);

    filtersPipline: Array<any>;
    loading = ref(true);
    filters = ref({
        status: [],
        search: '',
        ordering: 'ticket_item_time_data__start_date'
    });
    static filtersWatch: undefined | any;
    constructor() {
        this.filtersPipline = [this.getStatusFilterQuery, this.search];
        if (TicketsStore.filtersWatch) return;
        TicketsStore.filtersWatch = watch(this.filters,
            async (value) => {
                if (value.ignore) {
                    this.filters.value.ignore = undefined;
                    return;
                }
                if (!this) return;
                await this.fetchAll();
                if (process.client) {
                    localStorage.setItem('abber:filters', JSON.stringify(this.filters.value));
                }
            },
            {
                deep: true
            });
    }

    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<Order>> =>
        new Promise(async (resolve, reject) => {
            try {
                const data = (await useApi('/api/tickets', {
                    params: {
                        limit: 9,
                        ...this.pipeFilters(),
                        ...params
                    },
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
        if(!this || this.filters.value.status.length === 0) return {};
        if(this.filters.value.status.length === 1){
            return {
                status: this.filters.value.status[0]
            }
        }
        let status = '';
        this.filters.value.status.map((_status: string, index: number)  => {
            if(index == 0) {
                status += _status;
                return;
            }
            status += ',' + _status;
        });

        return {
            status__in: status
        }
    };

    search = () => {
        if(this.filters.value.search === '') return {};
        return {search: this.filters.value.search};
    }
}

export const useTicketsStore = defineStore('tickets', () => new TicketsStore());