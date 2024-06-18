export default defineNuxtRouteMiddleware(async (to, from) => {
    const {data, status} = useAuthState();
    const router = useRouter();
    if(data.value?.user_type == 'إدارة') return true;
    else {
    //     navigateTo('/accounts/login/');
        console.log("you cannot access here")
        return false;
    }

});
