let production = process.env.ABBER_ENV === "production";
const apiSecret = production ? "a011ff6611fa1cfa9be83e5e22533976b2ede3df" : "d378b42b1f3f18f231edb2f253e43025dc01406f";
const websiteBasePath = production ? "https://abber.co" : "https://test.abber.co";
const apiBasePath = websiteBasePath + "/api";
export default defineNuxtConfig({
  nitro: (process.env.VITE_ENABLE_BROTLI != "false") ? {
    compressPublicAssets: {
      brotli: true
    }
  } : {},

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  pages: true,
  css: ["~/assets/main.css", "~/assets/font.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  routeRules: {
    "/api-proxy/**": {
      proxy: apiBasePath + "/**",
      headers: { "api-key": apiSecret },
      ssr: false, // Disable SSR for proxy requests to avoid server-side issues
      swr: true,
    },
    "/file/**": { proxy: "https://d336rd5betdm19.cloudfront.net/**", headers: { "api-key": apiSecret } },
  },

  router: {
    middleware: ['dashboard-layout']
  },

  runtimeConfig: {
    apiSecret: apiSecret,
    apiBasePath: apiBasePath,
    public: {
      WebsocketURL: import.meta.env.VITE_WS_URL,  // 'wss://abber.co'
      websiteBasePath: websiteBasePath,
      paymentWidgetURL: `https://${!production ? 'test.' : ''}oppwa.com/v1/paymentWidgets.js`,
      production: production,
    },
  },

  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    '@nuxtjs/device',
    'nuxt-viewport',
    "@nuxtjs/i18n",
    "@nuxtjs/robots",
    "@nuxtjs/sitemap"
  ],

  buildModules: (process.env.VITE_ENABLE_BROTLI != "false") ? ['@averjs/nuxt-compression'] : [],

  auth: {

    globalAppMiddleware: true,
    baseURL: import.meta.env.VITE_AUTH_URL,
    provider: {
      type: "refresh",
      pages: {
        login: "/accounts/login",
      },
      endpoints: {
        refresh: { path: "/refresh", method: "post" },
        getSession: { path: "/session" },
        signIn: { path: "/login", method: "post" }
      },
      token: {
        sameSiteAttribute: "lax",
        maxAgeInSeconds: ((60 * 60) * 24) * 7,
      },
      refreshToken: {
        maxAgeInSeconds: (60 * 60 * 24 * 7) + 60,
      },
      refreshOnlyToken: false,


    },
    session: {
      enableRefreshPeriodically: false,
      enableRefreshOnWindowFocus: false
    }
  },

  build: {
    // Analyze the bundle to understand what's taking up space
    analyze: true,
    // Extract CSS to improve performance
    extractCSS: true,
    optimizeCSS: true,
    terser: {
      terserOptions: {
        compress: {
          drop_console: true,
        },
      },
    },
    splitChunks: {
      layouts: true,
      pages: true,
      commons: true,
    },
    transpile: ["@vuepic/vue-datepicker"],
  },

  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'theme-color', content: '#1f2937' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' }
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/images/favicon.ico" },
        // { rel: "apple-touch-icon", sizes: "180x180", href: "/images/favicon.ico" },
        // { rel: "icon", type: "image/png", sizes: "32x32", href: "/images/favicon.ico" },
        // { rel: "icon", type: "image/png", sizes: "16x16", href: "/images/favicon.ico" },
        // { rel: "manifest", href: "/images/site.webmanifest" }
      ],
      script: [
        // {
        //   src: '/lazysizes.min.js',
        //   type: 'text/javascript',
        //   // async: true,
        //   // defer: true,
        //   body: true
        // }, 
      ],
    },
  },

  components: ["~/components", "~/components/main", "~/components/partials", "~/components/shared", "~/components/orders"],

  experimental: {
    defaults: {
      nuxtLink: {
        trailingSlash: "append",
      },
    },
    asyncContext: true
  },

  plugins: [
    '~/plugins/gtm.ts',
    '~/plugins/event-bus.ts',
    '~/plugins/drag-scroll.ts',
    {src: '~/plugins/ckeditor.ts', mode: 'client'}, // CKEditor plugin, ensure it's client-side only
  ],

  i18n: {
    vueI18n: './i18n.config.ts'
  },

  // إعداد SEO والموقع
  site: {
    url: websiteBasePath,
    name: 'عبر - تفسير الأحلام',
    description: 'أفضل منصة عربية لتفسير الأحلام والاستشارات الروحانية',
    defaultLocale: 'ar'
  },

  // إعداد robots.txt
  robots: {
    userAgent: '*',
    allow: '/',
    disallow: ['/admin/', '/api/', '/dashboard/'],
    sitemap: `${websiteBasePath}/sitemap.xml`
  },

  // إعداد sitemap
  sitemap: {
    hostname: websiteBasePath,
    gzip: true,
    routes: [
      '/',
      '/blog',
      '/about',
      '/contact',
      '/privacy',
      '/terms'
    ]
  },

  compatibilityDate: "2024-08-29"
});