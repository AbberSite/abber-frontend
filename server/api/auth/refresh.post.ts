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
        if(!response?.data?.access)
            console.log(response)
        return { token: response?.data?.access ?? '' };
    } catch (error: any) {
        return { token: '' };
    }
});
