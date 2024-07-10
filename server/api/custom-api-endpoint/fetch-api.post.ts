import axios from "axios";
import { useCustomHeaders } from "~/composables/useCustomHeaders";
export default defineEventHandler(async (event) => {
  const headers = getHeaders(event);
  const body = await readBody(event);
  const config = useRuntimeConfig();
  try {
    console.log(config.apiBasePath + headers.nuxtapiurl)
    const response = await axios.post(
      config.apiBasePath + headers.nuxtapiurl,
      body,
      {
        headers: useCustomHeaders(headers)

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
