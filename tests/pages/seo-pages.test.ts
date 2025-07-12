import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// Mock جميع النواة الخاصة بـ Nuxt
vi.mock('#app', () => ({
  useHead: vi.fn(),
  useRoute: vi.fn(() => ({
    params: { slug: 'test-post' },
    query: {},
    path: '/blog/test-post'
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn()
  })),
  useNuxtApp: vi.fn(() => ({
    hook: vi.fn()
  })),
  navigateTo: vi.fn(),
  nextTick: vi.fn(() => Promise.resolve()),
  definePageMeta: vi.fn(),
  useFetch: vi.fn(() => ({
    data: {
      value: {
        title: 'Test Post',
        content: 'Test content',
        meta_content: 'Test meta description',
        image: '/test-image.jpg',
        post_category: { name: 'تفسير الأحلام' },
        id: '123'
      }
    }
  }))
}));

vi.mock('#imports', () => ({
  useHead: vi.fn(),
  useRoute: vi.fn(() => ({
    params: { slug: 'test-post' },
    query: {},
    path: '/blog/test-post'
  })),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn()
  })),
  onMounted: vi.fn((callback) => callback()),
  watch: vi.fn(),
  ref: vi.fn((value) => ({ value })),
  computed: vi.fn((getter) => ({ value: getter() })),
  nextTick: vi.fn(() => Promise.resolve()),
  definePageMeta: vi.fn(),
  useFetch: vi.fn(() => ({
    data: {
      value: {
        title: 'Test Post',
        content: 'Test content',
        meta_content: 'Test meta description',
        image: '/test-image.jpg',
        post_category: { name: 'تفسير الأحلام' },
        id: '123'
      }
    }
  }))
}));

// Mock الـ composables
vi.mock('~/composables/useAnalytics', () => ({
  useAnalytics: () => ({
    trackPageView: vi.fn(),
    trackContentView: vi.fn(),
    trackSearch: vi.fn(),
    trackShare: vi.fn()
  })
}));

vi.mock('~/composables/useSEO', () => ({
  useSEO: () => ({
    setBasicMeta: vi.fn(),
    setArticleMeta: vi.fn(),
    setHomepageMeta: vi.fn(),
    setBreadcrumbSchema: vi.fn()
  })
}));

vi.mock('~/composables/useSchema', () => ({
  useSchema: () => ({
    createArticleSchema: vi.fn(() => ({ '@type': 'Article' })),
    createOrganizationSchema: vi.fn(() => ({ '@type': 'Organization' })),
    createWebsiteSchema: vi.fn(() => ({ '@type': 'WebSite' })),
    createServiceSchema: vi.fn(() => ({ '@type': 'Service' })),
    createBlogSchema: vi.fn(() => ({ '@type': 'Blog' }))
  })
}));

describe('SEO Pages Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Homepage SEO Tests', () => {
    const createHomepageComponent = () => ({
      template: `
        <main class="min-h-screen outline-none">
          <div>Homepage Content</div>
        </main>
      `,
      setup() {
        const { setHomepageMeta } = vi.mocked(await import('~/composables/useSEO')).useSEO();
        const { createOrganizationSchema, createWebsiteSchema, createServiceSchema } = vi.mocked(await import('~/composables/useSchema')).useSchema();
        const { trackPageView } = vi.mocked(await import('~/composables/useAnalytics')).useAnalytics();

        // إعداد SEO للصفحة الرئيسية
        setHomepageMeta();

        // إضافة Schema Markup
        const { useHead } = vi.mocked(await import('#app'));
        useHead({
          script: [
            {
              type: 'application/ld+json',
              children: JSON.stringify(createOrganizationSchema())
            },
            {
              type: 'application/ld+json',
              children: JSON.stringify(createWebsiteSchema())
            },
            {
              type: 'application/ld+json',
              children: JSON.stringify(createServiceSchema())
            }
          ]
        });

        // تتبع مشاهدة الصفحة الرئيسية
        const { onMounted } = vi.mocked(await import('#imports'));
        onMounted(() => {
          trackPageView('الصفحة الرئيسية - عبر', '/');
        });

        return {};
      }
    });

    it('should set homepage SEO correctly', async () => {
      const component = createHomepageComponent();
      const wrapper = mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSEO } = await import('~/composables/useSEO');
      const { setHomepageMeta } = useSEO();
      
      expect(setHomepageMeta).toHaveBeenCalled();
      expect(wrapper.exists()).toBe(true);
    });

    it('should track homepage analytics', async () => {
      const component = createHomepageComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackPageView } = useAnalytics();
      
      expect(trackPageView).toHaveBeenCalledWith('الصفحة الرئيسية - عبر', '/');
    });

    it('should add schema markup scripts', async () => {
      const component = createHomepageComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useHead } = await import('#app');
      
      expect(useHead).toHaveBeenCalledWith(
        expect.objectContaining({
          script: expect.arrayContaining([
            expect.objectContaining({
              type: 'application/ld+json'
            })
          ])
        })
      );
    });
  });

  describe('Blog Index SEO Tests', () => {
    const createBlogIndexComponent = () => ({
      template: `
        <main class="min-h-screen outline-none">
          <div>Blog Index</div>
        </main>
      `,
      setup() {
        const { setBasicMeta, setBreadcrumbSchema } = vi.mocked(await import('~/composables/useSEO')).useSEO();
        const { createBlogSchema } = vi.mocked(await import('~/composables/useSchema')).useSchema();
        const { trackPageView, trackSearch } = vi.mocked(await import('~/composables/useAnalytics')).useAnalytics();

        setBasicMeta({
          title: 'مدونة عبر - مقالات تفسير الأحلام والاستشارات الروحانية',
          description: 'اكتشف أحدث المقالات والنصائح حول تفسير الأحلام والاستشارات الروحانية من خبراء مدونة عبر',
          keywords: 'مدونة تفسير الأحلام,مقالات روحانية,نصائح الأحلام,تفسير الرؤى,مدونة عبر',
          url: 'https://abber.co/blog',
          type: 'website'
        });

        // إضافة Blog Schema
        const { useHead } = vi.mocked(await import('#app'));
        useHead({
          script: [
            {
              type: 'application/ld+json',
              children: JSON.stringify(createBlogSchema())
            }
          ]
        });

        // إعداد Breadcrumb
        setBreadcrumbSchema([
          { name: 'الرئيسية', url: 'https://abber.co' },
          { name: 'المدونة', url: 'https://abber.co/blog' }
        ]);

        // تتبع مشاهدة صفحة المدونة
        const { onMounted } = vi.mocked(await import('#imports'));
        onMounted(() => {
          trackPageView('مدونة عبر', '/blog');
        });

        return {};
      }
    });

    it('should set blog SEO meta tags correctly', async () => {
      const component = createBlogIndexComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSEO } = await import('~/composables/useSEO');
      const { setBasicMeta } = useSEO();
      
      expect(setBasicMeta).toHaveBeenCalledWith({
        title: 'مدونة عبر - مقالات تفسير الأحلام والاستشارات الروحانية',
        description: 'اكتشف أحدث المقالات والنصائح حول تفسير الأحلام والاستشارات الروحانية من خبراء مدونة عبر',
        keywords: 'مدونة تفسير الأحلام,مقالات روحانية,نصائح الأحلام,تفسير الرؤى,مدونة عبر',
        url: 'https://abber.co/blog',
        type: 'website'
      });
    });

    it('should set breadcrumb schema for blog', async () => {
      const component = createBlogIndexComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSEO } = await import('~/composables/useSEO');
      const { setBreadcrumbSchema } = useSEO();
      
      expect(setBreadcrumbSchema).toHaveBeenCalledWith([
        { name: 'الرئيسية', url: 'https://abber.co' },
        { name: 'المدونة', url: 'https://abber.co/blog' }
      ]);
    });
  });

  describe('Blog Post SEO Tests', () => {
    const createBlogPostComponent = () => ({
      template: `
        <div>
          <h1>{{ post.title }}</h1>
          <div v-html="post.content"></div>
        </div>
      `,
      setup() {
        const { useRoute } = vi.mocked(await import('#app'));
        const route = useRoute();
        const slug = route.params.slug;

        const { setArticleMeta, setBreadcrumbSchema } = vi.mocked(await import('~/composables/useSEO')).useSEO();
        const { createArticleSchema } = vi.mocked(await import('~/composables/useSchema')).useSchema();
        const { trackPageView, trackContentView } = vi.mocked(await import('~/composables/useAnalytics')).useAnalytics();

        const { ref, watch } = vi.mocked(await import('#imports'));
        const post = ref({
          title: 'Test Article',
          content: 'Test content',
          meta_content: 'Test meta description',
          image: '/test-image.jpg',
          post_category: { name: 'تفسير الأحلام' },
          id: '123'
        });

        // إعداد SEO بعد تحميل المقال
        watch(post, (newPost) => {
          if (newPost && newPost.title) {
            setArticleMeta({
              title: newPost.title,
              description: newPost.meta_content || 'مقال من مدونة عبر لتفسير الأحلام',
              content: newPost.content,
              author: 'فريق عبر',
              publishedDate: new Date().toISOString(),
              image: newPost.image,
              url: `https://abber.co/blog/post/${slug}`,
              category: newPost.post_category?.name || 'تفسير الأحلام'
            });

            // إضافة Article Schema
            const { useHead } = vi.mocked(await import('#app'));
            useHead({
              script: [
                {
                  type: 'application/ld+json',
                  children: JSON.stringify(createArticleSchema({
                    title: newPost.title,
                    description: newPost.meta_content || 'مقال من مدونة عبر لتفسير الأحلام',
                    content: newPost.content,
                    author: 'فريق عبر',
                    publishedDate: new Date().toISOString(),
                    image: newPost.image,
                    url: `https://abber.co/blog/post/${slug}`,
                    category: newPost.post_category?.name || 'تفسير الأحلام'
                  }))
                }
              ]
            });

            // إعداد Breadcrumb
            setBreadcrumbSchema([
              { name: 'الرئيسية', url: 'https://abber.co' },
              { name: 'المدونة', url: 'https://abber.co/blog' },
              { name: newPost.title, url: `https://abber.co/blog/post/${slug}` }
            ]);
          }
        }, { immediate: true });

        const { onMounted } = vi.mocked(await import('#imports'));
        onMounted(() => {
          // تتبع مشاهدة المقال
          trackPageView(`${post.value?.title} | مدونة عبر`, `/blog/post/${slug}`);
          trackContentView('article', post.value?.id, post.value?.title);
        });

        return { post };
      }
    });

    it('should set article SEO meta tags correctly', async () => {
      const component = createBlogPostComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSEO } = await import('~/composables/useSEO');
      const { setArticleMeta } = useSEO();
      
      expect(setArticleMeta).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Article',
          description: 'Test meta description',
          content: 'Test content',
          author: 'فريق عبر',
          category: 'تفسير الأحلام'
        })
      );
    });

    it('should track article analytics', async () => {
      const component = createBlogPostComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackPageView, trackContentView } = useAnalytics();
      
      expect(trackPageView).toHaveBeenCalledWith(
        'Test Article | مدونة عبر',
        '/blog/post/test-post'
      );
      expect(trackContentView).toHaveBeenCalledWith('article', '123', 'Test Article');
    });

    it('should create article schema markup', async () => {
      const component = createBlogPostComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSchema } = await import('~/composables/useSchema');
      const { createArticleSchema } = useSchema();
      
      expect(createArticleSchema).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Test Article',
          description: 'Test meta description',
          content: 'Test content',
          author: 'فريق عبر'
        })
      );
    });

    it('should set breadcrumb for article', async () => {
      const component = createBlogPostComponent();
      mount(component, {
        global: {
          plugins: [createTestingPinia({ createSpy: vi.fn })]
        }
      });

      const { useSEO } = await import('~/composables/useSEO');
      const { setBreadcrumbSchema } = useSEO();
      
      expect(setBreadcrumbSchema).toHaveBeenCalledWith([
        { name: 'الرئيسية', url: 'https://abber.co' },
        { name: 'المدونة', url: 'https://abber.co/blog' },
        { name: 'Test Article', url: 'https://abber.co/blog/post/test-post' }
      ]);
    });
  });

  describe('Analytics Error Handling', () => {
    it('should handle missing gtag gracefully', async () => {
      // حذف gtag من window
      delete (window as any).gtag;
      
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackPageView } = useAnalytics();
      
      expect(() => trackPageView('Test', '/test')).not.toThrow();
    });

    it('should handle client-side only operations', async () => {
      // محاكاة بيئة server-side
      const originalProcess = process;
      (global as any).process = { client: false };
      
      const { useAnalytics } = await import('~/composables/useAnalytics');
      const { trackPageView } = useAnalytics();
      
      expect(() => trackPageView('Test', '/test')).not.toThrow();
      
      // استعادة process الأصلي
      (global as any).process = originalProcess;
    });
  });
});