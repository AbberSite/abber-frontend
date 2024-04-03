<template>
    <template v-if="order?.id">
        <div
            class="grid w-full gap-x-8 gap-y-14 pb-36 pt-16 sm:grid-cols-2 lg:hidden lg:grid-cols-3 px-1"
            >
            <div class="w-full space-y-4">
                <div class="text-sm font-semibold text-gray-500 xs:text-base">حالة الطلب</div>
                <OrderStatus :status="order?.status" />
            </div>
            <div class="w-full space-y-4">
                <div class="text-sm font-semibold text-gray-500 xs:text-base">نوع الطلب</div>
                <div class="font-semibold">
                    {{ order?.type == 'text_communication' ? 'محادثة نصية' : 'محادثة صوتية' }}
                </div>
            </div>
            <div class="w-full space-y-4">
                <div class="text-sm font-semibold text-gray-500 xs:text-base">تأريخ الشراء</div>
                <div class="font-semibold">
                    {{ useFormattedDate(order?.order_item_time_data.ordered_date) }}
                </div>
            </div>
            <div class="w-full space-y-4">
                <div class="text-sm font-semibold text-gray-500 xs:text-base">العميل</div>
                <div class="flex">
                    <div class="flex-shrink-0">
                        <img
                            class="lazyload h-11 w-11 rounded-full bg-gray-100"
                            src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTk4IiBoZWlnaHQ9IjE5OCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4="
                            :data-src="order?.buyer?.first_name ?? 'test'"
                            height="44"
                            width="44"
                            alt="" />
                    </div>
                    <div class="space-y-3">
                        <div class="ms-3 pt-1 text-sm font-semibold">
                            <div>
                                {{ order?.buyer?.first_name }}
                            </div>
                        </div>
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
