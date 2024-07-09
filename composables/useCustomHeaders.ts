export const useUseCustomHeaders = (headers: any) => {
  const config = useRuntimeConfig();
  headers['sec-ch-ua-platform'] = (headers['sec-ch-ua-platform'] || 'website').toString().replace('ios', 'Website IOS');

  return {
    'api-key': config.apiSecret,
    'Authorization': headers.authorization,
    'sec-ch-ua-platform': headers['sec-ch-ua-platform'],
    'content-type': headers['content-type'],
  }
}
