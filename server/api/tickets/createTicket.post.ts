import axios from 'axios';

export default defineEventHandler(async (event)=> {
    const headers = getHeaders(event);
    const body = await readBody(event);
    const Authorization = headers.authorization;
    const config = useRuntimeConfig();
    try {
        console.log(body);
        const response = await axios.post(config.apiBasePath + '/support/tickets', {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            }, 
            body: {
                nesting_levels: {"0":5,"1":6,"2":8,"3":10}
            }
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