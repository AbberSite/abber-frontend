import axios from 'axios';

export default defineEventHandler(async (event)=> {
    const headers = getHeaders(event);
    const params = getQuery(event);
    const Authorization = headers.authorization;
    const config = useRuntimeConfig();
    try {
        const response = await axios.get(config.apiBasePath + '/support/problems/', {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            }, 
            params: params
        });
        return response.data;
    } catch (error: any) {
        setResponseStatus(event, 400);
        return {
            data: error?.response?.data,
            status: 'error',
            error: 'حدث خطأ غير متوقع'
        }
    }
})