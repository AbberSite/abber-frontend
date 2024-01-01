import axios from 'axios';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig()

    try {
        const response = await axios.post(
            config.apiBasePath + `/authentication/password/reset/confirm/${body.token}/`,

            {
                new_password1: body.password,
                new_password2 : body.passwordConfirmation,
                uid : body.uid,
                token : body.token
            },
            {
                headers: {
                    'api-key': config.apiSecret,
                },
            },

            
        );

        return response.data

    } catch (error : any) {

        setResponseStatus(event, 422)
        return { 

            password :  error?.response?.data?.new_password1?.[0],
            passwordConfirmation :  error?.response?.data?.new_password2?.[0],
            

        }
    }


});
