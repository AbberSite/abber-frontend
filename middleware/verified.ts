
export default defineNuxtRouteMiddleware(async(to, from) => {

    const { data, status } = useAuthState();

    if(status.value !== "authenticated"){ 
        return true

    }
    if(!data.value.email_verified){

        console.log("unverified")
        navigateTo("/blog")

    }

});
