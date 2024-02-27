import { type NitroFetchRequest } from 'nitropack';

export default async <T = unknown, R extends NitroFetchRequest = NitroFetchRequest>(
    request: Parameters<typeof $fetch<T, R>>[0],
    options?: Partial<Parameters<typeof $fetch<T, R>>[1]>
): ReturnType<typeof $fetch> => {
    const { status, rawToken } = useAuthState();

    // const { getSession } = useAuth();

    // await getSession();

    return $fetch<T, R>(request, {
        ...options,
        headers: {
            Authorization: status.value == 'authenticated' ? `Bearer ${rawToken.value}` : '',
            ...options?.headers
        }
    });
};
