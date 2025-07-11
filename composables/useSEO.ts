// مركب إدارة SEO لموقع عبر
export const useSEO = () => {
  // تعيين meta tags أساسية
  const setBasicMeta = (options: {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
  }) => {
    const { title, description, keywords, image, url, type = 'website' } = options;
    
    useHead({
      title,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: keywords || 'تفسير الأحلام,عبر,استشارات روحانية,تطبيق عربي' },
        { name: 'author', content: 'عبر - تفسير الأحلام' },
        { name: 'robots', content: 'index,follow' },
        { name: 'language', content: 'ar' },
        { name: 'revisit-after', content: '7 days' },
        
        // Open Graph Meta Tags
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:type', content: type },
        { property: 'og:url', content: url || 'https://abber.co' },
        { property: 'og:image', content: image || '/images/og-default.jpg' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:site_name', content: 'عبر - تفسير الأحلام' },
        { property: 'og:locale', content: 'ar_SA' },
        
        // Twitter Card Meta Tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image || '/images/og-default.jpg' },
        { name: 'twitter:site', content: '@AbberApp' },
        
        // Mobile Meta Tags
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        
        // Arabic RTL Support
        { name: 'direction', content: 'rtl' },
        { httpEquiv: 'Content-Language', content: 'ar' }
      ],
      link: [
        { rel: 'canonical', href: url || 'https://abber.co' },
        { rel: 'alternate', hreflang: 'ar', href: url || 'https://abber.co' },
        { rel: 'alternate', hreflang: 'x-default', href: url || 'https://abber.co' }
      ]
    });
  };

  // تعيين meta tags للمقالات
  const setArticleMeta = (options: {
    title: string;
    description: string;
    content: string;
    image?: string;
    url?: string;
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    category?: string;
    tags?: string[];
  }) => {
    const { 
      title, 
      description, 
      content, 
      image, 
      url, 
      publishedTime, 
      modifiedTime, 
      author = 'فريق عبر',
      category = 'تفسير الأحلام',
      tags = []
    } = options;

    // حساب وقت القراءة المتوقع
    const wordsPerMinute = 200; // متوسط القراءة باللغة العربية
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    useHead({
      title: `${title} | مدونة عبر`,
      meta: [
        { name: 'description', content: description },
        { name: 'keywords', content: [...tags, 'تفسير الأحلام', 'عبر', 'مدونة'].join(',') },
        { name: 'author', content: author },
        { name: 'article:author', content: author },
        { name: 'article:published_time', content: publishedTime },
        { name: 'article:modified_time', content: modifiedTime || publishedTime },
        { name: 'article:section', content: category },
        { name: 'article:tag', content: tags.join(',') },
        
        // Open Graph Article Meta
        { property: 'og:type', content: 'article' },
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:url', content: url },
        { property: 'og:image', content: image || '/images/blog-default.jpg' },
        { property: 'og:article:author', content: author },
        { property: 'og:article:published_time', content: publishedTime },
        { property: 'og:article:modified_time', content: modifiedTime || publishedTime },
        { property: 'og:article:section', content: category },
        ...tags.map(tag => ({ property: 'og:article:tag', content: tag })),
        
        // Additional SEO Meta
        { name: 'reading-time', content: `${readingTime} دقيقة` },
        { name: 'word-count', content: wordCount.toString() }
      ]
    });
  };

  // تعيين Structured Data
  const setStructuredData = (data: any) => {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          children: JSON.stringify(data)
        }
      ]
    });
  };

  // إنشاء Breadcrumb Schema
  const setBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url
      }))
    };
    
    setStructuredData(breadcrumbSchema);
  };

  // تحسين meta tags للصفحة الرئيسية
  const setHomepageMeta = () => {
    setBasicMeta({
      title: 'عبر - تفسير الأحلام | أفضل منصة استشارات روحانية في الوطن العربي',
      description: 'احصل على تفسير دقيق لأحلامك من خبراء معتمدين في تفسير الأحلام. خدمة عربية أصيلة متاحة 24/7 مع ضمان الخصوصية والجودة.',
      keywords: 'تفسير الأحلام,عبر,استشارات روحانية,تطبيق عربي,مفسر أحلام,رؤى,منامات,تفسير الرؤى',
      url: 'https://abber.co',
      type: 'website'
    });

    // إضافة Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'عبر - تفسير الأحلام',
      'url': 'https://abber.co',
      'logo': 'https://abber.co/images/logo.png',
      'sameAs': [
        'https://twitter.com/AbberApp',
        'https://instagram.com/abber.app'
      ],
      'contactPoint': {
        '@type': 'ContactPoint',
        'contactType': 'customer service',
        'availableLanguage': 'Arabic'
      }
    };
    
    setStructuredData(organizationSchema);
  };

  return {
    setBasicMeta,
    setArticleMeta,
    setStructuredData,
    setBreadcrumbSchema,
    setHomepageMeta
  };
};