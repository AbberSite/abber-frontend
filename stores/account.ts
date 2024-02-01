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

    errors = ref<{
        phone?: Array<string>;
        first_name?: Array<string>;
        email?: Array<string>;
        profile?: {
            bank_account?: Array<string>,
            gender?: Array<string>,
            birthday?: Array<string>,
            maritalStatus?: Array<string>,
            profession?: Array<string>
        }
    }>({});

    update = async (id: string) =>
        new Promise(async (resolve, reject) => {

            this.errors.value = {}
            try {
                await useApi(`/api/accounts/update/${id}`, {
                    method: 'POST',
                    body: {
                        first_name: this.tempAccount.value.username,
                        phone: this.tempAccount.value.phone,
                        email: this.tempAccount.value.email,

                        profile: {
                            bank_account: this.tempAccount.value.profile.iban,
                            gender: this.tempAccount.value.profile.gender,
                            birthday: this.tempAccount.value.profile.birthdate,
                            marital_status: this.tempAccount.value.profile.maritalStatus,
                            profession: this.tempAccount.value.profile.profession
                        }
                    }
                });

                resolve(true);
            } catch (error: any) {
                console.log(error.response._data);

                Object.assign(this.errors.value, error.response._data);

                resolve(false);
            }
        });
}

export const useAccountStore = defineStore('account', () => new AccountStore());
