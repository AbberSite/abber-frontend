import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const headers = getRequestHeaders(event)
    const config = useRuntimeConfig()
    
    const Authorization = headers.authorization

    try {
        await axios.get(
            config.apiBasePath + '/authentication/logout/',

            {
                headers :  {
                    Authorization,
                    'api-key':  config.apiSecret,
                }
            },
        );


        return {
            status : "success",
            message : "logged out successfully"
        } 

    } catch ( error : any ) {

        setResponseStatus(event, 500)

        return { 
            data : error.response.data,
            status : "error", 
            error : "حدث خطأ ما"
            
        }

    }
});
