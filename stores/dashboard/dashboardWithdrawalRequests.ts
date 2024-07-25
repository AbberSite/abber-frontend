import { BaseStore } from "./baseStore";

class dashboardWithdrawalRequests extends BaseStore {
  constructor(){
    super({status:'1'}, [()=> this.getStatusFilterQuery(),
    ()=> this.getDateFilter(),
    ()=> this.search(),
    ()=> this.ordering()], "/wallets/dashboard-withdrawal-requests/")
  }
  
  getStatusFilterQuery = () => {
    return {
      status: this.filters.value.status,
    };
  };
};
export const useDashboardWithdrawalRequestsStore = defineStore(
  "dashboardWithdrawalRequests",
  () => new dashboardWithdrawalRequests()
);
