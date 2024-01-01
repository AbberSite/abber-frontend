import axios from "axios";

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()

    try {
        
        const response = await axios.get(config.apiBasePath + "/services/services/user/ratings/?ordering=-date",{
            headers : {
                'api-key' : config.apiSecret,
            }, 
        })
    
        return response.data

    } catch (error : any) {

        setResponseStatus(event, 500);

        return error.response.data
        
    }

});
