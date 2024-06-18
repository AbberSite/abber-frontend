export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path.includes('dashboardv2')) {

    setPageLayout('dashboard')
  } 
})
