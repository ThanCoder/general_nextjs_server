export enum PlatformTypes {
  andorid='android',
  linux='linux',
  window='window',
  mac='mac',
  ios='ios',
  web='web'
}


export enum UserTypes {
  admin='admin',
  normal='normal',
  
}

export const getPlatformTypeList = ()=>Object.values(PlatformTypes)
export const getUserTypeList = ()=>Object.values(UserTypes)

