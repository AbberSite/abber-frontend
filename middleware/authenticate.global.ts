export default defineNuxtRouteMiddleware(async (to, from) => {
    // const { data, status } = useAuthState()

    // if(process.client){

    //     const { rawRefreshToken, status } = useAuthState();
    //     const { refresh } = useAuth();
    //     if (rawRefreshToken.value && status.value == 'unauthenticated') {
    //         await refresh();
    //     }

    // }


    // if(status.value !== "authenticated"){

    //     return true

    // }

    // if(!data.value.email_verified){

    //     console.log("unverified")
    //     navigateTo("/blog")

    // }
    // console.log(`the dicide: ${useCookie('auth:token').value == undefined && useCookie('auth:refresh-token').value != undefined}`)
    // console.log(`auth:token : ${useCookie('auth:token').value}`)
    // console.log(`auth:refreshToken : ${useCookie('auth:refresh-token').value}`)
    
    // const { refresh, getSession, data } = await useAuth();
    // console.log(`my status is : ${status.value} - ${new Date()}`)
    // if (useCookie('auth:token').value == undefined && useCookie('auth:refresh-token').value != undefined) {
        // await refresh();
        // await getSession();
    // } 
    // console.log(data.value);

    // console.log("Shiekh global middleware");
});
