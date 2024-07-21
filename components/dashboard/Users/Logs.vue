<template>
    <div class="flex flex-col space-x-3">
        <DashboardTablesTable :head-items="head" :body-items="items"/>
    </div>
</template>

<script setup lang="ts">
const head = {
    ip: 'IP',
    path: 'المسار',
    platform: 'المنصة',
    device: 'الجهاز',
    date: 'التاريخ',
    location: 'الموقع'
};
const items = [
    {ip: '172.45.56.201', path: '/dashboard/user', platform: 'iOS', device: 'Other / Other / axios 1.6.2', date: '2024-07-05 13:03', location: 'UAE'},
    {ip: '175.5.4.1', path: '/user/name', platform: 'Android', device: 'Other / Other / axios 1.6.2', date: '2024-07-05 13:03', location: 'USA'},
    {ip: '123.456.78.45', path: '/dhf/dh', platform: 'website', device: 'Other / Other / axios 1.6.2', date: '2024-07-05 13:03', location: 'KSA'},
    {ip: '178.56.54.56', path: 'sldlfj/dls', platform: 'website', device: 'Other / Other / axios 1.6.2', date: '2024-07-05 13:03', location: 'UK'},
    {ip: '147.54.56.45', path: '/dd/dj', platform: 'iOS', device: 'Other / Other / axios 1.6.2', date: '2024-07-05 13:03', location: 'MR'},
]
</script>