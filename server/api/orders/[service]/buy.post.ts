import axios from 'axios';

export default defineEventHandler(async (event) => {
    
    const headers = getRequestHeaders(event);
    const body = await readBody(event);

    const service = event.context.params?.service

    const Authorization = headers.authorization;
    
    const config = useRuntimeConfig();

    try {

        const response = await axios.post(config.apiBasePath + `/orders/buy-now/${service}/`, body, {

            headers: {
                'api-key': config.apiSecret,
                Authorization
            }

        });

        return response?.data;

    } catch (error: any) {

        setResponseStatus(event, error.response?.status ?? 500);

       
        return { 

            data : error?.response?.data, 
            status : "error", 
            error : "حدث خطأ ما"
            
        }

    }
});
