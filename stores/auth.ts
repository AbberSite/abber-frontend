
class AuthStore {
    public currentPhone = ref("")
}

export const useAuthStore = defineStore('auth-store', () => new AuthStore());
