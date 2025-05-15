<template>
  <template v-if="loading">
    <SkeletonsIndexStatistics />
  </template>
  <template v-else>
    <DashboardDatePickerInput
      label="التاريخ"
      v-model:model-date="range_date"
      range
    />
    <div
      class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 py-6 px-6 sm:pt-0 w-full"
    >
      <DashboardAnalyticsCard
        v-for="(card, index) in cards"
        :key="index"
        :title="card.title"
        :count="card.count"
        :subtitle="card.subtitle"
        :iconBackgroundClass="`${card.iconBackgroundClass} rounded-[14px]`"
        nowidth
      >
        <template #icon
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="20"
            width="20"
            v-html="card.icon"
          ></svg
        ></template>
        <template #background-icon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            height="56"
            width="56"
            class="-translate-x-1/4 translate-y-1/4"
            v-html="card.icon"
          ></svg>
        </template>
      </DashboardAnalyticsCard>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 py-6 px-6 sm:pt-0 w-full">
      <DashboardAnalyticsTable
        :head-items="{ method: 'وسيلة الدفع', transaction_count: 'الطلبات' }"
        :body-items="statistics_data.payment_methods"
      />
      <DashboardAnalyticsTable
        :head-items="{
          geolocation__country_name: 'الدولة',
          orders: 'الطلبات',
          users_count: 'المستخدمين',
        }"
        :body-items="statistics_data.countries"
      />
      <DashboardAnalyticsTable
        :head-items="{
          verifiedAuth: 'وسائل التسجيل المؤكدة',
          users: 'المستخدمين',
        }"
        :body-items="[
          { verifiedAuth: ['phone', 'email'], users: statistics_data.users.login_methods.phone_email },
          { verifiedAuth: ['phone'], users: statistics_data.users.login_methods.phone },
          { verifiedAuth: ['email'], users: statistics_data.users.login_methods.email },
          { verifiedAuth: ['unverified phone', 'unverified email'], users: statistics_data.users.login_methods.inactive_email_phone },
        ]"
      />
      <DashboardAnalyticsTable
        :head-items="{ payAverage: 'معدل شراء الطلبات', users: 'المستخدمين' }"
        :body-items="[
          { payAverage: '3+', users: statistics_data.users.purchase_rates.num_more_than_3_orders },
          { payAverage: '3', users: statistics_data.users.purchase_rates.num_3_orders },
          { payAverage: '2', users: statistics_data.users.purchase_rates.num_2_orders },
          { payAverage: '1', users: statistics_data.users.purchase_rates.num_1_order },
          { payAverage: 'لم يشتري', users: statistics_data.users.purchase_rates.num_0_order },
        ]"
      />
      <DashboardAnalyticsTable
        :head-items="{ hour: 'وقت الشراء', orders: 'الطلبات' }"
        :body-items="[
          { hour: '12:00 ص', orders: statistics_data.orders.purchase_times[0].order_count },
          { hour: '1:00 ص', orders: statistics_data.orders.purchase_times[1].order_count },
          { hour: '2:00 ص', orders: statistics_data.orders.purchase_times[2].order_count },
          { hour: '3:00 ص', orders: statistics_data.orders.purchase_times[3].order_count },
          { hour: '4:00 ص', orders: statistics_data.orders.purchase_times[4].order_count },
          { hour: '5:00 ص', orders: statistics_data.orders.purchase_times[5].order_count },
          { hour: '6:00 ص', orders: statistics_data.orders.purchase_times[6].order_count },
          { hour: '7:00 ص', orders: statistics_data.orders.purchase_times[7].order_count },
          { hour: '8:00 ص', orders: statistics_data.orders.purchase_times[8].order_count },
          { hour: '9:00 ص', orders: statistics_data.orders.purchase_times[9].order_count },
          { hour: '10:00 ص', orders: statistics_data.orders.purchase_times[10].order_count },
          { hour: '11:00 ص', orders: statistics_data.orders.purchase_times[11].order_count },
          { hour: '12:00 م', orders: statistics_data.orders.purchase_times[12].order_count },
          { hour: '1:00 م', orders: statistics_data.orders.purchase_times[13].order_count },
          { hour: '2:00 م', orders: statistics_data.orders.purchase_times[14].order_count },
          { hour: '3:00 م', orders: statistics_data.orders.purchase_times[15].order_count },
          { hour: '4:00 م', orders: statistics_data.orders.purchase_times[16].order_count },
          { hour: '5:00 م', orders: statistics_data.orders.purchase_times[17].order_count },
          { hour: '6:00 م', orders: statistics_data.orders.purchase_times[18].order_count },
          { hour: '7:00 م', orders: statistics_data.orders.purchase_times[19].order_count },
          { hour: '8:00 م', orders: statistics_data.orders.purchase_times[20].order_count },
          { hour: '9:00 م', orders: statistics_data.orders.purchase_times[21].order_count },
          { hour: '10:00 م', orders: statistics_data.orders.purchase_times[22].order_count },
          { hour: '11:00 م', orders: statistics_data.orders.purchase_times[23].order_count },
        ]"
      />
      <DashboardAnalyticsTable
        :head-items="{ buyer__first_name: 'المشتري', service__seller__first_name: 'معبر', order_item_count: 'الطلبات' }"
        :body-items="statistics_data.orders.repeated_orders || []"
      />
    </div>
  </template>
</template>

<script setup lang="ts">
import { useDashboardStatisticsStore } from "~/stores/dashboard/dashboardStatistics";
const { statistics_data, loading, filters } = storeToRefs(useDashboardStatisticsStore());
const { fetchAll } = useDashboardStatisticsStore();
let cards = ref<[]>([]);
fetchAll();
watch(loading, (newValue) => {
  if (!newValue) {
    cards.value = [
      {
        title: "طلبات المعبرين",
        count: statistics_data.value?.services?.count,
        subtitle: "حاليا",
        iconBackgroundClass:
          "bg-yellow-500/10 text-yellow-800 flex h-10 is-squircle items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z' clip-rule='evenodd'></path><path d='M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z'></path>",
      },
      {
        title: "تذكرة المساعدات",
        count: statistics_data.value.help_tickets,
        subtitle: "هذا الشهر",
        iconBackgroundClass:
          "bg-yellow-500/10 text-yellow-800 flex h-10 items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z' clip-rule='evenodd'></path><path fill-rule='evenodd' d='M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zm9.586 4.594a.75.75 0 00-1.172-.938l-2.476 3.096-.908-.907a.75.75 0 00-1.06 1.06l1.5 1.5a.75.75 0 001.116-.062l3-3.75z' clip-rule='evenodd'></path>",
      },
      {
        title: "المستخدمين",
        count: statistics_data.value.users?.count,
        subtitle: "هذا الشهر",
        iconBackgroundClass:
          "bg-yellow-500/10 text-yellow-800 flex h-10 items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z' clip-rule='evenodd'></path><path d='M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z'></path>",
      },
      {
        title: "التحويلات الماليه",
        count: statistics_data.value.financial?.transactions_total,
        subtitle: "ريال",
        iconBackgroundClass:
          "bg-yellow-600/10 text-yellow-800 flex h-10 items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M15.97 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 11-1.06-1.06l3.22-3.22H7.5a.75.75 0 010-1.5h11.69l-3.22-3.22a.75.75 0 010-1.06zm-7.94 9a.75.75 0 010 1.06l-3.22 3.22H16.5a.75.75 0 010 1.5H4.81l3.22 3.22a.75.75 0 11-1.06 1.06l-4.5-4.5a.75.75 0 010-1.06l4.5-4.5a.75.75 0 011.06 0z' clip-rule='evenodd'></path>",
      },
      {
        title: "رسوم البطاقة",
        count: statistics_data.value.financial?.card_tax,
        subtitle: "ريال",
        iconBackgroundClass:
          "bg-yellow-600/10 text-yellow-800 flex h-10 items-center justify-center w-10",
        icon: "<path d='M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z'></path><path fill-rule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z' clip-rule='evenodd'></path>",
      },
      {
        title: "رسوم الموقع",
        count: statistics_data.value.financial?.site_tax,
        subtitle: "ريال",
        iconBackgroundClass:
          "bg-yellow-600/10 text-yellow-800 flex h-10 items-center justify-center w-10",
        icon: "<path d='M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z'></path><path fill-rule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z' clip-rule='evenodd'></path>",
      },
      {
        title: "القيمة المضافة",
        count: statistics_data.value.financial?.vat,
        subtitle: "ريال",
        iconBackgroundClass:
          "bg-green-600/10 text-green-800 flex h-10 items-center justify-center w-10",
        icon: "<path d='M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z'></path><path fill-rule='evenodd' d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z' clip-rule='evenodd'></path>",
      },
      {
        title: "جميع الطلبات",
        count: statistics_data.value.orders?.total,
        subtitle: "حاليا",
        iconBackgroundClass:
          "bg-green-600/10 text-green-800 flex h-10 items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z' clip-rule='evenodd'></path><path d='M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z'></path>",
      },
      {
        title: "الطلبات المنفذة",
        count: statistics_data.value.orders?.completed,
        subtitle: "حاليا",
        iconBackgroundClass:
          "bg-green-600/10 text-green-800 flex h-10 items-center justify-center w-10",
        icon: "<path fill-rule='evenodd' d='M2.25 4.125c0-1.036.84-1.875 1.875-1.875h5.25c1.036 0 1.875.84 1.875 1.875V17.25a4.5 4.5 0 11-9 0V4.125zm4.5 14.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z' clip-rule='evenodd'></path><path d='M10.719 21.75h9.156c1.036 0 1.875-.84 1.875-1.875v-5.25c0-1.036-.84-1.875-1.875-1.875h-.14l-8.742 8.743c-.09.089-.18.175-.274.257zM12.738 17.625l6.474-6.474a1.875 1.875 0 000-2.651L15.5 4.787a1.875 1.875 0 00-2.651 0l-.1.099V17.25c0 .126-.003.251-.01.375z'></path>",
      },
      {
        title: "الطلبات المستعجلة",
        count: statistics_data.value.orders?.urgent,
        subtitle: "حاليا",
        iconBackgroundClass:
          "bg-red-600/10 text-red-800 flex h-10 items-center justify-center w-10",
        icon: "<path stroke-linecap='round' stroke-linejoin='round' d='M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z'></path><path stroke-linecap='round' stroke-linejoin='round' d='M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z'></path>",
      },
      {
        title: "الطلبات المتعددة",
        count: statistics_data.value.orders?.multiple,
        subtitle: "حاليا",
        iconBackgroundClass:
          "bg-green-600/10 text-green-800 flex h-10 items-center justify-center w-10",
        icon: "<path stroke-linecap='round' stroke-linejoin='round' d='M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3'></path>",
      },
      {
        title: "عمليات الشحن",
        count: statistics_data.value.financial?.recharges?.total,
        subtitle: "ريال",
        iconBackgroundClass:
          "bg-red-600/10 text-red-800 flex h-10 items-center justify-center w-10",
        icon: "<path d='M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z'></path>",
      },
      {
        title: "عدد عمليات الشحن",
        count: statistics_data.value.financial?.recharges?.count,
        subtitle: "عملية",
        iconBackgroundClass:
          "bg-red-600/10 text-red-800 flex h-10 items-center justify-center w-10",
        icon: "<path d='M2.273 5.625A4.483 4.483 0 015.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 3H5.25a3 3 0 00-2.977 2.625zM2.273 8.625A4.483 4.483 0 015.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0018.75 6H5.25a3 3 0 00-2.977 2.625zM5.25 9a3 3 0 00-3 3v6a3 3 0 003 3h13.5a3 3 0 003-3v-6a3 3 0 00-3-3H15a.75.75 0 00-.75.75 2.25 2.25 0 01-4.5 0A.75.75 0 009 9H5.25z'></path>",
      },

      // { title: '', count: 10, subtitle: '', iconBackgroundClass: '', icon: "" },
    ];
  }
});

const range_date = ref([filters.value.date_after, filters.value.date_before]);

watch(range_date, ([start, end]) => {
  filters.value.date_after = start;
  filters.value.date_before = end;
});
</script>

<style scoped>
::-webkit-scrollbar {
  /* Customize the scrollbar width */
  width: 10px;
}
::-webkit-scrollbar-thumb {
  /* Customize the scrollbar thumb */
  background-color: black;
}
</style>
