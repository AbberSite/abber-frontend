import axios from "axios";
import { setBlockTracking } from "vue";

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()

    try {
        
        const response = await axios.get(config.apiBasePath + "/services/services/?limit=50",{
            headers : {
                'api-key' : config.apiSecret
            }
        })
    
        return response?.data
    
    } catch (error : any) {

        return error.response?.data

    }

});
