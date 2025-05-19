<template>

    <DashboardDateFilters />

    <div class="pt-4 sm:pt-0 flex space-x-6 sm:space-x-0 sm:justify-between">
        <div>
            <h3 class="text-sm font-medium">حالة الطلب</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        v-model="filters.status" value="new" id="new" />
                    <label class="mt-1.5 ps-3 text-sm" for="new">جديد</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        value="in_progress" v-model="filters.status" name="checkbox" id="in_progress" />
                    <label class="mt-1.5 ps-3 text-sm" for="in_progress">قيد التنفيذ</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" v-model="filters.status"
                        type="checkbox" name="checkbox" value="cancelled" id="cancelled" />
                    <label class="mt-1.5 ps-3 text-sm" for="cancelled">ملغاة</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.status" name="checkbox" value="awaiting_delivery" id="awaiting_delivery" />
                    <label class="mt-1.5 ps-3 text-sm" for="awaiting_delivery">بإنتظار الإستلام</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox" name="checkbox"
                        v-model="filters.status" value="complete" id="complete" />
                    <label class="mt-1.5 ps-3 text-sm" for="complete">مكتمل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.status" name="checkbox" value="waiting_for_cancellation"
                        id="waiting_for_cancellation" />
                    <label class="mt-1.5 ps-3 text-sm" for="waiting_for_cancellation">بإنتظار
                        الإلغاء</label>
                </div>
            </div>
            <h3 class="text-sm font-medium mt-4">وسيلة الدفع</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value=""
                        id="payment_all" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_all">الكل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="VISA"
                        id="payment_visa" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_visa">Visa</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="MASTER"
                        id="payment_master" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_master">Master</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="MADA"
                        id="payment_mada" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_mada">مدى</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="APPLEPAY"
                        id="payment_applepay" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_applepay">Apple Pay</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="BALANCE"
                        id="payment_balance" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_balance">المحفظة</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="radio"
                        v-model="filters.payment_method"
                        value="STC_PAY"
                        id="payment_stc_pay" />
                    <label class="mt-1.5 ps-3 text-sm" for="payment_stc_pay">STC Pay</label>
                </div>
                <!-- Add more payment methods as needed -->
            </div>
        </div>
        <div>
            <h3 class="text-sm font-medium">نوع الطلب</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input v-model="filters.type.voice" class="h-5 w-5 flex-shrink-0 appearance-none rounded border"
                        type="checkbox" name="checkbox" id="voice" />
                    <label class="mt-1.5 ps-3 text-sm" for="voice">محادثة صوتية</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="checkbox"
                        v-model="filters.type.text" name="checkbox" id="text" />
                    <label class="mt-1.5 ps-3 text-sm" for="text">محادثة نصية</label>
                </div>
            </div>
            <h3 class="text-sm font-medium mt-4">الجودة</h3>

            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <DashboardInputsTrueFalseNullCheckbox v-model="filters.quality" class="h-5 w-5 flex-shrink-0 " id="quality" />
                    <label class="mt-1.5 ps-3 text-sm" for="quality">تم التقديم بنجاح</label>
                </div>
                
            </div>
            <h3 class="text-sm font-medium mt-4">المنصة</h3>
            <div class="space-y-3 pt-4">
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="" id="all" />
                    <label class="mt-1.5 ps-3 text-sm" for="all">الكل</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="abber" id="abber" />
                    <label class="mt-1.5 ps-3 text-sm" for="abber">عبر</label>
                </div>
                <div class="flex items-center">
                    <input class="h-5 w-5 flex-shrink-0 appearance-none rounded border" type="radio"
                        v-model="filters.app_source" value="manam" id="manam" />
                    <label class="mt-1.5 ps-3 text-sm" for="manam">منام</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { useDashboardOrdersStore } from '~/stores/dashboard/dashboardOrders';

const { filters } = storeToRefs(useDashboardOrdersStore());
</script>