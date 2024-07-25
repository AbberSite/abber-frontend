<template>
  <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-black dark:text-white">
    <slot>
        <span v-if="name.includes('date')">{{ useArabicFormattedDate(content) }}</span>
        <span v-else-if="content?.first_name">{{ (content.first_name as string).split(' ')[0] }}</span>
        <span v-else-if="typeof content === 'boolean'"><DashTablesCellsCheck :check="content"/></span>
        <span v-else-if="name.includes('method')"><DashTablesCellsPaymentMethod :method="content" /></span>
        <span v-else-if="name === 'status'"><template v-if="(content as string).length == 1">{{ useContentWithTranslation(content) }}</template><OrderStatus :status="content" /></span>
        <span v-else-if="name === 'ordering_type'"><DashTablesCellsOrderingType :type="content" /></span>
        <span v-else-if="content.toString().includes('://') "><DashTablesCellsFileUrl :url="content"/></span>
        <span v-else>{{ useContentWithTranslation(name === 'status' || name === 'type' ? content : content) }}</span>
    </slot>
  </td>
</template>

<script lang="ts" setup>
defineProps<{ content: any; name: string; }>();
const {te, t} = useI18n();
</script>

<style></style>
