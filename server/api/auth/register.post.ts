import axios from 'axios';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            config.apiBasePath + '/authentication/register/',

            {
                email: body.email,
                password: body.password,
                phone : body.phone,
                first_name : body.name
            },
            {
                headers: {
                    'api-key': config.apiSecret,
                },
            },
        );


        return {
            token : response.data.access_token,
            refreshToken : response.data.refresh_token, 
        } 
    } catch (error : any) {

        setResponseStatus(event, 400)

        return error.response.data

    }


    // return response;
});
