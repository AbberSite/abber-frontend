export default async ()=> {
    const {signOut} = useAuth()
    const router = useRouter();
    await router.push("/accounts/sms");
    await signOut({ callbackUrl: '/accounts/sms', redirect: true });
    useNotification({ type: 'success', content: 'تم تسجيل الخروج بنجاح' });
}