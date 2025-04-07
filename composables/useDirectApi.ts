export default async <T = unknown>(
  request: Parameters<typeof $fetch<T>>[0],
  options?: Partial<Parameters<typeof $fetch<T>>[1]>
): ReturnType<typeof $fetch> => {
  const { status, rawToken } = useAuthState();

  return $fetch<T>("/api/custom-api-endpoint/fetch-api/", {
    ...options,
    headers: {
      nuxtapiurl: request.toString(),
      Authorization:
        status.value !== 'unauthenticated' && rawToken.value
          ? `JWT ${rawToken.value}`
          : '',
      ...options?.headers,
    },
  });
};
