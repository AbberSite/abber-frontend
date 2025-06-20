export default defineNuxtRouteMiddleware((to, from) => {
  const {data} = useAuth();
  
  if (to.path.includes('dashboardv2')) {
    if (!data.value) {
      return navigateTo('/accounts/login/');
    }
    setPageLayout('dashboard');
    if(data.value?.user_type != 'إدارة') return navigateTo('/');
  } 
})
