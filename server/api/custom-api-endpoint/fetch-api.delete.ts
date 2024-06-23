import axios from "axios";
export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const Authorization = headers.authorization;
  const config = useRuntimeConfig();
  try {
    const response = await axios.delete(
      config.apiBasePath + headers.nuxtapiurl,
      {
        headers: {
          "api-key": config.apiSecret,
          Authorization
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
