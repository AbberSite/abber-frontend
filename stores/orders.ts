import type { Order, PaginationResponse } from '~/types';
import { useStorage, type RemovableRef } from '@vueuse/core';

class OrdersStore {
    orders = ref<Order[]>([]);
    pagination = ref<PaginationResponse<any>>();

    filtersPipline: Array<any>;

    loading = ref(true);

    filters = ref({
        type: {
            voice: false,
            text: false
        },
        status: [],
        search: '',
        ordering: 'order_item_time_data__start_date'
    });

    filtersCount = computed(() => {
        return (
            this.filters.value.status.length +
            Number(this.filters.value.type.voice) +
            +Number(this.filters.value.type.text)
        );
    });

    constructor() {
        this.filtersPipline = [this.getTypeFilterQuery, this.getStatusFilterQuery, this.search, this.order];

        watch(
            this.filters,
            async () => {
                if (!this) return;

                // this.loading.value = true;

                // const filtersQuery = this.pipeFilters()

                await this.fetchAll();

                // this.loading.value = false;

                if(process.client){
                    localStorage.setItem('abber:filters', JSON.stringify(this.filters.value))
                }
            },
            {
                deep: true
            }
        );

    }

    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<Order>> =>
        new Promise(async (resolve, reject) => {
            try {
                const data = (await useApi('/api/orders', {
                    params: {
                        limit: 9,
                        ...this.pipeFilters(),
                        ...params
                    }
                })) as PaginationResponse<Order>;

                this.orders.value = data.results;

                this.pagination.value = data;

                update?.();
                resolve(data);

                this.loading.value = false;
            } catch (error: any) {
                reject(error);
            }
        });

    getTypeFilterQuery = () => {
        if (!this) return {};

        if (
            (this.filters.value.type.text && this.filters.value.type.voice) ||
            (!this.filters.value.type.text && !this.filters.value.type.voice)
        ) {
            return {};
        }

        if (this.filters.value.type.text) {
            return {
                type: 'text_communication'
            };
        }

        return {
            type: 'video_communication'
        };
    };

    getStatusFilterQuery = () => {
        if (!this || this.filters.value.status.length === 0) return {};

        if (this.filters.value.status.length === 1) {
            return {
                status: this.filters.value.status[0]
            };
        }

        let status = '';

        this.filters.value.status.map((_status: string, index: number) => {
            if (index == 0) {
                status += _status;
                return;
            }

            status += ',' + _status;
        });

        return {
            status__in: status
        };
    };

    search = () => {
        if (this.filters.value.search === '') return {};

        return { search: this.filters.value.search };
    };

    order = () => {
        return { ordering: this.filters.value.ordering };
    };

    pipeFilters = () => {
        return this.filtersPipline.reduce((prev: any, curr: any) => {
            return Object.assign(prev, curr());
        }, {});
    };
}

export const useOrdersStore = defineStore('orders', () => new OrdersStore());
