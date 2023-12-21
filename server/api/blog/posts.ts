import axios from "axios";

export default defineEventHandler(async (event) => {

    const params = getQuery(event) 

    const config = useRuntimeConfig()

    const response = await axios.get("https://test.abber.co/api/blog/posts/",{
        headers : {
            'api-key' : config.apiSecret
        },
        params
    })

    return response.data

});
