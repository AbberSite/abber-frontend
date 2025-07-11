// مركب إدارة Schema Markup لموقع عبر
export const useSchema = () => {
  
  // إنشاء Article Schema للمقالات
  const createArticleSchema = (article: {
    title: string;
    description: string;
    content: string;
    author: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    url: string;
    category?: string;
  }) => {
    const wordsPerMinute = 200;
    const wordCount = article.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      'headline': article.title,
      'description': article.description,
      'author': {
        '@type': 'Person',
        'name': article.author
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://abber.co/images/logo.png'
        }
      },
      'datePublished': article.publishedDate,
      'dateModified': article.modifiedDate || article.publishedDate,
      'mainEntityOfPage': {
        '@type': 'WebPage',
        '@id': article.url
      },
      'image': {
        '@type': 'ImageObject',
        'url': article.image || 'https://abber.co/images/blog-default.jpg',
        'width': 1200,
        'height': 630
      },
      'articleSection': article.category || 'تفسير الأحلام',
      'wordCount': wordCount,
      'timeRequired': `PT${readingTime}M`,
      'inLanguage': 'ar',
      'about': {
        '@type': 'Thing',
        'name': 'تفسير الأحلام',
        'description': 'علم تفسير الأحلام والرؤى في التراث العربي والإسلامي'
      }
    };
  };

  // إنشاء Service Schema لخدمات التفسير
  const createServiceSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      'name': 'خدمة تفسير الأحلام',
      'description': 'خدمة تفسير الأحلام من خبراء معتمدين متاحة 24/7',
      'provider': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام',
        'url': 'https://abber.co'
      },
      'serviceType': 'Dream Interpretation',
      'availableLanguage': 'ar',
      'areaServed': {
        '@type': 'Country',
        'name': 'Saudi Arabia'
      },
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'خدمات تفسير الأحلام',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'تفسير نصي للأحلام',
              'description': 'تفسير مفصل للأحلام عبر الرسائل النصية'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'تفسير صوتي للأحلام',
              'description': 'تفسير شخصي للأحلام عبر المكالمات الصوتية'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'استشارة شخصية',
              'description': 'جلسة استشارة شخصية مع مفسر معتمد'
            }
          }
        ]
      }
    };
  };

  // إنشاء Organization Schema
  const createOrganizationSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': 'عبر - تفسير الأحلام',
      'alternateName': 'Abber Dream Interpretation',
      'url': 'https://abber.co',
      'logo': 'https://abber.co/images/logo.png',
      'description': 'أفضل منصة عربية لتفسير الأحلام مع خبراء معتمدين',
      'foundingDate': '2020',
      'slogan': 'أحلامك لها معنى',
      'contactPoint': [
        {
          '@type': 'ContactPoint',
          'contactType': 'customer service',
          'availableLanguage': ['Arabic', 'English'],
          'areaServed': 'SA'
        }
      ],
      'sameAs': [
        'https://apps.apple.com/sa/app/abber/id1234567890',
        'https://play.google.com/store/apps/details?id=co.abber.app',
        'https://twitter.com/AbberApp',
        'https://instagram.com/abber.app'
      ],
      'address': {
        '@type': 'PostalAddress',
        'addressCountry': 'SA',
        'addressRegion': 'Riyadh'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.8',
        'reviewCount': '1250',
        'bestRating': '5',
        'worstRating': '1'
      }
    };
  };

  // إنشاء Website Schema
  const createWebsiteSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'عبر - تفسير الأحلام',
      'url': 'https://abber.co',
      'description': 'أفضل منصة عربية لتفسير الأحلام والاستشارات الروحانية',
      'inLanguage': 'ar',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://abber.co/search?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      },
      'author': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://abber.co/images/logo.png'
        }
      }
    };
  };

  // إنشاء FAQ Schema
  const createFAQSchema = (faqs: Array<{ question: string; answer: string }>) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  };

  // إنشاء How-to Schema للإرشادات
  const createHowToSchema = (howTo: {
    name: string;
    description: string;
    steps: Array<{ name: string; text: string; image?: string }>;
    totalTime?: string;
    estimatedCost?: string;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      'name': howTo.name,
      'description': howTo.description,
      'totalTime': howTo.totalTime || 'PT10M',
      'estimatedCost': howTo.estimatedCost,
      'step': howTo.steps.map((step, index) => ({
        '@type': 'HowToStep',
        'position': index + 1,
        'name': step.name,
        'text': step.text,
        'image': step.image ? {
          '@type': 'ImageObject',
          'url': step.image
        } : undefined
      })),
      'inLanguage': 'ar'
    };
  };

  // إنشاء Blog Schema للمدونة
  const createBlogSchema = () => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      'name': 'مدونة عبر',
      'description': 'مقالات ونصائح حول تفسير الأحلام والاستشارات الروحانية',
      'url': 'https://abber.co/blog',
      'inLanguage': 'ar',
      'author': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام'
      },
      'publisher': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام',
        'logo': {
          '@type': 'ImageObject',
          'url': 'https://abber.co/images/logo.png'
        }
      }
    };
  };

  // إنشاء Person Schema للمفسرين
  const createPersonSchema = (person: {
    name: string;
    description: string;
    image?: string;
    jobTitle: string;
    experience?: string;
    rating?: number;
    reviewCount?: number;
  }) => {
    return {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': person.name,
      'description': person.description,
      'image': person.image,
      'jobTitle': person.jobTitle,
      'worksFor': {
        '@type': 'Organization',
        'name': 'عبر - تفسير الأحلام'
      },
      'aggregateRating': person.rating ? {
        '@type': 'AggregateRating',
        'ratingValue': person.rating.toString(),
        'reviewCount': person.reviewCount?.toString() || '1',
        'bestRating': '5',
        'worstRating': '1'
      } : undefined,
      'knowsAbout': [
        'تفسير الأحلام',
        'الرؤى والمنامات',
        'الاستشارات الروحانية',
        'التراث الإسلامي'
      ]
    };
  };

  return {
    createArticleSchema,
    createServiceSchema,
    createOrganizationSchema,
    createWebsiteSchema,
    createFAQSchema,
    createHowToSchema,
    createBlogSchema,
    createPersonSchema
  };
};