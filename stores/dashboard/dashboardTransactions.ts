import { BaseStore } from "./baseStore";

class dashboardTransactions extends BaseStore{
  accountStatements = ref<any[]>([]);
  statementsLoading = ref<boolean>(false);
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

  getAccountStatements = async (user: string) => {
    try {
      this.statementsLoading.value = true;
      const {results} = await useDirectApi("/wallets/dashboard-transactions/", {params: {limit: 2000}});
      if (Array.isArray(results)) {
        this.accountStatements.value = results.filter(
          (item: any) => item?.user === user
        );
      } else {
        console.error("API response is not an array:", results);
        this.accountStatements.value = [];
      }
    } catch (error) {
      console.error("Error fetching account statements:", error);
      this.accountStatements.value = [];
    } finally {
      this.statementsLoading.value = false;
    }
  };
}
export const useDashboardTransactionsStore = defineStore(
  "DashboardTransactions",
  () => new dashboardTransactions()
);
