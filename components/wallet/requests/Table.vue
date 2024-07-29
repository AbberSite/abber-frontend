<template>
    <div class="is-scroll w-full overflow-x-auto pt-6">
        <table class="w-full text-sm ltr:text-left rtl:text-right">
            <thead class="border-b border-t">
                <tr>
                    <RequestsTableHeaderCol content="الرقم" />
                    <RequestsTableHeaderCol content="المبلغ" />
                    <RequestsTableHeaderCol content="النوع" />
                    <RequestsTableHeaderCol content="الحالة" />
                    <RequestsTableHeaderCol content="التاريخ" order="date" />
                    <RequestsTableHeaderCol content="تم التحويل" />
                    <RequestsTableHeaderCol content="سبب الرفض" />
                    <!-- <RequestsTableHeaderCol content="الإيصال" /> -->
                    <!-- <TicketsTableHeaderCol /> -->
                </tr>
            </thead>
            <tbody class="divide-y">
                <tr v-for="request of requests" >
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.id}}</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.amount}} ر.س</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.type}}</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.status}}</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{ useArabicFormattedDate(request.date)}}</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.paid ? 'نعم': 'لا'}}</div></td>
                <td class="whitespace-nowrap pb-4 pe-12 pt-6 font-medium"><div>{{request.refuse_reason == null || request.refuse_reason === 'null' ? '-': request.refuse_reason}}</div></td>
                </tr> 
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import type { withdrawalRequest } from '~/types';
import RequestsTableHeaderCol from './RequestsTableHeaderCol.vue';

defineProps<{
    requests: withdrawalRequest[]
}>();
</script>