import axios from "axios";

export default defineEventHandler(async (event) => {

  const headers = getRequestHeaders(event);
  const body = await readBody(event);

  const Authorization = headers.authorization;

  const config = useRuntimeConfig();

  try {
    const response = await axios.post(config.apiBasePath + `/packages/orders-membership/`,body, {
      headers: {
        'api-key': config.apiSecret,
        Authorization
      },
    })

    return response.data

  } catch (error: any) {

    setResponseStatus(event, error?.response?.status ?? 500);

    return {

      data: error?.response?.data,
      status: "error",
      error: "حدث خطأ ما"

    }
  }

});
