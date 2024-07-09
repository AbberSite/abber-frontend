import axios from 'axios';

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const params = getQuery(event);
  const config = useRuntimeConfig();
  try {
    const response = await axios.get(config.apiBasePath + headers.nuxtapiurl, {
      headers: useUseCustomHeaders(headers),

      params: params
    });
    return response.data;
  } catch (error: any) {
    setResponseStatus(event, 400);
    return {
      data: error?.response?.data,
      status: 'error',
      error: 'حدث خطأ غير متوقع'
    }
  }
})