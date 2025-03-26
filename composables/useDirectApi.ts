import type { NitroFetchRequest } from '#imports';

export default async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
  request: Parameters<typeof $fetch<T, R>>[0],
  options?: Partial<Parameters<typeof $fetch<T, R>>[1]>
): ReturnType<typeof $fetch> => {
  const { status, rawToken } = useAuthState();
  return $fetch<T, R>("/api/custom-api-endpoint/fetch-api/" as R, {
    ...options,
    headers: {
      nuxtapiurl: request.toString(),
      Authorization: status.value != 'unauthenticated' && rawToken.value ? `JWT ${rawToken.value}` : '',
      ...options?.headers
    }
  });
};
