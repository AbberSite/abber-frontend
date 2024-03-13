import { useWebSocket } from '@vueuse/core';

type UpdateAccountBody = {
    first_name?: string;
    phone?: string;
    image?: File;
    'profile.martial_status'?: string;
    'profile.profession'?: string;
    'profile.bank_account'?: string;
    'profile.birthday'?: string;
    'profile.gender'?: string;
};

class AccountStore {
    tempAccount = ref({
        image: undefined,
        username: '',
        email: '',
        phone: '',
        profile: {
            iban: '',
            gender: '',
            birthdate: '',
            maritalStatus: '',
            profession: ''
        }
    });

    goOffline : ((code?: number | undefined, reason?: string | undefined) => void) | undefined

    tempAccountImagePreview = computed(() =>
        this.tempAccount.value.image ? URL.createObjectURL(this.tempAccount.value.image as Blob) : ''
    );

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
            console.log(this.tempAccount.value.image);

            const data = new FormData();

            data.append('first_name', this.tempAccount.value.username);
            data.append('phone', this.tempAccount.value.phone);
            data.append('email', this.tempAccount.value.email);

            if (this.tempAccount.value.image) {
                data.append('image', this.tempAccount.value.image as Blob);
            }

            if (!this.tempAccount.value.profile.iban) {
                data.append('profile.bank_account', this.tempAccount.value.profile.iban);
            }
            data.append('profile.gender', this.tempAccount.value.profile.gender);
            data.append('profile.birthday', this.tempAccount.value.profile.birthdate);
            data.append('profile.marital_status', this.tempAccount.value.profile.maritalStatus);
            data.append('profile.profession', this.tempAccount.value.profile.profession);

            this.errors.value = {};
            try {
                await useApi(`/api/accounts/update/${id}`, {
                    method: 'POST',

                    body: data
                    // {
                    //     first_name: this.tempAccount.value.username,
                    //     phone: this.tempAccount.value.phone,
                    //     email: this.tempAccount.value.email,
                    //     image : this.tempAccount.value.image,

                    //     profile: {
                    //         bank_account: this.tempAccount.value.profile.iban,
                    //         gender: this.tempAccount.value.profile.gender,
                    //         birthday: this.tempAccount.value.profile.birthdate,
                    //         marital_status: this.tempAccount.value.profile.maritalStatus,
                    //         profession: this.tempAccount.value.profile.profession
                    //     }
                    // }
                });

                resolve(true);
            } catch (error: any) {
                Object.assign(this.errors.value, error.response._data);

                resolve(false);
            }
        });

    goOnline = async () => {
        const { rawToken } = useAuthState();

        const { close } = useWebSocket(
            import.meta.env.VITE_WS_URL + `/ws/connection_status/` + `?authorization=JWT ${rawToken.value}`,
            {
                autoReconnect: true
            }
        );

        return close
    };
}

export const useAccountStore = defineStore('account', () => new AccountStore());
