import axios from 'axios';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event);

    try {
        const response = await axios.post(
            config.apiBasePath + '/authentication/token/refresh/',
            {
                refresh: body.refreshToken
            },
            {
                headers: {
                    keepAlive: true,
                    'api-key': config.apiSecret
                }
            }
        );

        return { token: response?.data?.access };
    } catch (error: any) {
        return { token: '' };
    }
});
