export default defineNuxtPlugin(() => {
  if (process.client) {
    // إعداد DataLayer
    window.dataLayer = window.dataLayer || [];
    
    // دالة gtag
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    
    // تحميل Google Analytics فوراً
    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-VTQ5KFZ69Y';
    document.head.appendChild(gaScript);
    
    // إعداد Google Analytics
    gtag('js', new Date());
    gtag('config', 'G-VTQ5KFZ69Y', {
      page_title: document.title,
      page_location: window.location.href,
      language: 'ar',
      country: 'SA',
      content_group1: 'Dream Interpretation',
      send_page_view: true,
      // تتبع الأحداث الخاصة بموقع عبر
      custom_map: {
        'custom_parameter_1': 'dream_type',
        'custom_parameter_2': 'user_type'
      }
    });
    
    // تتبع SPA navigation للـ Nuxt
    const nuxtApp = useNuxtApp();
    nuxtApp.hook('page:finish', () => {
      nextTick(() => {
        gtag('config', 'G-VTQ5KFZ69Y', {
          page_title: document.title,
          page_location: window.location.href
        });
      });
    });
    
    // إضافة gtag للـ global scope
    window.gtag = gtag;
    
    // إضافة helper functions للتتبع السريع
    window.trackEvent = (eventName: string, parameters?: any) => {
      gtag('event', eventName, parameters);
    };
  }
});