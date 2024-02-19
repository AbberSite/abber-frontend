<template>
    <table class="w-full text-sm ltr:text-left rtl:text-right">
        <thead class="border-b border-t">
                <tr>
                
                <WalletSharedTableHeaderCol content="المعاملة"  />

                <WalletSharedTableHeaderCol content="وسيلة الدفع"  />

          
                <WalletSharedTableHeaderCol content="نوع المعاملة"  />

                
                <WalletSharedTableHeaderCol content="دائن"  />

                <WalletSharedTableHeaderCol content="مدين"  />


                <WalletSharedTableHeaderCol content="الرصيد"  />

                    

                <WalletSharedTableHeaderCol content="التأريخ" order="date"  />
                </tr>

        </thead>
        <tbody class="divide-y">
            <WalletStatementsRow 
                v-for="transaction in transactions"
                :key="transaction.id"
                :transaction="transaction" />
        </tbody>
    </table>
</template>

<script setup lang="ts">
import type { Transaction } from '~/types';

defineProps<{
    transactions: Transaction[];
}>();
</script>

<style scoped></style>
