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

  getSettings = async (forceRefresh: boolean = false) => {
    // Return cached settings if available and not forcing refresh
    if (this.settings.value && !forceRefresh) {
      return this.settings.value;
    }

    try {
      // Use API caching for settings
      this.settings.value = await useApiCache<WebsiteSettings>(`/settings/settings/`, {
        ttl: 600000, // 10 minutes cache
        tags: ['settings'],
        key: 'website-settings'
      });
      return this.settings.value;
    } catch (error: any) {
      console.error('Failed to fetch settings:', error);
      
      // Fallback settings to prevent app crash
      this.settings.value = {
        api_settings: {
          active_login_methods: { website: ['email'] },
          payment_test: false,
          active_payment_methods: { website: [] },
          active_coupon_apps: []
        },
        policy_settings: {
          record_max_elapsed_time: 300,
          user_agreement: ''
        },
        financial_settings: {
          balance_withdrawal_tax: 0
        },
        general_settings: {
          phone: '',
          email: '',
          address: '',
          about: ''
        },
        social_settings: {
          facebook: '',
          snapchat: '',
          twitter: '',
          instagram: ''
        }
      };
      
      return this.settings.value;
    }
  };

}

export const useSettingsStore = defineStore('settings', () => new SettingsStore());

