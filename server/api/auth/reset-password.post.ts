import axios from 'axios';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            config.apiBasePath + '/authentication/password/reset/',

            {
                email: body.email,
            },
            {
                headers: {
                    'api-key': config.apiSecret,
                    'Platform': 'web',

                },
            },
        );

        return {

            sent : true
            
        } 

    } catch (error : any) {

        setResponseStatus(event, 400)

        if(error?.response?.data?.email?.email?.[0]){
            return {email : error.response.data.email.email[0]}
        }

        return error?.response?.data

    }


});
