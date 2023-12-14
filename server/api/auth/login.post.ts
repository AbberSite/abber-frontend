import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            'https://test.abber.co/api/authentication/login/',

            {
                email: body.email,
                password: body.password,
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

    } catch ( error ) {

        setResponseStatus(event, 400)

        if(error?.response?.data?.non_field_errors[0]){

            return { status : "error", error : error?.response?.data?.non_field_errors[0] }

        }

        return { 

            status : "error", 
            error : "حدث خطأ ما"
            
        }


    }
});
