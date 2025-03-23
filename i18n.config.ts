export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'ar',
    messages: {
        ar: {
            withdrawal: 'المبلغ المسحوب',
            1: 'قيد المراجعة', 
            2: 'تم',
            3: 'مرفوض',
            credit: 'دائن',
            debit: 'مدين',
            less_than_half_hour: 'أقل من نصف ساعة',
            '1_hour': 'ساعة واحدة',
            '2_hour': 'ساعتان',
            '3_hour': 'ثلاث ساعات',
            '4_hour': 'أربع ساعات'
        }
    }
}));