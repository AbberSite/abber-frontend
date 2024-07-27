<template>
    <div class="px-6 pt-6">
        
        <div class="flex items-center justify-between py-4" v-if="data.user_type == 'إدارة'">
            <div class="font-semibold text-gray-500">العميل</div>
            <NuxtLink class="font-semibold text-blue-500" :to="`/accounts/dashboard/user-update/${order?.buyer.id}/#tab0`">
                {{ order?.buyer.first_name }}
            </NuxtLink>
        </div>

        <div class="flex items-center justify-between py-4">
            <div class="font-semibold text-gray-500">حالة الطلب</div>
            <OrderStatus :status="order?.status" />
        </div>
        <div class="flex items-center justify-between py-4">
            <div class="font-semibold text-gray-500">نوع الطلب</div>
            <div class="font-semibold">
                {{ order?.type == 'text_communication' ? 'محادثة نصية' : 'محادثة صوتية' }}
            </div>
        </div>
        <!-- <div class="flex items-center justify-between py-4">
            <div class="font-semibold text-gray-500">تأريخ الشراء</div>
            <div class="font-semibold">
                {{ useFormattedDate(order?.order_item_time_data.ordered_date) }}
            </div>
        </div> -->
        <div class="py-6 font-semibold xs:text-lg">المعبر</div>
        <div class="flex">
            <div class="flex-shrink-0">
                <img
                    class="lazyload h-11 w-11 rounded-full bg-gray-100" :src="order?.seller?.image ?? 'something'"
                    height="44"
                    width="44"
                    alt="" />
            </div>
            <div class="space-y-3">
                <div class="ms-3 pt-1 text-sm font-semibold">
                    <div>{{ order?.seller?.first_name }}</div>
                    <div class="mt-1.5 flex items-center pb-2 text-yellow-400">
                        <svg
                            class="flex-shrink-0"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            v-for="i in  Math.floor(order?.service_details?.rate ?? 0 as number)"
                            fill="currentColor"
                            aria-hidden="true"
                            height="16"
                            width="16">
                            <path
                                fill-rule="evenodd"
                                d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="ms-1.5 text-xs font-medium text-gray-600">({{ order?.service_details?.ordered_count }})</span>
                    </div>
                </div>
                <!-- <div class="ms-3 text-justify text-[13px] leading-loose text-gray-700">
                    {{ order?.service_details?.seller.about }}
                </div> -->
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const { order } = storeToRefs(useOrdersStore());
const { data} = useAuth();
</script>

<style scoped></style>
