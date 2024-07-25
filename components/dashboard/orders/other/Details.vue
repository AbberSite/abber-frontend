<template>
    <div class="w-full gap-8 space-y-8 md:grid md:grid-cols-2 md:space-y-0">
        <div class="h-fitrounded-lg border border-gray-100 py-6">
            <div class="px-6 font-semibold xs:text-lg">تفاصيل الطلب</div>
            <!-- Skeleton -->
            <div class="pre-alpine-content px-6 pt-6" v-if="loading">
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="py-6 font-semibold xs:text-lg">المعبر</div>
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
                        <div class="font-semibold text-gray-500">حالة الطلب</div>
                        <OrderStatus :status="order.status" />
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">حالة المستحقات</div>
                        <div v-if="order.order_item_financial_data?.available_balance"
                            class="inline-flex items-center space-x-1 rounded-full bg-gray-100 px-3 pb-1 pt-1 text-xs font-medium text-gray-800 rtl:space-x-reverse">
                            <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg><span class="pt-1">مكتمل</span>
                        </div>
                        <div v-else
                            class="inline-flex items-center space-x-1 rounded-full bg-yellow-100 px-3 pb-1 pt-1 text-xs font-medium text-yellow-800 rtl:space-x-reverse">
                            <svg class="flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" height="14" width="14">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path>
                            </svg><span class="pt-1">معلقة</span>
                        </div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">نوع الطلب</div>
                        <div class="font-semibold">{{ order?.type == 'text_communication' ? 'محادثة نصية' : 'محادثة صوتية' }}</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">المنصة</div>
                        <div class="font-semibold">{{ order?.content?.platform }}</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">وسيلة الشراء</div>
                        <div class="font-semibold">{{ order?.order_item_financial_data?.payment_method }}</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">تأريخ الشراء</div>
                        <div class="font-semibold">{{ useArabicFormattedDate(order.order_item_time_data?.ordered_date) }}</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">تأريخ إكمال الطلب</div>
                        <div class="font-semibold">{{ order?.status != 'complete' ? 'لم يكتمل بعد' : useArabicFormattedDate(order?.order_item_time_data?.complete_date) }}</div>
                    </div>
                    <div class="py-6 font-semibold xs:text-lg">المعبر</div>
                    <div class="flex">
                        <div class="flex-shrink-0"><img class="lazyload h-11 w-11 rounded-full bg-gray-100"
                                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                :data-src="order?.seller?.image" height="44" width="44" alt="" /></div>
                        <div class="flex mr-2 items-center">
                            <h1 class="font-semibold text-sm">{{ order.seller?.first_name }}</h1>
                        </div>
                    </div>
                    <div class="py-6 font-semibold xs:text-lg">العميل</div>
                    <div class="flex">
                        <div class="flex-shrink-0"><img class="lazyload h-11 w-11 rounded-full bg-gray-100"
                                src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                                :data-src="order?.buyer?.image" height="44" width="44" alt="" /></div>
                        <div class="flex mr-2 items-center">
                            <NuxtLink class="font-semibold text-sm hover:text-blue-600" :to="`/accounts/dashboard/user-update/${order?.buyer?.id}/#tab0`">{{ order.buyer?.first_name }}</NuxtLink>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="h-fitrounded-lg border border-gray-100 py-6">
            <div class="px-6 font-semibold xs:text-lg">رسوم الطلب</div>
            <!-- Skeleton -->
            <div class="pre-alpine-content px-6 pt-6" v-if="loading">
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="flex animate-pulse items-center justify-between py-4"><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span><span
                        class="h-2 w-[35%] rounded-full bg-gray-200"></span></div>
                <div class="py-6 font-semibold xs:text-lg">المعبر</div>
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
                        <div class="font-semibold text-gray-500">سعر الخدمة</div>
                        <div class="font-semibold">{{ order.order_item_financial_data?.price}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">سعر الخصم</div>
                        <div class="font-semibold">{{order.order_item_financial_data?.coupon_amount}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">رسوم الموقع (المعبر)</div>
                        <div class="font-semibold">{{order.order_item_financial_data?.fixed_seller_site_tax}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">رسوم الموقع (المشتري)</div>
                        <div class="font-semibold">{{order.order_item_financial_data?.fixed_buyer_site_tax}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">ضريبة القيمة المضافة</div>
                        <div class="font-semibold">{{0.00}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">اجمالي الضريبة</div>
                        <div class="font-semibold">{{order.order_item_financial_data?.fixed_tax}} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">
                        <div class="font-semibold text-gray-500">رسوم البطاقة</div>
                        <div class="font-semibold">{{ order.order_item_financial_data?.fixed_card_tax }} ر.س</div>
                    </div>
                    <div class="flex items-center justify-between py-4">       
                        <div class="font-semibold text-gray-500">أرباح المعبر</div>
                        <div class="font-semibold">{{order.order_item_financial_data?.expressor_profits}} ر.س</div>
                    </div>
                </div>
            </template>
        </div>

    </div>

</template>

<script setup lang="ts">
import { useDashboardOrdersStore } from '~/stores/dashboard/dashboardOrders';

const { loading, order } = storeToRefs(useDashboardOrdersStore())
</script>