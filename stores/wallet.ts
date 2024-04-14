import { defineStore } from "pinia";



class WalletStore {

    balance = ref<{
        available_balance: number;
        withdrawal_balance: number;
        suspended_balance: number;
        withdrawn_balance: number;
    }>({
        available_balance: 0,
        withdrawal_balance: 0,
        suspended_balance: 0,
        withdrawn_balance: 0,
    });
    fetchBalance = async () => {
        this.balance.value = await useApi("/api/wallet/balance")
    }
}

export const useWalletStore = defineStore('wallet', () => new WalletStore());
