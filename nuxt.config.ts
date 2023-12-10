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

    // modules: ['@sidebase/nuxt-auth'],
    // auth: {
    //     provider: {
    //         type: 'refresh',
    //         endpoints : {
    //             signIn : { path : "https://abber.co/api/authentication/login", method : "post"},
    //             getSession : {path : "https://abber.co/api/accounts/account/", method : "get"},
    //         }
    //     },
    //     baseURL : "https://abber.co/api",
    //     session : {
    //         enableRefreshOnWindowFocus : false,
    //         enableRefreshPeriodically : true
    //     }
    // },

    app: {
        head: {
            charset: 'utf-8',
            link: [{ rel: 'icon', type: 'image/svg', href: '~/assets/images/favicon.ico' }],
        },
    },
    components: ['~/components', '~/components/main', '~/components/partials', '~/components/blog'],
});
