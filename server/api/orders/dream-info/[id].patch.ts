import axios from 'axios';

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const body = await readBody(event);

    const id = event.context.params?.id;

    const Authorization = headers.authorization;

    const config = useRuntimeConfig();

    try {
        const response = await axios.patch(
          config.apiBasePath + `/orders/dream-info/${id}`,
            body,
            {
                headers: {
                    'api-key': config.apiSecret,
                    Authorization
                }
            }
        );

        return response?.data;
    } catch (error: any) {
        setResponseStatus(event, 500);
        return {
            error: error.response.data,
            
        };
    }
});
