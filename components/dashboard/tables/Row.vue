<template>
  <td
    class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium text-black dark:text-white"
  >
    <slot>
      <span
        v-if="
          name.includes('date') ||
          name.includes('created_at') ||
          name.includes('time')
        "
        >{{ useArabicFormattedDate(content) }}</span
      >
      <span v-else-if="content?.first_name">{{
        (content.first_name as string).split(" ")[0]
      }}</span>
      <span v-else-if="typeof content === 'boolean'"
        ><DashboardTablesCellsCheck :check="content"
      /></span>
      <span v-else-if="name.toLowerCase().includes('method')"
        ><DashboardTablesCellsPaymentMethod :method="content"
      /></span>
      <span v-else-if="name === 'status'"
        ><template v-if="(content as string).length == 1">{{
          $t(`${content}`)
        }}</template
        ><OrderStatus :status="content"
      /></span>
      <span v-else-if="name === 'ordering_type'"
        ><DashboardTablesCellsOrderingType :type="content"
      /></span>
      <span v-else-if="name === 'app_source'"
        ><DashboardTablesCellsAppSource :app_source="content"
      /></span>
      <span v-else-if="content.toString().includes('://')"
        ><DashboardTablesCellsFileUrl :url="content"
      /></span>
      <span v-else-if="name == 'action_flag'">{{
        content == "1" ? "إضافة" : content == "2" ? "تعديل" : "حذف"
      }}</span>
      <span v-else-if="['transaction_count', 'users_count', 'payAverage', 'users'].includes(name)">{{
        content
      }}</span>
      <span v-else-if="name === 'verifiedAuth'">
        <span class="flex items-center gap-2">
          <template v-for="item in content" :key="item">
            <template v-if="item.includes('phone')">
              <svg
                :class="{
                  'text-red-500': item.includes('unverified'),
                  'text-green-500': !item.includes('unverified'),
                }"
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                />
              </svg>
            </template>
            <template v-else-if="item.includes('email')">
              <svg
                :class="{
                  'text-red-500': item.includes('unverified'),
                  'text-green-500': !item.includes('unverified'),
                }"
                class="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </template>
          </template>
        </span>
      </span>
      <span v-else>{{ $t(`${content}`) }}</span>
    </slot>
  </td>
</template>

<script lang="ts" setup>
defineProps<{ content: any; name: string }>();
</script>

<style></style>
