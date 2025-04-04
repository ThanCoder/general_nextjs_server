export type ProxyModel = {
  id:string,
  title:string,
  url:string,
  type:string,
  date:Date
}

export enum ProxyType {
  browser='browser',
  forward='forward',  
}