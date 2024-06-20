import axios from "axios";

export default defineEventHandler(async (event) => {

  try {
    const params = getQuery(event)
    const headers = getRequestHeaders(event);
    const Authorization = headers.authorization;
    const config = useRuntimeConfig()

    const response = await axios.get(config.apiBasePath + "/orders/dream-info/?order_item__isnull=true", {
      headers: {
        'api-key': config.apiSecret, Authorization
      },
      params
    })

    return response.data
  } catch (error: any) {
    setResponseStatus(event, 500);
    return {
      error: error.response.data,

    };
  }

});
