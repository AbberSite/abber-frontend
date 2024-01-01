import axios from "axios";

export default defineEventHandler(async (event) => {

    const headers = getRequestHeaders(event) 

    const Authorization = headers.authorization 

    const config = useRuntimeConfig()

    try {
        
        const response = await axios.get(config.apiBasePath + "/alerts/notifications/read/",{
            headers : {
                'api-key' : config.apiSecret,
                Authorization
            }, 
        })
    
        return response.data

    } catch (error : any) {

        setResponseStatus(event, 500);

        return error.response.data
        
    }

});
