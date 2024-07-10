import axios from 'axios';
import { useCustomHeaders } from "~/composables/useCustomHeaders";

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const params = getQuery(event);
  const config = useRuntimeConfig();
  try {
    const response = await axios.get(config.apiBasePath + headers.nuxtapiurl, {
      headers: useCustomHeaders(headers),

      params: params
    });
    return response.data;
  } catch (error: any) {
    console.log(error)
    setResponseStatus(event, 400);
    return {
      data: error?.response?.data,
      status: 'error',
      error: 'حدث خطأ غير متوقع'
    }
  }
})