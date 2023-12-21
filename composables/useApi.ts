export default async (method: Method, url: string, data: object = {}, headers?: Object) => {
    const { rawRefreshToken } = useAuthState();

    console.log('use API');

    await useFetch(url, {
        method: method,

        headers: rawRefreshToken.value
            ? {
                  Authorization: `JWT ${rawRefreshToken.value}`,
              }
            : {},

        body: data,
    });

    console.log("after the request")
    
};

type Method =
    | 'GET'
    | 'HEAD'
    | 'PATCH'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'get'
    | 'head'
    | 'patch'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | undefined;
