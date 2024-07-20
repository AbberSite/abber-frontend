import { BaseStore } from "./baseStore";
class dashOperations extends BaseStore {
  constructor(){
    super(
      {type: ''},
      [()=> this.getTypeFilterQuery(), ()=>
        this.getDateFilter(),
        ()=> this.search(), ()=>
        this.ordering()],
        "/wallets/dashboard-wallet-operations/"
    )
  }
  users = ref([]);
  getTypeFilterQuery = () => {
    return {
      type: this.filters.value.type,
    };
  };
  submitNewOperation = async (body: Object) => {
    try {
      const data = await useDirectApi("/wallets/dashboard-wallet-operations/", {
        method: "post",
        body: body,
        headers: {
          "X-Requested-With": process.client ? "XMLHttpRequest" : "",
        },
      });
      useNotification({ type: "success", content: "لقد تمت العملية بنجاح" });
      return data;
    } catch (e) {
      useNotification({
        type: "danger",
        content: "حدث خطأ ما، الرجاء اعادة المحاولة لاحقا",
      });
      console.error(e);
    };
  };
  getUsers = async ()=> {
    try {
      const data = await useDirectApi("/accounts/dashboard-users-lite/");
      this.users.value = data;
    } catch (e) {
      
      console.error(e);
    };
  }
}
export const useDashOperationsStore = defineStore(
  "dashOperations",
  () => new dashOperations()
);
