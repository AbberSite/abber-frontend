<template>
    <template v-if="order?.id">
        <div class="px-6 pt-6">
        
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
            <div class="flex items-center justify-between py-4">
                <div class="font-semibold text-gray-500">تأريخ الشراء</div>
                <div class="font-semibold">
                    {{ useFormattedDate(order?.order_item_time_data.ordered_date) }}
                </div>
            </div>
            <div class="py-6 font-semibold xs:text-lg">المعبر</div>
            <div class="flex">
                <div class="flex-shrink-0">
                    <NuxtImg
                        loading="lazy"
                        class="lazyload h-11 w-11 rounded-full bg-gray-100"
                        :src="order?.buyer?.image ?? 'something'"
                        height="44"
                        width="44"
                        alt="" />
                </div>
                <div class="space-y-3">
                    <div class="ms-3 pt-1 text-sm font-semibold">
                        <div>{{ order?.buyer?.first_name }}</div>
                        
                    </div>
                </div>
            </div>
        </div>
    </template>

    <template v-else>
        <div class="text-center my-14">
            لا يوجد عميل داخل المقابلة الان
        </div>
    </template>

</template>
<script setup lang="ts">
const { order } = storeToRefs(useOrdersStore());

</script>

<style scoped></style>
