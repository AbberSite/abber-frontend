class UtilsStore {

    // used for marking notifications as read in initial look up
    readNotifications = ref(false);
    
}

export const useUtilsStore = defineStore('utils', () => new UtilsStore());
