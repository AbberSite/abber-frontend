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
    "/api-proxy/**": { proxy: apiBasePath + "/**", headers: { "api-key": apiSecret }, ssr: true, swr: true },
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
      zoomSdkKey: "jFmC2HUOQl6JVb_PHPXxNQ",
      websiteBasePath: websiteBasePath,
      paymentWidgetURL: `https://${!production ? 'test.' : ''}oppwa.com/v1/paymentWidgets.js`,
    },
  },
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    '@nuxtjs/device',
    'nuxt-viewport',
    "@nuxtjs/i18n"
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
        maxAgeInSeconds: 60 * 50
      },
      refreshToken: {
        maxAgeInSeconds: 60 * 60 * 24 * 7
      }
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
      link: [{ rel: "icon", type: "image/svg", href: "/images/favicon.ico" }],

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
    '~/plugins/drag-scroll.ts'
  ],
  i18n: {
    vueI18n: './i18n.config.ts'
  }
});