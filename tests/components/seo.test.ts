import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// Mock النواة الخاصة بـ Nuxt
vi.mock('#app', () => ({
  useHead: vi.fn(),
  useRoute: vi.fn(() => ({
    params: { slug: 'test-post' }
  })),
  useNuxtApp: vi.fn(() => ({
    hook: vi.fn()
  })),
  navigateTo: vi.fn(),
  nextTick: vi.fn(() => Promise.resolve())
}));

vi.mock('#imports', () => ({
  useHead: vi.fn(),
  useRoute: vi.fn(() => ({
    params: { slug: 'test-post' }
  })),
  onMounted: vi.fn((callback) => callback()),
  watch: vi.fn(),
  ref: vi.fn((value) => ({ value })),
  computed: vi.fn((getter) => ({ value: getter() })),
  nextTick: vi.fn(() => Promise.resolve())
}));

// اختبار composables SEO
describe('SEO Composables Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Mock window object للمتصفح
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://abber.co/test',
        origin: 'https://abber.co'
      },
      writable: true
    });

    // Mock document
    Object.defineProperty(global, 'document', {
      value: {
        title: 'Test Page',
        createElement: vi.fn(() => ({
          async: true,
          src: '',
          appendChild: vi.fn()
        })),
        head: {
          appendChild: vi.fn()
        }
      },
      writable: true
    });

    // Mock window.dataLayer للـ Analytics
    Object.defineProperty(window, 'dataLayer', {
      value: [],
      writable: true
    });

    Object.defineProperty(window, 'gtag', {
      value: vi.fn(),
      writable: true
    });
  });

  describe('useAnalytics', () => {
    it('should track page view correctly', async () => {
      // استيراد الـ composable بشكل ديناميكي
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackPageView } = useAnalytics();

      // تنفيذ trackPageView
      trackPageView('Test Page', '/test');

      // التحقق من أن gtag تم استدعاؤها
      expect(window.gtag).toHaveBeenCalledWith('config', 'G-VTQ5KFZ69Y', {
        page_title: 'Test Page',
        page_location: '/test',
        language: 'ar',
        country: 'SA',
        content_group1: 'Dream Interpretation'
      });
    });

    it('should track events with correct parameters', async () => {
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackEvent } = useAnalytics();

      trackEvent('button_click', { button_name: 'test_button' });

      expect(window.gtag).toHaveBeenCalledWith('event', 'button_click', {
        language: 'ar',
        button_name: 'test_button'
      });
    });

    it('should track search with results count', async () => {
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackSearch } = useAnalytics();

      trackSearch('تفسير الأحلام', 25);

      expect(window.gtag).toHaveBeenCalledWith('event', 'search', {
        search_term: 'تفسير الأحلام',
        result_count: 25,
        event_category: 'search',
        language: 'ar'
      });
    });

    it('should track content view', async () => {
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackContentView } = useAnalytics();

      trackContentView('article', '123', 'Test Article');

      expect(window.gtag).toHaveBeenCalledWith('event', 'content_view', {
        content_type: 'article',
        content_id: '123',
        content_title: 'Test Article',
        event_category: 'content',
        language: 'ar'
      });
    });

    it('should track dream interactions', async () => {
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackDreamInteraction } = useAnalytics();

      trackDreamInteraction('view_services');

      expect(window.gtag).toHaveBeenCalledWith('event', 'dream_interaction', {
        interaction_type: 'view_services',
        event_category: 'dream_service',
        language: 'ar'
      });
    });
  });

  describe('useSEO', () => {
    it('should set basic meta tags correctly', async () => {
      const { useHead } = await import('#app');
      const { useSEO } = await import('~/composables/useSEO');
      const { setBasicMeta } = useSEO();

      const metaOptions = {
        title: 'Test Page',
        description: 'Test Description',
        keywords: 'test,keywords',
        url: 'https://abber.co/test'
      };

      setBasicMeta(metaOptions);

      expect(useHead).toHaveBeenCalledWith({
        title: 'Test Page',
        meta: expect.arrayContaining([
          { name: 'description', content: 'Test Description' },
          { name: 'keywords', content: 'test,keywords' },
          { property: 'og:title', content: 'Test Page' },
          { property: 'og:description', content: 'Test Description' },
          { property: 'og:url', content: 'https://abber.co/test' },
          { name: 'twitter:title', content: 'Test Page' }
        ]),
        link: expect.arrayContaining([
          { rel: 'canonical', href: 'https://abber.co/test' }
        ])
      });
    });

    it('should set article meta tags with reading time', async () => {
      const { useHead } = await import('#app');
      const { useSEO } = await import('~/composables/useSEO');
      const { setArticleMeta } = useSEO();

      const articleOptions = {
        title: 'Test Article',
        description: 'Test Article Description',
        content: 'This is a test article with some content that should calculate reading time.',
        author: 'Test Author',
        publishedTime: '2024-01-01T00:00:00.000Z'
      };

      setArticleMeta(articleOptions);

      expect(useHead).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Article | مدونة عبر',
          meta: expect.arrayContaining([
            { name: 'description', content: 'Test Article Description' },
            { name: 'author', content: 'Test Author' },
            { property: 'og:type', content: 'article' },
            { name: 'reading-time', content: '1 دقيقة' }
          ])
        })
      );
    });

    it('should set homepage meta correctly', async () => {
      const { useHead } = await import('#app');
      const { useSEO } = await import('~/composables/useSEO');
      const { setHomepageMeta } = useSEO();

      setHomepageMeta();

      expect(useHead).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'عبر - تفسير الأحلام | أفضل منصة استشارات روحانية في الوطن العربي',
          meta: expect.arrayContaining([
            { name: 'description', content: expect.stringContaining('تفسير دقيق لأحلامك') },
            { property: 'og:site_name', content: 'عبر - تفسير الأحلام' },
            { property: 'og:locale', content: 'ar_SA' }
          ])
        })
      );
    });
  });

  describe('useSchema', () => {
    it('should create article schema correctly', async () => {
      const { useSchema } = await import('~/composables/useSchema');
      const { createArticleSchema } = useSchema();

      const articleData = {
        title: 'Test Article',
        description: 'Test Description',
        content: 'Test content with enough words to calculate reading time properly.',
        author: 'Test Author',
        publishedDate: '2024-01-01T00:00:00.000Z',
        url: 'https://abber.co/blog/test-article'
      };

      const schema = createArticleSchema(articleData);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: 'Test Article',
        description: 'Test Description',
        author: {
          '@type': 'Person',
          name: 'Test Author'
        },
        publisher: {
          '@type': 'Organization',
          name: 'عبر - تفسير الأحلام',
          logo: {
            '@type': 'ImageObject',
            url: 'https://abber.co/images/logo.png'
          }
        },
        datePublished: '2024-01-01T00:00:00.000Z',
        dateModified: '2024-01-01T00:00:00.000Z',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://abber.co/blog/test-article'
        },
        image: {
          '@type': 'ImageObject',
          url: 'https://abber.co/images/blog-default.jpg',
          width: 1200,
          height: 630
        },
        articleSection: 'تفسير الأحلام',
        wordCount: 11,
        timeRequired: 'PT1M',
        inLanguage: 'ar',
        about: {
          '@type': 'Thing',
          name: 'تفسير الأحلام',
          description: 'علم تفسير الأحلام والرؤى في التراث العربي والإسلامي'
        }
      });
    });

    it('should create organization schema correctly', async () => {
      const { useSchema } = await import('~/composables/useSchema');
      const { createOrganizationSchema } = useSchema();

      const schema = createOrganizationSchema();

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'عبر - تفسير الأحلام',
        alternateName: 'Abber Dream Interpretation',
        url: 'https://abber.co',
        logo: 'https://abber.co/images/logo.png',
        description: 'أفضل منصة عربية لتفسير الأحلام مع خبراء معتمدين',
        foundingDate: '2020',
        slogan: 'أحلامك لها معنى',
        contactPoint: expect.arrayContaining([
          expect.objectContaining({
            '@type': 'ContactPoint',
            contactType: 'customer service'
          })
        ]),
        sameAs: expect.arrayContaining([
          'https://apps.apple.com/sa/app/abber/id1234567890',
          'https://twitter.com/AbberApp'
        ]),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '1250',
          bestRating: '5',
          worstRating: '1'
        }
      });
    });

    it('should create service schema correctly', async () => {
      const { useSchema } = await import('~/composables/useSchema');
      const { createServiceSchema } = useSchema();

      const schema = createServiceSchema();

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'خدمة تفسير الأحلام',
        description: 'خدمة تفسير الأحلام من خبراء معتمدين متاحة 24/7',
        provider: {
          '@type': 'Organization',
          name: 'عبر - تفسير الأحلام',
          url: 'https://abber.co'
        },
        serviceType: 'Dream Interpretation',
        availableLanguage: 'ar',
        areaServed: {
          '@type': 'Country',
          name: 'Saudi Arabia'
        },
        hasOfferCatalog: expect.objectContaining({
          '@type': 'OfferCatalog',
          name: 'خدمات تفسير الأحلام'
        })
      });
    });

    it('should create FAQ schema correctly', async () => {
      const { useSchema } = await import('~/composables/useSchema');
      const { createFAQSchema } = useSchema();

      const faqs = [
        { question: 'ما هو تفسير الأحلام؟', answer: 'تفسير الأحلام هو علم...' },
        { question: 'كيف أطلب خدمة؟', answer: 'يمكنك طلب الخدمة من خلال...' }
      ];

      const schema = createFAQSchema(faqs);

      expect(schema).toEqual({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'ما هو تفسير الأحلام؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'تفسير الأحلام هو علم...'
            }
          },
          {
            '@type': 'Question',
            name: 'كيف أطلب خدمة؟',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'يمكنك طلب الخدمة من خلال...'
            }
          }
        ]
      });
    });
  });
});

// اختبارات تكامل مع المكونات
describe('SEO Integration Tests', () => {
  it('should work with Vue components', async () => {
    const TestComponent = {
      template: '<div>Test Component</div>',
      setup() {
        // استخدام مباشر للـ composables
        return {};
      }
    };

    const wrapper = mount(TestComponent, {
      global: {
        plugins: [createTestingPinia({ createSpy: vi.fn })]
      }
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('should handle errors gracefully', async () => {
    const { useAnalytics } = await import('~/composables/useAnalytics');
    
    // محاكاة عدم وجود gtag
    delete (window as any).gtag;
    
    const { trackPageView } = useAnalytics();
    
    // يجب ألا تسبب خطأ حتى لو لم تكن gtag متاحة
    expect(() => trackPageView('Test', '/test')).not.toThrow();
  });
});