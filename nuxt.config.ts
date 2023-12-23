export default defineNuxtConfig({
    devtools: { enabled: true },

    pages: true,

    css: ['~/assets/main.css', '~/assets/font.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },

    runtimeConfig: {
        apiSecret: 'ac216011525218e62e7473e438741d8b5b23f6b9',
    },
    modules: ['@nuxt/image', '@pinia/nuxt', '@sidebase/nuxt-auth'],

    auth: {
        provider: {
            type: 'refresh',
        },
    },

    app: {
        head: {
            charset: 'utf-8',
            link: [{ rel: 'icon', type: 'image/svg', href: '/images/favicon.ico' }],
            script : [{ src : 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js', type : 'text/javascript' }]
        },

        
    },
    components: [
        '~/components',
        '~/components/main',
        '~/components/partials',
        '~/components/shared',
        '~/components/orders',
    ],
});
