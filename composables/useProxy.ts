export default async <T = unknown>(
  request: Parameters<typeof $fetch<T>>[0],
  options?: Partial<Parameters<typeof $fetch<T>>[1]>
): ReturnType<typeof $fetch> => {
  const { status, rawToken } = useAuthState();
  const config = useRuntimeConfig();

  return $fetch<T>("/api-proxy" + request, {
    ...options,
    headers: {
      'api-key': config.apiSecret,
      Authorization:
        status.value !== 'unauthenticated' && rawToken.value
          ? `JWT ${rawToken.value}`
          : '',
      ...options?.headers,
    },
  });
};
