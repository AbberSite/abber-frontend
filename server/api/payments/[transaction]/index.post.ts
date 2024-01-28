import axios from 'axios';

export default defineEventHandler(async (event) => {
    
    const headers = getRequestHeaders(event);
    const body = await readBody(event);

    const transaction = event.context.params?.transaction

    const Authorization = headers.authorization;

    const config = useRuntimeConfig();

    try {

        const response = await axios(config.apiBasePath + `/payment/fetch-payment/${transaction}/`, {

            params : {
                id : body.id
            },

            headers: {
                'api-key': config.apiSecret,
                Authorization
            }

        });

        return response?.data;

    } catch (error: any) {

        setResponseStatus(event, 500);
        return error.response.data;

    }
});
