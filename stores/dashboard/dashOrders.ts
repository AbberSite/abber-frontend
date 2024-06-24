import type { PaginationResponse } from "~/types";

class dashOrders {
    orders = ref<[]>([]);
    loading = ref<boolean>(true);
    pagination = ref<PaginationResponse<any>>();
    filters = ref({
        type: {
          voice: false,
          text: false
        },
        status: [],
        search: '',
        ordering: 'order_item_time_data__start_date',
        ignore: undefined
      });
      filtersCount = computed(() => {
        return (
          this.filters.value.status.length +
          Number(this.filters.value.type.voice) +
          +Number(this.filters.value.type.text)
        );
      });



  static filtersWatch: undefined | any;
    
  
    fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<any>> =>
        new Promise(async (resolve, reject) => {
            try {
                // console.log({"store": params.value.status})
                const data = (await useDirectApi('/orders/dashboard-orders/', {
                    params: params,
                    headers: {
                        'X-Requested-With': process.client ? 'XMLHttpRequest' : ''
                    }
                })) as PaginationResponse<any>;
                this.orders.value = data.results ?? [];
                this.pagination.value = data;
                this.loading.value = false;
                update?.()
                resolve(data);
            } catch (error: any) {
                reject(error)
            }
        })

}
export const useDashOrdersStore = defineStore('dashOrders', () => new dashOrders());
