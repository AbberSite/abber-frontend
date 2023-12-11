import axios from 'axios';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            'https://test.abber.co/api/authentication/login/',

            {
                email: body.email,
                password: body.password,
                phone : body.phone,
                first_name : "test user"
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
            user : response.data.user
        } 
    } catch (error) {


        return { error }
    }


    // return response;
});
