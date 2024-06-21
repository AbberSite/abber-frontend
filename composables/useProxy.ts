import { type NitroFetchRequest } from 'nitropack';

export default async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
  request: Parameters<typeof $fetch<T, R>>[0],
  options?: Partial<Parameters<typeof $fetch<T, R>>[1]>
): ReturnType<typeof $fetch> => {
  const { status, rawToken } = useAuthState();

  // const { getSession } = useAuth();

  // await getSession();
  const config = useRuntimeConfig()
  console.log(options);
  return $fetch<T, R>("/api-proxy" + request as R, {
    ...options,
    headers: {
      'api-key': config.apiSecret,
      Authorization: status.value != 'unauthenticated' && rawToken.value ? `JWT ${rawToken.value}` : '',
      ...options?.headers
    }
  });
};

function removeSessionIdFromCookie(cookieString) {
  // Split the cookie string into individual key=value pairs
  const cookies = cookieString.split(';');

  // Filter out the sessionid cookie
  const filteredCookies = cookies.filter(cookie => {
    // Trim whitespace and check if it starts with 'sessionid='
    return !cookie.trim().startsWith('sessionid=');
  });

  // Rejoin the remaining cookies into a single string
  return filteredCookies.join('; ');
}