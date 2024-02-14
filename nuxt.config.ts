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

        // HTTP_API_KEY=d378b42b1f3f18f231edb2f253e43025dc01406f
        // prod
        // apiSecret: '27fe0837909c033d8a143b33b1257dc165495349',
        // apiBasePath: 'https://abber.co/api'
        // test
        apiSecret: 'd378b42b1f3f18f231edb2f253e43025dc01406f',
        apiBasePath: 'https://test.abber.co/api'
    },
    modules: ['@nuxt/image', '@pinia/nuxt', '@sidebase/nuxt-auth'],

    routeRules: {
        '/accounts/register': { ssr: false }
    },
    auth: {
        globalAppMiddleware: true, 
        provider: {
            type: 'refresh',
            pages: {
                login: '/accounts/login'
            },
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
