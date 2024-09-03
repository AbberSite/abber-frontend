export default async ()=> {
    const {signOut} = useAuth()
    const router = useRouter();
    await router.push("/accounts/sms");
    await signOut({ callbackUrl: '/accounts/sms', redirect: true });
    // localStorage.clear();
    sessionStorage.clear();
    useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
}