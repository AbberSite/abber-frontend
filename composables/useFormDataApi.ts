import axios from 'axios';
import type { AxiosRequestConfig, Method } from 'axios';

export default async function useFormDataApi<T = unknown>(
  endpoint: string,
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
  const fullApiPath = useRuntimeConfig().public.websiteBasePath + '/api' + endpoint;
  const config: AxiosRequestConfig = {
    method: options?.method || 'POST', // Default to POST if no method is specified
    url: fullApiPath,
    data: options?.body,
    ...options,
    headers,
  };

  const response = await axios.request<T>(config);
  return response.data;
}
