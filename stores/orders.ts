import type { Order, PaginationResponse } from "~/types"

class OrdersStore {

    fetchAll = async (params? : any) : Promise<PaginationResponse<Order>> => new Promise(async (resolve, reject) => {
        try {
            const data = await useApi("/api/orders", {
                params : {
                    limit : 9,
                    ...params
                }
            })
            
            resolve(data)
        } catch (error : any) {
            reject(error)
        }
    })

}


export const useOrdersStore = defineStore('orders', () => new OrdersStore())