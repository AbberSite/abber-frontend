import { defineStore } from 'pinia'

interface ApiSettings {
  active_login_methods: {
    website: String[];
  };
  payment_test: boolean;
  active_payment_methods: {
    website: String[];
  };
  active_coupon_apps: String[];
}

interface PolicySettings {
  record_max_elapsed_time: number;
  user_agreement: string;
}

interface FinancialSettings {
  balance_withdrawal_tax: number;
}

interface GeneralSettings {
  phone: string;
  email: string;
  address: string;
  about: string;
}

interface SocialSettings {
  facebook: string;
  snapchat: string;
  twitter: string;
  instagram: string;
}

interface WebsiteSettings {
  api_settings: ApiSettings;
  policy_settings: PolicySettings;
  financial_settings: FinancialSettings;
  general_settings: GeneralSettings;
  social_settings: SocialSettings;

}
class SettingsStore {

  settings = ref<WebsiteSettings | undefined>(undefined);

  getSettings = async (id: string) => {
    this.settings.value = (await useApi(`/api/settings/settings/${id}`)) as WebsiteSettings;
    return this.settings.value;
  };

}

export const useSettingsStore = defineStore('settings', () => new SettingsStore());

