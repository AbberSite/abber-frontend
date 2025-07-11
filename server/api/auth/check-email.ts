import axios from 'axios';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const body = await readBody(event)

    try {
        const response = await axios.post(

            config.apiBasePath + '/authentication/registered-email/',

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
});
