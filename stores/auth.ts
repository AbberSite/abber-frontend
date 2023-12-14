import type { User } from '~/types';

class AuthStore {
    user = ref<User>({});

    authenticated = computed(() => !!this.user.value.id);
    public accessToken = ref(""); 
    public refreshToken  =  ref("");  

    public currentPhone = ref("")




    register = async (email: string, password: string, phone: string) => {
        const response = await useApi('POST', 'https://test.abber.co/api/authentication/register/', {
            email,
            password,
            phone,
            first_name: 'Mahdi Bouguerzi',
        });

        type AuthResponse = { accessToken: string; refreshToken: string; user: User };

        const data: AuthResponse = response.data.value as AuthResponse;

        this.storeUser(data.user);
        this.storeTokens(data.accessToken, data.refreshToken);
    };

    login = async (email: string, password: string) => {
        const response = await useApi('POST', '/api/login/', { email, password });


        type AuthResponse = { access_token: string; refresh_token: string; user: User };

        const data: AuthResponse = response.data.value as AuthResponse;

        this.storeUser(data.user);
        this.storeTokens(data.access_token, data.refresh_token);
    };

    init = async () => {
        await this.refresh()
    };

    refresh = async () => {
        const { refreshToken } = this.getTokens();

        try {
            
            const { data } = await useApi('POST', '/api/auth/refresh', { refresh: refreshToken }) as { data : Ref<{ token : string}>}; 

            this.storeTokens(data.value.token, refreshToken);

        } catch (error) {

            this.clear()
            useRouter().push({ name : "accounts-login"})
            
        }
    };

    storeTokens(accessToken?: string|null, refreshToken?: string|null) {

        if(accessToken){
            localStorage.setItem('abber:access_token', accessToken);
        }
        if(refreshToken){
            localStorage.setItem('abber:refresh_token', refreshToken);
        }
    }

    getTokens() {
        const accessToken = localStorage.getItem('abber:access_token');
        const refreshToken = localStorage.getItem('abber:refresh_token');

        return { accessToken, refreshToken };
    }

    clear() { 

        localStorage.setItem('abber:access_token', "");
        localStorage.setItem('abber:refresh_token', "");

        this.refreshToken.value = ""
        this.accessToken.value = ""

    }


    storeUser(user: User) {
        this.user.value = user;
    }
}

export const useAuthStore = defineStore('auth-store', () => new AuthStore());
