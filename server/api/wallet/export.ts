import { getToken } from '#auth';
import axios from 'axios';

export default defineEventHandler(async (event) => {
    let { date_from, date_to } = getQuery(event);
    const headers = getHeaders(event);

    const Authorization = headers.authorization;



    const config = useRuntimeConfig();

    try {
        const response = await axios.get(config.apiBasePath.replace('/api', '')  + `/wallets/statements/export/?action=download&date_from=${date_from}&date_to=${date_to}`, {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            },
        });

        return response.data;

    } catch (error: any) {
        setResponseStatus(event, 400);

        return {
            data : error?.response?.data,
            status: 'error',
            error: 'حدث خطأ ما'
        };
    }
});
