<template>
  <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-black dark:text-white">
    <slot>
        <span v-if="name.includes('date')">{{ useArabicFormattedDate(content) }}</span>
        <span v-else-if="content?.first_name">{{ content.first_name }}</span>
        <span v-else-if="typeof content === 'boolean'"><DashboardTablesCellsCheck :check="content"/></span>
        <span v-else-if="name.includes('method')"><DashboardTablesCellsPaymentMethod :method="content" /></span>
        <span v-else-if="name === 'status'"><template v-if="(content as string).length == 1">{{ $t(`${content}`) }}</template><OrderStatus :status="content" /></span>
        <span v-else-if="name === 'type'">{{ $t(`${content}`) }}</span>
        <span v-else-if="name === 'ordering_type'"><DashboardTablesCellsOrderingType :type="content" /></span>
        <span v-else>{{ content }}</span>
    </slot>
  </td>
</template>

<script lang="ts" setup>
defineProps<{ content: any; name: string }>();
</script>

<style></style>
