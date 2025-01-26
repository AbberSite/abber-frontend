export const useCustomHeaders = (headers: any) => {
  const config = useRuntimeConfig();
  headers['sec-ch-ua-platform'] = (headers['sec-ch-ua-platform'] || 'website').toString().replace('ios', 'Website IOS');

  delete headers['nuxtapiurl'];
  delete headers['host'];
  delete headers['connection'];
  delete headers['accept-encoding'];
  // Remove 'csrftoken' from cookies if present
  if (headers.cookie) {
    headers.cookie = headers.cookie
      .split(';')
      .filter((cookie: string) => !cookie.trim().startsWith('csrftoken=') && !cookie.trim().startsWith('sessionid='))
      .join(';');
  }

  
  delete headers['X-CSRFToken']; 
  return {
    'api-key': config.apiSecret,
    'Authorization': headers.authorization,
    ...headers,
    // 'sec-ch-ua-platform': headers['sec-ch-ua-platform'],
    // 'content-type': headers['content-type'],
    // 'x-forwarded-for': headers['x-forwarded-for'],
    // 'user-agent': headers['user-agent'],
  }
}
