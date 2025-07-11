import { useWebSocket } from '@vueuse/core';
import type { Order, PaginationResponse } from '~/types';
import { useDebounceFilter } from '~/composables/useDebounceFilter';
import { useWebSocketManager } from '~/composables/useWebSocketManager';

class OrdersStore {
  orders = ref<Order[]>([]);
  pagination = ref<PaginationResponse<any>>();

  order = ref<Order | undefined>(undefined);

  filtersPipline: Array<any>;

  loading = ref(true);

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

  constructor() {
    this.filtersPipline = [this.getTypeFilterQuery, this.getStatusFilterQuery, this.search, this.ordering];

    if (OrdersStore.filtersWatch) return;
    OrdersStore.filtersWatch = useDebounceFilter(
      this.filters,
      async (value) => {
        if (value.ignore === true) {
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
        delay: 500,
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
          },
          headers: {
            'X-Requested-With': process.client ? 'XMLHttpRequest' : ''
          }
        })) as PaginationResponse<Order>;

        this.orders.value = data.results ?? [];

        this.pagination.value = data;

        update?.();
        resolve(data);

        this.loading.value = false;
      } catch (error: any) {
        reject(error);
      }
    });

  getOrder = async (id: string) => {
    this.order.value = (await useApi(`/api/orders/order/${id}`)) as Order;
    return this.order.value;
  };

  

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

  ordering = () => {
    return { ordering: this.filters.value.ordering };
  };

  pipeFilters = () => {
    return this.filtersPipline.reduce((prev: any, curr: any) => {
      return Object.assign(prev, curr());
    }, {});
  };


  subscribeToOrderStatus = async (orderId: string) => {
    const { rawToken } = useAuthState();
    const wsManager = useWebSocketManager();

    const connection = wsManager.connect(
      `order-status-${orderId}`,
      useRuntimeConfig().public.WebsocketURL +
      `/ws/order-status/${orderId}/` +
      `?authorization=JWT ${rawToken.value}`,
      {
        onConnected: () => console.log(`Order status WebSocket connected for order ${orderId}`),
        onDisconnected: () => console.log(`Order status WebSocket disconnected for order ${orderId}`),
        onError: (error: any) => console.error(`Order status WebSocket error for order ${orderId}:`, error)
      }
    );

    watch(connection.data, () => {
      this.getOrder(orderId);
    });

    return () => wsManager.disconnect(`order-status-${orderId}`);
  }
  
  updateOrderStatus = async (orderId?: string, status: Order['status']) => {
    const response = await useDirectApi(`/orders/my-orders/${orderId}/`, {
      method: "PATCH",
      body: {
        change_status: status
      }
    })
    this.getOrder(orderId as string); 
    return response
  }
}

export const useOrdersStore = defineStore('orders', () => new OrdersStore());
