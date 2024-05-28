export default async (redirect: boolean = false, isRegister: boolean = false) => {
    const { data } = useAuthState();
    if (redirect) {
        if (data.value.user_type == 'معبر')
            navigateTo({ name: 'orders' });
        else
            navigateTo({ name: 'index' });
    }
    if(isRegister)
        useNotification({ type: 'success', content: `لقد تم انشاء حسابك بنجاح يا ${data.value.first_name}!` })
    else
        useNotification({ type: 'success', content: `لقد سجلت الدخول بنجاح يا ${data.value.first_name} !` })
}