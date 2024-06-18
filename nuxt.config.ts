let production = process.env.ABBER_ENV === "production";
const apiSecret = production ? "a011ff6611fa1cfa9be83e5e22533976b2ede3df" : "d378b42b1f3f18f231edb2f253e43025dc01406f";
const websiteBasePath = production ? "https://abber.co" : "https://test.abber.co";
const apiBasePath = websiteBasePath + "/api";
export default defineNuxtConfig({
  devtools: { enabled: true }, 
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/main.css', '~/assets/font.css'],
  modules: ['@pinia/nuxt', '@sidebase/nuxt-auth'],
  pages: true,
  routeRules: {
    "/api-proxy/**": { proxy: apiBasePath + "/**", headers: { "api-key": apiSecret }, ssr: true, swr: true },
    "/file/**": { proxy: "https://d336rd5betdm19.cloudfront.net/**", headers: { "api-key": apiSecret } },
    // '/orders/video/**' : {ssr : false}
  },
  runtimeConfig: {
    apiSecret: apiSecret,
    apiBasePath: apiBasePath,
    public: {
      WebsocketURL: import.meta.env.VITE_WS_URL,  // 'wss://abber.co'
      zoomSdkKey: "jFmC2HUOQl6JVb_PHPXxNQ",
      websiteBasePath: websiteBasePath
    }
  },
  auth: {
    globalAppMiddleware: true,
    baseURL : import.meta.env.VITE_AUTH_URL,
    provider: {
      type: "refresh",
      // refreshOnlyToken: true,
      pages: {
        login: "/accounts/login",
      },
      endpoints: {
        getSession: { path: "/session", method: 'get' }
      }
    }
  },

})
