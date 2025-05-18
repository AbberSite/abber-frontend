<template>
  <div class="w-full gap-8 space-y-8 md:grid md:grid-cols-2 md:space-y-0">
    <div class="h-fitrounded-lg border border-gray-100 py-6">
      <div class="px-6 font-medium xs:text-lg">تفاصيل الطلب</div>
      <!-- Skeleton -->
      <div class="pre-alpine-content px-6 pt-6" v-if="loading">
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="py-6 font-medium xs:text-lg">المعبر</div>
        <div class="flex animate-pulse">
          <div class="h-11 w-11 flex-shrink-0 rounded-full bg-gray-100"></div>
          <div class="ms-3 w-full pt-2">
            <div class="flex w-full flex-col space-y-4">
              <div class="h-2 w-[35%] rounded-full bg-gray-200"></div>
              <div class="h-2 w-[35%] rounded-full bg-gray-200"></div>
            </div>
            <div class="space-y-4 pt-6">
              <p class="h-2 rounded-full bg-gray-200"></p>
              <p class="h-2 rounded-full bg-gray-200"></p>
              <p class="h-2 rounded-full bg-gray-200"></p>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="px-6 pt-6">
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">حالة الطلب</div>
            <OrderStatus :status="order.status" />
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">حالة المستحقات</div>
            <div v-if="order.order_item_financial_data?.available_balance" class="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 pb-1 pt-1 text-xs font-medium text-gray-600 rtl:space-x-reverse">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
              ><span>مكتمل</span>
            </div>
            <div v-else class="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-3 pb-1 pt-1 text-xs font-medium text-yellow-800 rtl:space-x-reverse">
              <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path></svg
              ><span>معلقة</span>
            </div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">نوع الطلب</div>
            <div class="font-medium">{{ order?.type == "text_communication" ? "محادثة نصية" : "محادثة صوتية" }}</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">المنصة</div>
            <div class="flex items-center font-medium">
              <template v-if="order?.content?.platform === 'iOS'">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
<path d="M 44.527344 34.75 C 43.449219 37.144531 42.929688 38.214844 41.542969 40.328125 C 39.601563 43.28125 36.863281 46.96875 33.480469 46.992188 C 30.46875 47.019531 29.691406 45.027344 25.601563 45.0625 C 21.515625 45.082031 20.664063 47.03125 17.648438 47 C 14.261719 46.96875 11.671875 43.648438 9.730469 40.699219 C 4.300781 32.429688 3.726563 22.734375 7.082031 17.578125 C 9.457031 13.921875 13.210938 11.773438 16.738281 11.773438 C 20.332031 11.773438 22.589844 13.746094 25.558594 13.746094 C 28.441406 13.746094 30.195313 11.769531 34.351563 11.769531 C 37.492188 11.769531 40.8125 13.480469 43.1875 16.433594 C 35.421875 20.691406 36.683594 31.78125 44.527344 34.75 Z M 31.195313 8.46875 C 32.707031 6.527344 33.855469 3.789063 33.4375 1 C 30.972656 1.167969 28.089844 2.742188 26.40625 4.78125 C 24.878906 6.640625 23.613281 9.398438 24.105469 12.066406 C 26.796875 12.152344 29.582031 10.546875 31.195313 8.46875 Z"></path>
</svg>
              </template>
                <template v-else-if="order?.content?.platform === 'Android'">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 48 48">
<path fill="#30dc80" d="M24,14.088C11.427,14.088,1.108,23.716,0,36h48C46.892,23.716,36.573,14.088,24,14.088z M33.179,27.079c0-1.104,0.895-1.999,1.999-1.999c1.104,0,1.999,0.895,1.999,1.999c0,1.104-0.895,1.999-1.999,1.999	C34.074,29.078,33.179,28.183,33.179,27.079z M12.822,29.078c-1.104,0-1.999-0.895-1.999-1.999c0-1.104,0.895-1.999,1.999-1.999	s1.999,0.895,1.999,1.999C14.821,28.183,13.926,29.078,12.822,29.078z"></path><path fill="#30dc80" d="M34.038,19.313c-0.14,0-0.281-0.035-0.41-0.11c-0.393-0.227-0.527-0.729-0.301-1.122l5.197-9.008	c0.227-0.394,0.729-0.529,1.122-0.301c0.393,0.227,0.527,0.729,0.301,1.122l-5.197,9.008C34.598,19.166,34.322,19.313,34.038,19.313	z"></path><path fill="#30dc80" d="M13.962,19.313c-0.284,0-0.56-0.148-0.712-0.411L8.054,9.894C7.827,9.501,7.962,8.999,8.354,8.772	c0.392-0.228,0.895-0.093,1.122,0.301l5.197,9.008c0.227,0.394,0.092,0.896-0.301,1.122C14.243,19.278,14.102,19.313,13.962,19.313z"></path>
</svg>
              </template>
              <template v-else-if="order?.content?.platform === 'Website'">
                <img width="30" height="30" src="data:image/png;base64,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" alt="domain">
              </template>
              <template v-else>
                <span>{{ order?.content?.platform }}</span>
              </template>
            </div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">وسيلة الشراء</div>
            <DashboardTablesCellsPaymentMethod :method="order?.order_item_financial_data?.payment_method" />
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">تأريخ الشراء</div>
            <div class="font-medium">{{ useArabicFormattedDate(order.order_item_time_data?.ordered_date) }}</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">تأريخ إكمال الطلب</div>
            <div class="font-medium">{{ order?.status != "complete" ? "لم يكتمل بعد" : useArabicFormattedDate(order?.order_item_time_data?.complete_date) }}</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">تم تسليم الطلب بشكل صحيح</div>
            <div class="font-medium text-green-500">
              <svg v-if="order?.content?.well_provided" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
            </div>
          </div>

          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">تحويل الطلب</div>
            <div class="font-medium">
              <svg v-if="order?.content?.transfer_order" class="text-green-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              <svg v-else class="text-red-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
          </div>

          <div class="py-6 font-medium xs:text-lg">العميل</div>
          <div class="flex">
            <div class="flex-shrink-0"><img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="order?.buyer?.image" height="44" width="44" alt="" /></div>
            <div class="flex mr-2 items-center">
              <NuxtLink class="font-medium text-sm hover:text-blue-600" :to="`/dashboardv2/accounts/users/user-update/${order?.buyer?.id}/`">{{ order.buyer?.first_name }}</NuxtLink>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="h-fitrounded-lg border border-gray-100 py-6">
      <div class="px-6 font-medium xs:text-lg">رسوم الطلب</div>
      <!-- Skeleton -->
      <div class="pre-alpine-content px-6 pt-6" v-if="loading">
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="flex animate-pulse items-center justify-between py-4"><span class="h-2 w-[35%] rounded-full bg-gray-200"></span><span class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
        <div class="py-6 font-medium xs:text-lg">المعبر</div>
        <div class="flex animate-pulse">
          <div class="h-11 w-11 flex-shrink-0 rounded-full bg-gray-100"></div>
          <div class="ms-3 w-full pt-2">
            <div class="flex w-full flex-col space-y-4">
              <div class="h-2 w-[35%] rounded-full bg-gray-200"></div>
              <div class="h-2 w-[35%] rounded-full bg-gray-200"></div>
            </div>
            <div class="space-y-4 pt-6">
              <p class="h-2 rounded-full bg-gray-200"></p>
              <p class="h-2 rounded-full bg-gray-200"></p>
              <p class="h-2 rounded-full bg-gray-200"></p>
            </div>
          </div>
        </div>
      </div>
      <template v-else>
        <div class="px-6 pt-6">
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">سعر الخدمة</div>
            <div class="font-medium">{{ order.order_item_financial_data?.price }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">سعر الخصم</div>
            <div class="font-medium">{{ order.order_item_financial_data?.coupon_amount }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">رسوم الموقع (المعبر)</div>
            <div class="font-medium">{{ order.order_item_financial_data?.fixed_seller_site_tax }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">رسوم الموقع (المشتري)</div>
            <div class="font-medium">{{ order.order_item_financial_data?.fixed_buyer_site_tax }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">ضريبة القيمة المضافة</div>
            <div class="font-medium">{{ 0.0 }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">اجمالي الضريبة</div>
            <div class="font-medium">{{ order.order_item_financial_data?.fixed_tax }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">رسوم البطاقة</div>
            <div class="font-medium">{{ order.order_item_financial_data?.fixed_card_tax }} ر.س</div>
          </div>
          <div class="flex items-center justify-between py-4">
            <div class="font-medium text-gray-500">أرباح المعبر</div>
            <div class="font-medium">{{ order.order_item_financial_data?.expressor_profits }} ر.س</div>
          </div>
          <div class="py-6 font-medium xs:text-lg">المعبر</div>
          <div class="flex">
            <div class="flex-shrink-0"><img class="lazyload h-11 w-11 rounded-full bg-gray-100" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=" :data-src="order?.seller?.image" height="44" width="44" alt="" /></div>
            <div class="flex mr-2 items-center">
              <h1 class="font-medium text-sm">{{ order.seller?.first_name }}</h1>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDashboardOrdersStore } from "~/stores/dashboard/dashboardOrders";

const { loading, order } = storeToRefs(useDashboardOrdersStore());
</script>
