import type { User } from "~/types";

class AuthStore {

    user = ref<User>({})

    authenticated = computed(() => !!this.user.value.id) 

    register = async (email: string, password: string, phone: string) => {
        const response = await useApi('POST', 'https://test.abber.co/api/authentication/register/', {
            email,
            password,
            phone,
            first_name: 'Mahdi Bouguerzi',
        });

        type AuthResponse = {  access_token: string; refresh_token: string, user : User };

        const data: AuthResponse = response.data.value as AuthResponse;

        this.storeUser( data.user)
        this.storeTokens(data.access_token, data.refresh_token)
    };

    login = async (email: string, password: string) => {
        const response = await useApi('POST' ,'/api/login/', { email, password });


        console.log(response.data);

        return
        

        type AuthResponse = {  access_token: string; refresh_token: string, user : User };

        const data: AuthResponse = response.data.value as AuthResponse;

        this.storeUser( data.user)
        this.storeTokens(data.access_token, data.refresh_token)
    };


    storeTokens (accessToken : string, refreshToken : string) {
        localStorage.setItem('abber:access_token', accessToken)
        localStorage.setItem('abber:refresh_token', refreshToken)
    }

    getTokens(){
        const accessToken = localStorage.getItem('abber:access_token')
        const refreshToken = localStorage.getItem('abber:refresh_token')

        return { accessToken, refreshToken}
    }

    storeUser(user : User) {
        this.user.value = user
    }
}

export const useAuthStore = defineStore('auth-store', () => new AuthStore());
