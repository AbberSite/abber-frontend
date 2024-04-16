import axios from "axios";

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const id = event.context.params?.id
    const headers = getHeaders(event);
    const Authorization = headers.authorization;


    try {
        
        const response = await axios.get(config.apiBasePath + `/support/tickets/${id}/`,{
            headers : {
                'api-key' : config.apiSecret,
                Authorization
            }, 
        })

        return response.data

    } catch (error : any) {

        setResponseStatus(event, error?.response?.status ?? 500);

        return { 

            data : error?.response?.data, 
            status : "error", 
            error : "حدث خطأ ما"
            
        }        
    }

});
