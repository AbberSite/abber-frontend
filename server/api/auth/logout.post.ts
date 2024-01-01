import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const headers = getRequestHeaders(event)
    const config = useRuntimeConfig()
    
    const jwt = headers.authorization?.replace("Bearer", "")?.replace(" ", "")

    if(!jwt) {

        setResponseStatus(event, 401)

        return { 
            status : "error", 
            error: "unauthorized"
        }

    }

    try {
        const response = await axios.get(
            config.apiBasePath + '/authentication/logout/',

            {
                headers :  {
                    "Authorization" : `JWT ${jwt}`,
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

            status : "error", 
            error : "حدث خطأ ما"
            
        }

    }
});
