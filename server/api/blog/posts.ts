import axios from "axios";
import { setBlockTracking } from "vue";

export default defineEventHandler(async (event) => {

    const params = getQuery(event) 


    console.log(params)


    const config = useRuntimeConfig()

    const response = await axios.get("https://test.abber.co/api/blog/posts/",{
        headers : {
            'api-key' : config.apiSecret
        },
        params
    })

    return response.data

});
