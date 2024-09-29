import axios, { AxiosError } from 'axios';

export default defineEventHandler(async (event) => {

    const body = await readBody(event);
    const config = useRuntimeConfig()
    const { sender } = getQuery(event)

    try {
        const response = await axios.post(
            config.apiBasePath + '/authentication/registered-phone/',

            {
                phone: body.phone,
                no_otp: body.no_otp,
                sender
            },
            {
                headers: {
                    'api-key': config.apiSecret,
                },
            },
        );
        return response.data

    } catch (error: any) {

        setResponseStatus(event, 400)

        if (error?.response?.data?.non_field_errors[0]) {

            return { status: "error", error: error?.response?.data?.non_field_errors[0] }

        }

        return {

            status: "error",
            error: "حدث خطأ ما"

        }


    }
});
