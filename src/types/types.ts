export enum PlatformTypes {
  andorid='android',
  linux='linux',
  window='window',
  mac='mac',
  ios='ios',
  web='web'
}


export const getPlatformTypeList = ()=>Object.values(PlatformTypes)