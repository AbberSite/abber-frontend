import axios from "axios";
import { setBlockTracking } from "vue";

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()

    const response = await axios.get("https://test.abber.co/api/expressors/expressors/",{
        headers : {
            'api-key' : config.apiSecret
        }
    })

    return response.data

});
