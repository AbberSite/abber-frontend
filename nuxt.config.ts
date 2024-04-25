let production = process.env.ABBER_ENV === "production";
const apiSecret = production ? "a011ff6611fa1cfa9be83e5e22533976b2ede3df" : "d378b42b1f3f18f231edb2f253e43025dc01406f";
const websiteBasePath = production ? "https://abber.co" : "https://test.abber.co";
const apiBasePath = websiteBasePath + "/api";
export default defineNuxtConfig({
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
    // '/orders/video/**' : {ssr : false}
  },
  runtimeConfig: {
    // HTTP_API_KEY=d378b42b1f3f18f231edb2f253e43025dc01406f
    // prod
    // apiSecret: '27fe0837909c033d8a143b33b1257dc165495349',
    // apiBasePath: 'https://abber.co/api'
    // test
    apiSecret: apiSecret,
    apiBasePath: apiBasePath,
    public: {
      WebsocketURL: import.meta.env.VITE_WS_URL,  // 'wss://abber.co'
      zoomSdkKey: "jFmC2HUOQl6JVb_PHPXxNQ",
      websiteBasePath: websiteBasePath,
      paymentWidgetURL: `https://${!production ? 'test.' : ''}oppwa.com/v1/paymentWidgets.js`
      // paymentWidgetURL: `https://eu-test.oppwa.com/v1/paymentWidgets.js`
    },
  },
  modules: ["@nuxt/image", "@pinia/nuxt", "@sidebase/nuxt-auth", '@nuxtjs/device'],

  auth: {

    globalAppMiddleware: true,

    baseURL : websiteBasePath + '/api/auth',

    provider: {
      type: "refresh",
      pages: {
        login: "/accounts/login",
      },
      endpoints: {
        refresh: { path: "/refresh", method: "post"},
        getSession: { path: "/session", method: "get" },
        signIn: { path: "/login", method: "post" }
      },

      refreshToken: {

        // refreshRequestTokenPointer:'refresh',
        // signInResponseRefreshTokenPointer : "refresh_token"
      },
      token: {

        // signInResponseTokenPointer : "/access",
        sameSiteAttribute: "strict",

      },

      // refreshOnlyToken : true,

      // sessionDataType: {
      //     'username': 'string',
      //     'email': 'string',
      //     first_name: 'Isabelle Walter',
      //     phone: '++19214023523',
      //     user_type: 'string',
      //     role_id: 'number',
      //     "id?": "string",
      //     image_url: 'string',
      //     'profile?': {
      //         'bank_account?': 'string',
      //         'gender?': 'string',
      //         'birthday?': 'string',
      //         'marital_status?': 'string',
      //         'profession?': 'string'
      //     },
      //     phone_verified: 'boolean',
      //     email_verified: 'boolean',
      //     'notifications?': {
      //         'count': 'number',
      //         next: 'string',
      //         previous: 'string',
      //         results: 'any'
      //     }
      // }
    },
  },

  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },

  app: {
    head: {
      charset: "utf-8",
      link: [{ rel: "icon", type: "image/svg", href: "/images/favicon.ico" }],
      script: [
        {
          src: '/lazysizes.min.js',
          type: 'text/javascript',
          async: true,
          body: true
        }
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
  },
});
