class dashboardSettings {
  loading = ref(false);
  settings = ref<{ [key: string]: any }>({});
  partitions = ref<[]>([]);
  partitionData = ref<{ [key: string]: any }>({});
  showModifyModal = ref(false);
  showCreateModal = ref(false);
  title = ref('');
  showDeleteConfirm = ref(false);
  
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
  getSettingsPartitions = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi('/settings/partitions/');
        this.partitions.value = data.results;
        this.loading.value = false;
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        reject(error);
      }
    });
  };
  createSettingsPartition = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const data = await useDirectApi('/settings/partitions/', {
          method: 'POST',
          body: this.partitionData.value
        });
        this.getSettingsPartitions();
        this.loading.value = false;
        this.showCreateModal.value = false;
        useNotification({
          type: 'success',
          content: 'تم إنشاء القسم بنجاح.',
        });
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
        const data = await useProxy(`/settings/dashboard-settings/${id}/`, {
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

  updateSettingsPartition = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        const id = this.partitionData.value.id;
        const data = await useDirectApi(`/settings/partitions/${id}/`, {
          method: 'PATCH',
          body: this.partitionData.value
        });
        await this.getSettingsPartitions();
        this.loading.value = false;
        this.showModifyModal.value = false;
        useNotification({
          type: 'success',
          content: 'تم تحديث القسم بنجاح.',
        });
        resolve(data);
      } catch (error) {
        this.loading.value = false;
        useNotification({
          type: 'danger',
          content: 'فشلت عملية تحديث القسم.',
        });
        reject(error);
      }
    });
  };

  removeSettingsPartition = async (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        this.loading.value = true;
        await useDirectApi(`/settings/partitions/${id}/`, {
          method: 'DELETE'
        });
        await this.getSettingsPartitions();
        this.loading.value = false;
        useNotification({
          type: 'success',
          content: 'تم حذف القسم بنجاح.',
        });
        resolve(true);
      } catch (error) {
        this.loading.value = false;
        useNotification({
          type: 'danger',
          content: 'فشلت عملية حذف القسم.',
        });
        reject(error);
      }
    });
  };
  toBracketString = (val: any)=> {
    if (Array.isArray(val)) {
        return `[${val.map(v => `'${v}'`).join(',')}]`;
    }
    if (typeof val === 'object' && val !== null) {
        // For object of arrays, convert each array to "'key':[...]" and join with commas
        return Object.entries(val)
            .map(([k, v]) => `'${k}':[${Array.isArray(v) ? v.map(i => `'${i}'`).join(',') : v}]`)
            .join(',');
    }
    return val ?? '';
}
  prepareApiSettingsPayload = () => {
    const apiSettings = { ...this.settings.value.api_settings };
    // Convert active_coupon_apps array to bracket string
    apiSettings.active_coupon_apps = this.toBracketString(apiSettings.active_coupon_apps);

    // Handle apple_developer_merchantid_domain_association as file or skip if empty
    if (
        apiSettings.apple_developer_merchantid_domain_association instanceof File
    ) {
    } else {
        delete apiSettings.apple_developer_merchantid_domain_association;
    }

    return apiSettings;
}

}
export const useDashboardSettingsStore = defineStore(
  "dashboardSettings",
  () => new dashboardSettings()
);
