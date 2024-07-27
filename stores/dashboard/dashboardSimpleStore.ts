import { BaseStore } from "./baseStore";

export const useDashboardSimpleStore = defineStore(
  "DashboardSimpleStore",
  () => new BaseStore()
);
