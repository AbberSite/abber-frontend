import type { PaginationResponse, Service } from "~/types";

class ServicesStore {

    fetchAll : () => Promise<PaginationResponse<Service>> = async () => {
        
        const { data } = await useFetch('/api/expressors');

        return data.value
    }

}

export const useServicesStore = defineStore("services", () => new ServicesStore())
