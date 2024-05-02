
export default defineNuxtRouteMiddleware((to, from) => {

    const { data, status } = useAuthState()
    
    // console.log(document.cookie);
    if(status.value !== "authenticated"){ 

        return true

    }
    if(!data.value.email_verified){

        console.log("unverified")
        navigateTo("/blog")

    }

});
