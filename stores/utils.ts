class UtilsStore {
    readNotifications = ref(false);
    
}

export const useUtilsStore = defineStore('utils', () => new UtilsStore());
