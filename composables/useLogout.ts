export default async ()=> {
    const {signOut} = useAuth()
    const router = useRouter();
    await router.push("/accounts/whatsapp/login");
    await signOut({ callbackUrl: '/accounts/whatsapp/login', redirect: true });
    // localStorage.clear();
    sessionStorage.clear();
    useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
}