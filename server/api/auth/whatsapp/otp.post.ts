import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            'https://test.abber.co/api/authentication/phone/login/',

            {
                phone: body.phone,
                key : body.key
            },
            {
                headers: {
                    'api-key':  config.apiSecret,
                },
            },
        );

        return {

            token : response.data.access_token,
            refreshToken : response.data.refresh_token, 
            user : response.data.user

        } 

    } catch ( error : any ) {

        setResponseStatus(event, 400)

        return { 

            status : "error", 
            error : error.response.data
            
        }


    }
});
