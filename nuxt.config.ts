export default defineNuxtConfig({

  devtools: { enabled: true },

	pages: true,

	css: ['~/assets/main.css'],
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	app: {
		head: {
			charset: 'utf-8',
			viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
			link: [{ rel: 'icon', type: 'image/svg', href: '/logo.ico' }],
      

		},
		
	},
	components: ['~/components', '~/components/main', '~/components/partials'],
});
