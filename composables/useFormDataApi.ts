import axios from 'axios';
import type { AxiosRequestConfig, Method } from 'axios';

export default async function useFormDataApi<T = unknown>(
  url: string,
  formData: FormData,
  method: Method = 'POST',
  options?: AxiosRequestConfig
): Promise<T> {
  const { status, rawToken } = useAuthState();

  const headers = {
    Authorization:
      status.value !== 'unauthenticated' && rawToken.value
        ? `JWT ${rawToken.value}`
        : '',
    // Do not set Content-Type, let browser handle it for FormData
    ...(options?.headers || {}),
  };
//   const fullApiPath = useRuntimeConfig().public.websiteBasePath + url;
  const fullApiPath = useRuntimeConfig().public.websiteBasePath + '/api' + url;
  const config: AxiosRequestConfig = {
    method,
    url: fullApiPath,
    data: formData,
    ...options,
    headers,
  };

  const response = await axios.request<T>(config);
  return response.data;
}
