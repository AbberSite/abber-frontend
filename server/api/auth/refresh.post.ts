import axios from 'axios';

export default defineEventHandler(async (event) => {
    // return "hello world"
    const config = useRuntimeConfig();
    const body = await readBody(event)

    try {
        const response = await axios.post(

            config.apiBasePath + '/authentication/token/refresh/',

            {

                refresh: body.refreshToken,

            },
            {
                headers: {

                    Authorization: getHeaders(event).authorization,
                    'api-key': config.apiSecret,

                },
            },
        );

        return { token: response?.data?.access };

    } catch (error : any) {


        setResponseStatus(event, error?.response?.status ?? 500)
        return { data : error?.response?.data, error : true };

    }
});
