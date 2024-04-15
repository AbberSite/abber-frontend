import axios from 'axios';

export default defineEventHandler(async (event) => {
    const headers = getHeaders(event);
    const Authorization = headers.authorization;
    const config = useRuntimeConfig();
    try{
        const response = await axios.get(config.apiBasePath + '/coupons/coupons/', {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            }
        });
        return response.data.results;
    } catch(error: any){
        setResponseStatus(event, 400);
    }
})