import axios from 'axios';

export default defineEventHandler(async (event) => {
    const headers = getRequestHeaders(event);
    const body = await readBody(event);

    const Authorization = headers.authorization;

    const config = useRuntimeConfig();

    try {
        const response = await axios.post(
            config.apiBasePath + `/orders/dream-info/`,
            {
                dream: body.dream,
                dream_title: body.dream_title,
                dream_time: body.dream_time,
                client: body.client,
                gender: body.gender,
                age: body.age,
                marital_status: body.marital_status,
                profession: body.profession
            },
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
            data: {
                dream: body.dream,
                dream_title: body.dream_title,
                dream_time: body.dream_time,
                client: body.client,
                gender: body.gender,
                age: body.age,
                marital_status: body.marital_status,
                profession: body.profession
            }
        };
    }
});
