import { useWebSocket } from '@vueuse/core';

type UpdateAccountBody = {
    first_name?: string;
    phone?: string;
    image_url?: File | string;
    'profile.martial_status'?: string;
    'profile.profession'?: string;
    'profile.bank_account'?: string;
    'profile.birthday'?: string;
    'profile.gender'?: string;
};

class AccountStore {
    tempAccount = ref({
        image_url: null,
        first_name: '',
        email: '',
        phone: '',
        profile: {
            bank_account: '',
            gender: '',
            birthday: '',
            maritalStatus: '',
            profession: ''
        }
    });

    zoomAccount: Ref<ZoomAccount | undefined> = ref<ZoomAccount | undefined>(undefined);

    goOffline: ((code?: number | undefined, reason?: string | undefined) => void) | undefined;

    errors = ref<{
        phone?: Array<string>;
        first_name?: Array<string>;
        email?: Array<string>;
        image?: Array<string>;
        profile?: {
            bank_account?: Array<string>;
            gender?: Array<string>;
            birthday?: Array<string>;
            maritalStatus?: Array<string>;
            profession?: Array<string>;
        };
    }>({});

    update = async (id: string) =>
        new Promise(async (resolve, reject) => {
            const {getSession} = useAuth();
            console.log(this.tempAccount.value.image);

            const data = new FormData();

            data.append('first_name', this.tempAccount.value.first_name);
            data.append('phone', this.tempAccount.value.phone);
            data.append('email', this.tempAccount.value.email);

            if (this.tempAccount.value.image_url) {
                data.append('image_url', this.tempAccount.value.image_url as File);
            }

            data.append('profile.bank_account', this.tempAccount.value.profile.bank_account);
            data.append('profile.gender', this.tempAccount.value.profile.gender);
            data.append('profile.birthday', this.tempAccount.value.profile.birthday);
            data.append('profile.marital_status', this.tempAccount.value.profile.maritalStatus);
            data.append('profile.profession', this.tempAccount.value.profile.profession);

            this.errors.value = {};
            try {
                await useFormDataApi(`/accounts/update/${id}/`, data);
                getSession();
                resolve(true);
            } catch (error: any) {
                Object.assign(this.errors.value, error.response._data);

                resolve(false);
            }
        });

    goOnline = async () => {
        const { rawToken } = useAuthState();
        console.log("connecting to websocket");
        const { close, status } = useWebSocket(
            useRuntimeConfig().public.WebsocketURL + `/ws/connection_status/` + `?authorization=JWT ${rawToken.value}`,

            {
                autoReconnect: true
            }
        );
        watch(status, (value) => {
            console.log(`the status websocket connection: ${value}`);
        })
        return close;
    };

    connectWSNotifications = async () => {
        const { data,rawToken } = useAuthState();
        const { readNotifications } = storeToRefs(useUtilsStore());
        const { close, status, data: response } = useWebSocket(useRuntimeConfig().public.WebsocketURL + `/ws/notifications/${data.value.username}/` + `?authorization=JWT ${rawToken.value}`, { autoReconnect: true });
        watch(status, (value) => {
            console.log(`notification status: ${value}`);
        });
        watch(response, (value) => {
            value = JSON.parse(value);
            data.value.notifications.results.unshift(value.notification);
            data.value.notifications.results.pop();
            readNotifications.value = true;
        });
        return close;
    }

    sendEmailVerification = async (email: string) =>
        new Promise(async (resolve, reject) => {
            try {
                await useDirectApi(`/authentication/register/resend-email/`, {
                    method: 'POST',
                    body: {
                        email
                    }
                });

                resolve(true);
            } catch (error: any) {
                reject(error);
            }
        });

    verifyEmail = async (key: string) =>
        new Promise(async (resolve, reject) => {
            try {
                const response = await useDirectApi(`/authentication/register/verify-email/`, {
                    method: 'POST',
                    body: {
                        key
                    }
                });

                if (response.detail === 'ok') {
                    resolve({ error: false });
                } else {
                    reject({ error: true, message: 'something went wrong' });
                }
            } catch (error) {
                reject({ error: true, message: error });
            }
        });

    getZoomAccounts = async (): Promise<ZoomAccount | undefined> =>
        new Promise(async (resolve, reject) => {
            try {
                const accounts = (await useDirectApi(`/zoom/accounts/`)) as PaginationResponse<ZoomAccount>;

                this.zoomAccount.value = accounts?.results?.[0] ?? undefined;
                resolve(accounts?.results?.[0] ?? undefined);
            } catch (error) {
                reject(error);
            }
        });

    createZoomAccount = async (): Promise<any> =>
        new Promise(async (resolve, reject) => {
            try {

                const accounts = (await useDirectApi(`/zoom/accounts/`, {
                    method: 'POST'
                })) as PaginationResponse<ZoomAccount>;

                resolve(true);

            } catch (error) {
                reject(error);
            }
        });
}

export const useAccountStore = defineStore('account', () => new AccountStore());
