import axios from "axios";
import { setBlockTracking } from "vue";

export default defineEventHandler(async (event) => {

    const { url } = getQuery(event) 
    


    const config = useRuntimeConfig()

    const response = await axios.get(url?.toString() as string,{
        headers : {
            Authorization : getHeaders(event).authorization,
            'api-key' : config.apiSecret
        }
    })

    return response.data

});
