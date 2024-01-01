import axios from "axios";

export default defineEventHandler(async (event) => {



    const config = useRuntimeConfig()

    const response = await axios.get(config.apiBasePath + "/blog/categories/",{
        headers : {
            Authorization : getHeaders(event).authorization,
            'api-key' : config.apiSecret
        }
    })

    return response.data

    
});
