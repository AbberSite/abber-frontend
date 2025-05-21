class dashboardSettings {
  loading = ref(false);
  settings = ref<{ [key: string]: any }>({});

  
  getSettings = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi('/settings/dashboard-settings/');
        this.settings.value = data.results[0];
        this.loading.value = false;
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        reject(error);
      }
    });
  };

  updateSettings = async (id?: number | 2, settingsSection: {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi(`/settings/dashboard-settings/${id}/`, {
          method: 'PATCH',
          body: settingsSection,
        });
        this.settings.value = { ...this.settings.value };
        this.loading.value = false;
        useNotification({
          type: 'success',
          content: 'تم تحديث الإعدادات بنجاح.',
        });
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        useNotification({
          type: 'danger',
          content: 'فشلت عملية تحديث الإعدادات.',
        });
        reject(error);
      }
    });
  };

}
export const useDashboardSettingsStore = defineStore(
  "dashboardSettings",
  () => new dashboardSettings()
);
