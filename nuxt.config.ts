export default defineNuxtConfig({
    devtools: { enabled: true },

    pages: true,

    css: ['~/assets/main.css', '~/assets/font.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    runtimeConfig: {
        apiSecret: '27fe0837909c033d8a143b33b1257dc165495349',
        apiBasePath: 'https://abber.co/api'
    },
    modules: ['@nuxt/image', '@pinia/nuxt', '@sidebase/nuxt-auth'],

    routeRules: {
        '/accounts/register': { ssr: false }
    },
    auth: {
        provider: {
            type: 'refresh'
        }
    },

    build: {
        transpile: ['@vuepic/vue-datepicker']
    },

    app: {
        head: {
            charset: 'utf-8',
            link: [{ rel: 'icon', type: 'image/svg', href: '/images/favicon.ico' }],
            script: [
                {
                    src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
                    type: 'text/javascript'
                }
            ]
        }
    },
    components: [
        '~/components',
        '~/components/main',
        '~/components/partials',
        '~/components/shared',
        '~/components/orders'
    ]
});
