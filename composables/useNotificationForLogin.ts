export default async (redirect: boolean = false) => {
    const { data } = useAuthState();
    if (redirect) {
        if (data.value.user_type == 'معبر')
            navigateTo({ name: 'orders' });
        else
            navigateTo({ name: 'index' });
    }
    useNotification({ type: 'success', content: `لقد سجلت الدخول بنجاح يا ${data.value.first_name} !` })
}