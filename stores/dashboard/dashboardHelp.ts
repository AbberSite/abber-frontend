import type { PaginationResponse } from "~/types";
import { BaseStore } from "./baseStore";

class dashboardHelp extends BaseStore {
    // tickets = ref<[]>([]);
    updateLoading = ref<boolean>(false);
    problems = ref<[]>([]);
    problem_data = ref<any>({
        parent: "",
        name: "",
        result: "",
        role: "0"
    });
    constructor(){
        super({
            status: "",
            search: "",
            date__gte: "",
            date__lte: ""
        },
    [
        ()=> this.getStatus(),
        ()=> this.getDateFilter(),
        ()=> this.search()
    ], '/support/tickets/')
    }

    getStatus = () => {
    return {
      status: this.filters.value.status,
    };
  };

    override fetchAll = async (params?: any, update?: any): Promise<PaginationResponse<any>> => new Promise(async (resolve, reject)=> {
        try {
            const data = (await useDirectApi('/support/tickets/', {params: {limit: 20, ...this.pipeFilters(), ...params}, headers: {"X-Requested-With": process.client ? "XMLHttpRequest" : ""}})) as PaginationResponse<any>;
            this.list.value = data.results ?? [];
            this.pagination.value = data;
            this.loading.value = false; 
            update?.();
            resolve(data);
        } catch (error: any){
            reject(error);
        };
    });

    fetchProblems = async (params?: any, update?: any): Promise<PaginationResponse<any>> => new Promise(async (resolve, reject)=> {
        try {
            this.loading.value = true;
            // First, get the count
            const {count} = await useDirectApi('/support/problems/', { params: { limit: 1, ...this.pipeFilters(), ...params }, headers: { "X-Requested-With": process.client ? "XMLHttpRequest" : "" } });
            // Then, fetch all problems with the count as limit
            const data = (await useDirectApi('/support/problems/', {params: {limit: count, ...this.pipeFilters(), ...params}, headers: {"X-Requested-With": process.client ? "XMLHttpRequest" : ""}})) as PaginationResponse<any>;
            this.problems.value = data.results ?? [];
            this.pagination.value = data;
            this.loading.value = false; 
            update?.();
            resolve(data);
        } catch (error: any){
            this.loading.value = false;
            reject(error);
        };
    });
    createProblem = async () => {
        try {
            // Convert role to string if it's an array
            if (Array.isArray(this.problem_data.value.role)) {
                this.problem_data.value.role = JSON.stringify(this.problem_data.value.role);
            }
            if (this.problem_data.value.id) {
                // Update existing problem
                await useDirectApi(`/support/problems/${this.problem_data.value.id}/`, { method: 'PUT', body: this.problem_data.value });
                useNotification({ type: 'success', content: 'تم التحديث بنجاح' });
            } else {
                // Create new problem
                await useDirectApi('/support/problems/', { method: 'POST', body: this.problem_data.value });
                useNotification({ type: 'success', content: 'تم الإنشاء بنجاح' });
            }
            this.resetProblemData();
            await this.fetchProblems();
        } catch (error: any) {
            useNotification({ type: 'danger', content: 'فشل العملية، رجاءا أعد المحاولة' });
            this.updateLoading.value = false;
        } finally {
            this.updateLoading.value = false;
        }
    }

    fetchProblemById = (id: number) => {
        const found = this.problems.value.find((p: any) => p.id === id);
        if (!found) {
            useNotification({ type: 'danger', content: 'لم يتم العثور على المشكلة المطلوبة في القائمة الحالية.' });
            return null;
        }
        return found;
    }
    deleteProblem = async (id: number) => {
        try {
            await useDirectApi(`/support/problems/${id}/`, { method: 'DELETE' });
            useNotification({ type: 'success', content: 'تم حذف المشكلة بنجاح' });
            // Optionally refresh problems list
            await this.fetchProblems();
        } catch (error: any) {
            useNotification({ type: 'danger', content: 'فشل حذف المشكلة، رجاءا أعد المحاولة' });
        }
    };
    resetProblemData = () => {
        this.problem_data.value = {
            parent: "",
            name: "",
            result: "",
            role: ""
        };
    };
}

export const useDashboardHelpStore = defineStore("DashboardHelp", ()=> new dashboardHelp());

