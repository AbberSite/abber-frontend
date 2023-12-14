import axios from 'axios';

export default defineEventHandler(async (event) => {
    // return "hello world"
    const config = useRuntimeConfig();
    const body = await readBody(event)

    try {
        const response = await axios.post(

            'https://test.abber.co/api/authentication/registered-email/',

            {

                email: body.email,

            },
            {
                headers: {

                    Authorization: getHeaders(event).authorization,
                    'api-key': config.apiSecret,

                },
            },
        );

        return response.data;

    } catch (error) {

        return { status : "error", error : "something went wrong" };

    }
    // return { token : response.data.access }
});
