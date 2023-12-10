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
        
    modules: [
        '@nuxt/image', 
        '@pinia/nuxt',
        // '@sidebase/nuxt-auth'
    ],

    // auth: {
    //     provider: {
    //         type: 'refresh',
    //         endpoints : {

    //             signIn : { path : "authentication/login", method : "post"},
    //             signUp : { path : "authentication/register", method : 'post'}, 
    //             refresh : { path : "authentication/token/refresh/", method : 'post'}, 
    //             getSession : {path : "accounts/account/", method : "get"},

    //         },
    //         token : {

    //             signInResponseTokenPointer : 'access_token',
                
    //         },
    //         refreshToken : {

    //             signInResponseRefreshTokenPointer : 'refresh_token'

    //         }
    //     },
    //     baseURL : "https://test.abber.co/api/",
    //     session : {
    //         enableRefreshOnWindowFocus : false,
    //         enableRefreshPeriodically : true
    //     },
    // },

    app: {
        head: {
            charset: 'utf-8',
            link: [{ rel: 'icon', type: 'image/svg', href: '/images/favicon.ico' }],
        },
    },
    components: ['~/components', '~/components/main', '~/components/partials', '~/components/blog'],
});
