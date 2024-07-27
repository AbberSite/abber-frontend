<template>
  <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-black dark:text-white">
    <slot>
        <span v-if="name.includes('date') || name.includes('time')">{{ useArabicFormattedDate(content) }}</span>
        <span v-else-if="content?.first_name">{{ (content.first_name as string).split(' ')[0] }}</span>
        <span v-else-if="typeof content === 'boolean'"><DashboardTablesCellsCheck :check="content"/></span>
        <span v-else-if="name.toLowerCase().includes('method')"><DashboardTablesCellsPaymentMethod :method="content" /></span>
        <span v-else-if="name === 'status'"><template v-if="(content as string).length == 1">{{ $t(`${content}`) }}</template><OrderStatus :status="content" /></span>
        <span v-else-if="name === 'ordering_type'"><DashboardTablesCellsOrderingType :type="content" /></span>
        <span v-else-if="content.toString().includes('://') "><DashboardTablesCellsFileUrl :url="content"/></span>
        <span v-else>{{ $t(`${content}`) }}</span>
    </slot>
  </td>
</template>

<script lang="ts" setup>
defineProps<{ content: any; name: string; }>();

</script>

<style></style>
