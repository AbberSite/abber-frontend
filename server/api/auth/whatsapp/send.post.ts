import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            'https://test.abber.co/api/authentication/registered-phone/',

            {
                phone: body.phone,
            },
            {
                headers: {
                    'api-key':  config.apiSecret,
                },
            },
        );

        return {
            "phone": response.data.phone,
            "registered": response.data.registered,
            "message": response.data.message,
            "status": response.data.status
          }

    } catch ( error : any ) {

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
