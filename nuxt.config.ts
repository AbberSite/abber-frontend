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
  modules: ['@pinia/nuxt'],
  pages: true
})
