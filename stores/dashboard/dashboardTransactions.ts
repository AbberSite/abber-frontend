import { BaseStore } from "./baseStore";

class dashboardTransactions extends BaseStore{
  constructor(){
    super(
      {success: '', type: '', ordering: "order_item_time_data__start_date"},
      [()=> this.success(),
       ()=> this.getTypeFilterQuery(),
       ()=> this.getDateFilter(),
       ()=> this.search(),
       ()=> this.ordering()],
       "/wallets/dashboard-transactions/"
    )
  };
  
  success = () => {
    if (this.filters.value.success === null) return {};

    return { success: this.filters.value.success };
  };

  
  getTypeFilterQuery = () => {
    if (this.filters.value.type == null) return {};

    return{
      type: this.filters.value.type
    };
  };
  
}
export const useDashboardTransactionsStore = defineStore(
  "DashboardTransactions",
  () => new dashboardTransactions()
);
