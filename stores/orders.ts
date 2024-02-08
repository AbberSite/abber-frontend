import type { Order, PaginationResponse } from '~/types';

class OrdersStore {
    orders = ref<Order[]>([]);
    pagination = ref<PaginationResponse<any>>();

    loading = ref(true)

    filters = ref<{
        type: { voice: boolean; text: boolean };
        status: Array<string>;
    }>({
        type: {
            voice: false,
            text: false
        },
        status: []
    });

    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<Order>> =>
        new Promise(async (resolve, reject) => {
            try {
                const data = (await useApi('/api/orders', {
                    params: {
                        limit: 9,
                        ...params
                    }
                })) as PaginationResponse<Order>;

                this.orders.value = data.results;

                this.pagination.value = data;

                update?.();
                resolve(data);

                this.loading.value = false
            } catch (error: any) {
                reject(error);
            }
        });
}

export const useOrdersStore = defineStore('orders', () => new OrdersStore());
