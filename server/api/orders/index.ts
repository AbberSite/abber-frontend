import axios from 'axios';

export default defineEventHandler(async (event) => {
    let params = getQuery(event);
    const headers = getHeaders(event);
    let filters;

    const previousParams = await useStorage().getItem("filters")

    console.log("from client : ", headers['x-requested-with'] == "XMLHttpRequest");
    console.log("previous filters", previousParams)

    if(headers['x-requested-with'] != "XMLHttpRequest" && previousParams){
        


        
        // params = {}
        filters = Object.assign(previousParams, params)
    }else {
        filters = params
    }

    const Authorization = headers.authorization;

    const config = useRuntimeConfig();
    try {
        const response = await axios.get(config.apiBasePath + '/orders/my-orders/', {
            headers: {
                'api-key': config.apiSecret,
                Authorization
            },
            params : filters
        });

        await useStorage().setItem("filters", params)


        return response.data;

    } catch (error: any) {
        setResponseStatus(event, 400);

        return {
            data : error?.response?.data,
            status: 'error',
            error: 'حدث خطأ ما'
        };
    }
});
