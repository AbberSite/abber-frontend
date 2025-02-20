export const useCustomHeaders = (headers: any) => {
  const config = useRuntimeConfig();
  headers['sec-ch-ua-platform'] = (headers['sec-ch-ua-platform'] || 'website').toString().replace('ios', 'Website IOS');

  delete headers['nuxtapiurl'];
  delete headers['host'];
  delete headers['connection'];
  delete headers['accept-encoding'];

  
  delete headers['X-CSRFToken']; 
  return {
    'api-key': config.apiSecret,
    'Authorization': headers.authorization,
    // 'sec-ch-ua-platform': headers['sec-ch-ua-platform'],
    // 'content-type': headers['content-type'],
    // 'x-forwarded-for': headers['x-forwarded-for'],
    // 'user-agent': headers['user-agent'],
  }
}
