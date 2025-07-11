import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            config.apiBasePath + '/authentication/login/',

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

    } catch ( error : any ) {

        setResponseStatus(event, 400)

        if(error?.response?.data?.non_field_errors[0]){

            return { status : "error", error : error?.response?.data?.non_field_errors[0] }

        }

        return { 

            data : error?.response?.data, 
            status : "error", 
            error : "حدث خطأ ما"
            
        }


    }
});
