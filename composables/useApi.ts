export default async <T = unknown>(
  request: Parameters<typeof $fetch<T>>[0],
  options?: Partial<Parameters<typeof $fetch<T>>[1]>
): ReturnType<typeof $fetch> => {
  const { status, rawToken } = useAuthState();

  return $fetch<T>(request, {
    ...options,
    headers: {
      Authorization:
        status.value !== 'unauthenticated' && rawToken.value
          ? `JWT ${rawToken.value}`
          : '',
      ...options?.headers,
    },
  });
};
