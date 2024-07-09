import axios from "axios";
export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const body = await readBody(event);
  const Authorization = headers.authorization;
  const config = useRuntimeConfig();
  headers['sec-ch-ua-platform'] = (headers['sec-ch-ua-platform'] || 'website').toString().replace('ios', 'Website IOS');
  try {
    const response = await axios.put(
      config.apiBasePath + headers.nuxtapiurl,
      body,
      {
        headers: {
          "api-key": config.apiSecret,
          Authorization,
          'sec-ch-ua-platform': headers['sec-ch-ua-platform'],
          'content-type': headers['content-type'],
        },
      }
    );
    return response.data;
  } catch (error: any) {
    setResponseStatus(event, 400);
    return {
      data: error?.response?.data,
      status: "error",
      error: "حدث خطأ غير متوقع",
    };
  }
});
