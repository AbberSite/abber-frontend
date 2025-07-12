// مركب التتبع والتحليلات لموقع عبر
export const useAnalytics = () => {
  // تتبع مشاهدة الصفحة
  const trackPageView = (title?: string, path?: string) => {
    if (process.client) {
      if (!window.gtag) {
        console.warn('[Analytics] gtag is not defined');
        return;
      }
      console.log('[Analytics] trackPageView', { title, path });
      window.gtag('config', 'G-VTQ5KFZ69Y', {
        page_title: title || document.title,
        page_location: path || window.location.href,
        language: 'ar',
        country: 'SA',
        content_group1: 'Dream Interpretation'
      });
    }
  };

  // تتبع الأحداث العامة
  const trackEvent = (eventName: string, parameters?: any) => {
    if (process.client) {
      if (!window.gtag) {
        console.warn('[Analytics] gtag is not defined');
        return;
      }
      console.log('[Analytics] trackEvent', eventName, parameters);
      window.gtag('event', eventName, {
        language: 'ar',
        ...parameters
      });
    }
  };

  // تتبع النقرات على الأزرار
  const trackButtonClick = (buttonName: string, location?: string) => {
    trackEvent('button_click', {
      button_name: buttonName,
      location: location || 'unknown',
      event_category: 'engagement'
    });
  };

  // تتبع مشاهدة المحتوى
  const trackContentView = (contentType: string, contentId: string, title?: string) => {
    trackEvent('content_view', {
      content_type: contentType,
      content_id: contentId,
      content_title: title,
      event_category: 'content'
    });
  };

  // تتبع البحث
  const trackSearch = (searchTerm: string, resultCount?: number) => {
    trackEvent('search', {
      search_term: searchTerm,
      result_count: resultCount,
      event_category: 'search'
    });
  };

  // تتبع مشاركة المحتوى
  const trackShare = (contentType: string, contentId: string, method: string) => {
    trackEvent('share', {
      content_type: contentType,
      content_id: contentId,
      method: method,
      event_category: 'social'
    });
  };

  // تتبع تفاعل المستخدم مع النماذج
  const trackFormInteraction = (formName: string, action: 'start' | 'submit' | 'abandon') => {
    trackEvent('form_interaction', {
      form_name: formName,
      action: action,
      event_category: 'forms'
    });
  };

  // تتبع أحداث خاصة بموقع عبر
  const trackDreamInteraction = (action: 'view_services' | 'select_interpreter' | 'start_order' | 'complete_order') => {
    trackEvent('dream_interaction', {
      interaction_type: action,
      event_category: 'dream_service'
    });
  };

  // تتبع أداء الموقع
  const trackPerformance = (metric: string, value: number) => {
    trackEvent('performance_metric', {
      metric_name: metric,
      metric_value: value,
      event_category: 'performance'
    });
  };

  // تتبع أخطاء JavaScript
  const trackError = (error: string, location?: string) => {
    trackEvent('javascript_error', {
      error_message: error,
      error_location: location || 'unknown',
      event_category: 'errors'
    });
  };

  return {
    trackPageView,
    trackEvent,
    trackButtonClick,
    trackContentView,
    trackSearch,
    trackShare,
    trackFormInteraction,
    trackDreamInteraction,
    trackPerformance,
    trackError
  };
};