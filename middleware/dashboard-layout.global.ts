export default defineNuxtRouteMiddleware((to, from) => {
  const {data} = useAuth();
  if (to.path.includes('dashboardv2')) {
    setPageLayout('dashboard');
    if(data.value?.user_type != 'إدارة') return navigateTo('/');
  } 
})
