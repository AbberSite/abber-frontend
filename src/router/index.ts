import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Index,
            meta : {
              title : "عبر - عالمك الخاص لتفسير الأحلام"
            }
        },
    ],
});

router.beforeEach((to, from, next) => {
  // Get the page title from the route meta data that we have defined
  // See further down below for how we setup this data
  const title = to.meta.title as string
// If the route has a title, set it as the page title of the document/page
  if (title) {
    document.title  = title
  }
  // Continue resolving the route
  next()
})
export default router;
