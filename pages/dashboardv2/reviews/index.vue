<template>
  <DashTitle department="الإحصائيات" title="التقييمات"/>
  <DashTablesTable :head-items="{first_name: 'المستخدم', registration: 'التسجيل', payment: 'الدفع', support: 'الدعم', findExpressors: 'العثور على معبر', reused: 'إعادة الاستخدام', nominations: 'ترشيح الاخرين', comment: 'التعليق'}" :body-items="reviews"/>
</template>


<script setup lang="ts">
    const reviews = ref([
    {
        first_name: 'الشيخ',
        registration: '5',
        payment: '4',
        support: '5',
        findExpressors: '5',
        reused: true,
        nominations: true,
        comment: 'انصح بتطويره بشكل افضل من الان'
    },
    {
        first_name: 'أحمد',
        registration: '4',
        payment: '4',
        support: '4',
        findExpressors: '4',
        reused: false,
        nominations: true,
        comment: 'تجربة جيدة بشكل عام'
    },
    {
        first_name: 'خالد',
        registration: '5',
        payment: '5',
        support: '5',
        findExpressors: '4',
        reused: false,
        nominations: false,
        comment: 'تجربة تحتاج لتحسينات'
    },
    {
        first_name: 'سعيد',
        registration: '5',
        payment: '5',
        support: '5',
        findExpressors: '5',
        reused: true,
        nominations: true,
        comment: 'أفضل تجربة حصلت عليها'
    }
]);

</script>