export default async (method : Method,url: string, data: object = {}, headers? : Object) => {


    return await useFetch(url, {
        method: method,
   
        body: data,
    });
};

type Method = "GET" | "HEAD" | "PATCH" | "POST" | "PUT" | "DELETE" | "CONNECT" | "OPTIONS" | "TRACE" | "get" | "head" | "patch" | "post" | "put" | "delete" | "connect" | "options" | "trace" | undefined