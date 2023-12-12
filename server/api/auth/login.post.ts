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

        return { status : "something went wrong" }

    }
});
