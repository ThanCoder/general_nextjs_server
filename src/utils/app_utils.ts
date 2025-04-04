export function getProxyUrl(url:string){
  const proxy = process.env.FORWARD_PROXY_URL
  if(proxy){
    return `${proxy}?url=${url}` 
  } 
  return url
}

export function validateVersion(version: string): boolean {
  // Regex to check for valid version in 0.0.0 format
  const regex = /^\d+\.\d+\.\d+$/;
  return regex.test(version);
}