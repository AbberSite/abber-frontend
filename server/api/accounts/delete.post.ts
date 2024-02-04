import axios from 'axios';


export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()
    const headers = getRequestHeaders(event);
    const Authorization = headers.authorization;
   
    try {

        

        const response = await axios.delete(config.apiBasePath + `/accounts/account/${body.username}/`,{

            headers: {
                'api-key': config.apiSecret,
                Authorization
            }

        });

        return response?.data;

    } catch (error: any) {

        setResponseStatus(event, error.response?.status ?? 500);

        return error.response?.data;

    }
});

